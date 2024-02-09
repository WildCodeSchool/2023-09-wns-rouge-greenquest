import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SigninForm from "../src/components/SigninForm";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { MockedProvider } from "@apollo/client/testing";
import { mutationSignin } from "@/graphql/mutationSignin";

import mockRouter from "next-router-mock";
import router from "next/router";

// mocks des données envoyées et reçues
const mocks = [
  // Successful login & correct credentials
  {
    request: {
      query: mutationSignin,
      variables: {
        email: "valid@example.com",
        password: "validpassword",
      },
    },
    result: {
      data: {
        signin: { id: "1", __typename: "User" },
      },
    },
  },
  // Unsuccessful login & incorrect credentials
  {
    request: {
      query: mutationSignin,
      variables: {
        email: "wrong@example.com",
        password: "wrongpassword",
      },
    },
    result: {
      error: new Error("Les identifiants sont incorrects"),
    },
  },
];

describe("Signin mutation", () => {
  // Avant chaque test
  beforeEach(() => {

    // Mock du router
    jest.mock("next/router", () => ({
      useRouter: () => ({
        route: "/",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
        replace: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }),
    }));

    // Rendu du composant SigninForm avec le mock du router le mock d'Apollo Provider
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterContext.Provider value={mockRouter}>
          <SigninForm />
        </RouterContext.Provider>
      </MockedProvider>
    );
  });

  it("should signin user with valid credentials", async () => {
    // Déclenchement de l'event de connexion
    fireEvent.click(screen.getByRole("button", { name: "Connexion" }));

    // Si connexion réussie, le router doit rediriger l'utilisateur vers la page d'accueil
    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/");
    });
  });

  it("should not sign user with invalid credentials", async () => {
    // Simulation de la saisie d'informations incorrectes dans les champs d'entrée
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "wrongpassword" },
    });

    // Vérification que les valeurs ont été correctement saisies
    expect(screen.getByTestId("email-input")).toHaveValue("wrong@example.com");
    expect(screen.getByTestId("password-input")).toHaveValue("wrongpassword");

    // Déclenchement de la soumission du formulaire
    fireEvent.click(screen.getByTestId("submit-button"));

    // Attendre que le message d'erreur s'affiche
    await waitFor(() => {
      expect(
        screen.getByText("Les identifiants sont incorrects")
      ).toBeInTheDocument();
    });
  });
});

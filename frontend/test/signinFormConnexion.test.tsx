import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import SigninForm from "../src/components/SigninForm";
import { RouterContext } from "next/dist/shared/lib/router-context";
/* import router from "next/router";
 */ import { MockedProvider } from "@apollo/client/testing";
import { mutationSignin } from "@/graphql/mutationSignin";
import { Typography } from "@mui/material";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

// mutation signin
/* export const doSigninMutation = gql`
  mutation signin($password: String!, $email: String!) {
    signin(password: $password, email: $email) {
      id
    }
  }
`; */

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
    /* jest.mock("next/router", () => ({
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
    })); */

    // Rendu du composant SigninForm avec le mock du router le mock d'Apollo Provider
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/*         <RouterContext.Provider value={mockRouter}>
         */}{" "}
        <SigninForm />
        {/*         </RouterContext.Provider>
         */}{" "}
      </MockedProvider>
    );
  });

  it("should signin user with valid credentials", async () => {
    // Déclenchement de l'event de connexion
    fireEvent.click(screen.getByRole("button", { name: "Connexion" }));

    expect(mockRouter.replace).toMatchObject({
      asPath: "/",
      pathname: "",
      query: "",
    });

    // Si connexion réussie, le router doit rediriger l'utilisateur vers la page d'accueil
    /* await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("/");
    }); */
  });

  it("should not sign user with invalid credentials", async () => {
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "wrongassword" },
    });

    expect(screen.getByLabelText("Email")).toHaveValue("wrong@example.com");
    expect(screen.getByLabelText("Mot de passe")).toHaveValue("wrongpassword");

    fireEvent.click(screen.getByRole("button", { name: "Connexion" }));

    // Si connexion échoue, un message d'erreur doit apparaître
    await waitFor(() => {
      expect(Typography).toHaveBeenCalledWith(
        "Les identifiants sont incorrects"
      );
      /* expect(
        screen.getByText("Les identifiants sont incorrects")
      ).toBeInTheDocument(); */
    });
  });
});

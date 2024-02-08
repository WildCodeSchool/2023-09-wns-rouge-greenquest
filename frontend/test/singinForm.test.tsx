import React from "react";
import "@testing-library/jest-dom";
import { describe } from "@jest/globals";
import { render, waitFor } from "@testing-library/react";
import { Button, TextField } from "@mui/material";

describe("Signin form components", () => {
  it("check signin form components presence", async () => {
    // Render the component SigninForm
    const { getByText, getByRole } = render(
      <>
        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          value=""
          onChange={() => {}}
          sx={{ width: "60%" }}
        />
        <TextField
          required
          id="email"
          label="Mot de passe"
          variant="outlined"
          value=""
          onChange={() => {}}
          sx={{ width: "60%" }}
        />
        <Button variant="contained" type="submit">
          Connexion
        </Button>
      </>
    );

    await waitFor(() => {
      expect(getByText("Email")).toBeInTheDocument();
      expect(getByText("Mot de passe")).toBeInTheDocument();
      expect(getByRole("button", { name: "Connexion" })).toBeInTheDocument();
    });
  });
});

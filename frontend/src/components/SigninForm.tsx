import React, { useState } from "react";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signin = () => {
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Form submission with connection button
  const handleSignIn = () => {
    if (!validateEmail()) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!validatePassword()) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const validateEmail = () => {
    //TODO: ajouter la validation de l'email avec le back
    return true;
  };

  const validatePassword = () => {
    //TODO: ajouter la validation du mdp avec le back
    return true;
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="center">
        <TextField
          error={emailError}
          required
          id="email"
          label="Email"
          variant="outlined"
          helperText={emailError ? "Email incorrect" : ""}
          sx={{ width: "60%" }}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <TextField
          error={passwordError}
          required
          id="password"
          label="Mot de passe"
          variant="outlined"
          helperText={passwordError ? "Mot de passe incorrect" : ""}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
          sx={{ width: "60%" }}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <Button variant="contained" onClick={handleSignIn}>
          Connexion
        </Button>
      </Grid>
    </Grid>
  );
};

export default Signin;

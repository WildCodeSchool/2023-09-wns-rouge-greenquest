import React, { FormEvent, useState } from "react";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { mutationSignin } from "@/graphql/mutationSignin";
import { useRouter } from "next/router";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [failedConnexion, setFailedConnexion] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [doSignin] = useMutation(mutationSignin);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailedConnexion(false);

    // Validate email and password
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    // Only proceed with signin if email and password inputs are valid
    if (isEmailValid && isPasswordValid) {
      try {
        const { data } = await doSignin({
          variables: { email, password },
        });

        if (data?.signin) {
          console.log("credentials ok");
          router.replace("/");
          console.log("redirection");
        } else {
          setFailedConnexion(true);
          console.error("Connexion échouée:", data?.signin);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
      }
    }
  }

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(!isValid);
    return isValid;
  };

  const validatePassword = () => {
    const isValid = password.length >= 8;
    setPasswordError(!isValid);
    return isValid;
  };

  return (
    <form onSubmit={handleSignIn}>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="center">
          <Typography variant="body1" gutterBottom sx={{ width: "60%" }}>
            Connecte toi ou inscrit toi pour participer à une quête et
            valider tes missions quotidiennes !
          </Typography>
        </Grid>
        <Grid item container justifyContent="center">
          <TextField
            error={emailError}
            required
            id="email"
            label="Email"
            variant="outlined"
            helperText={emailError ? "Format de l'email incorrect" : ""}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            helperText={
              passwordError
                ? "Le mot de passe doit faire au moins 8 caractères"
                : ""
            }
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {failedConnexion && (
            <Typography variant="body2" color="error" gutterBottom>
              Les identifiants sont incorrects
            </Typography>
          )}
        </Grid>
        <Grid item container justifyContent="center">
          <Button variant="contained" type="submit">
            Connexion
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signin;

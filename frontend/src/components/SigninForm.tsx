import React, { FormEvent, useState } from "react";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { mutationSignin } from "@/graphql/mutationSignin";
import { useRouter } from "next/router";
import theme from "@/styles/theme";

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
          <img
            src="/assets/singin-page-picture.jpg"
            alt="Description de l'image"
            style={{ width: "720px", height: "auto", marginBottom: "100px" }}
          />
        </Grid>

        <Grid item container justifyContent="center">
          <Typography
            variant="body1"
            gutterBottom
            sx={{ width: "60%", textAlign: "center", marginBottom: "20px" }}
          >
            Connecte toi ou inscrit toi pour participer à une quête et valider
            tes missions quotidiennes !
          </Typography>
        </Grid>

        <Grid item container justifyContent="center">
          <div
            style={{
              backgroundColor: "#ECEBF5",
              padding: "20px",
              borderRadius: "5px",
              width: "60%",
            }}
          >
            <Grid
              item
              container
              justifyContent="center"
              sx={{ marginBottom: "10px" }}
            >
              <TextField
                sx={{ marginTop: "20px" }}
                error={emailError}
                required
                id="email"
                label="Email"
                variant="outlined"
                color="secondary"
                helperText={emailError ? "Format de l'email incorrect" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              sx={{ marginBottom: "10px" }}
            >
              <TextField
                error={passwordError}
                required
                id="password"
                label="Mot de passe"
                variant="outlined"
                color="secondary"
                helperText={
                  passwordError
                    ? "Le mot de passe doit faire au moins 8 caractères"
                    : ""
                }
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item container justifyContent="center">
              {failedConnexion && (
                <Typography variant="body2" color="error" gutterBottom>
                  Les identifiants sont incorrects
                </Typography>
              )}
            </Grid>

            <Grid
              item
              container
              justifyContent="center"
              sx={{ marginBottom: "10px" }}
            >
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                sx={{ marginTop: "30px" }}
              >
                Connexion
              </Button>
            </Grid>
          </div>
        </Grid>

        <Grid item container justifyContent="center">
          <Typography
            variant="body1"
            gutterBottom
            sx={{ width: "60%", textAlign: "center", marginTop: "60px" }}
          >
            Tu n'as pas de compte ?
          </Typography>
        </Grid>

        <Grid item container justifyContent="center">
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push("/signup")}
          >
            Inscription
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signin;

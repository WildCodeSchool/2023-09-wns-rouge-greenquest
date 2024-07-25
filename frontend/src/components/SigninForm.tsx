import React, { FormEvent, useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  ThemeProvider,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { mutationSignin } from "@/graphql/mutationSignin";
import { useRouter } from "next/router";
import { queryMySelf } from "@/graphql/queryMySelf";
import { ResetPasswordModal } from "./modals/ResetPasswordModal";
import { ApolloError } from "@apollo/client";
import { SigninDiv, SigninForm, SigninFormTheme } from "@/themes/signinTheme";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [failedConnexion, setFailedConnexion] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // gestion de l'état de validation du compte utilisateur
  const [validationError, setValidationError] = useState(false);

  const router = useRouter();

  const clickShowPassword = () => setShowPassword((show) => !show);

  const [doSignin] = useMutation(mutationSignin, {
    refetchQueries: [queryMySelf],
  });

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailedConnexion(false);
    setValidationError(false);

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
          setTimeout(() => {
            router.replace("/dashboard");
          }, 1000);
        } else {
          setFailedConnexion(true);
          console.error("Connexion échouée:", data?.signin);
        }
      } catch (err) {
        if (err instanceof ApolloError) {
          {
            const errorMessage = err.graphQLErrors[0]?.message || err.message;
            if (errorMessage.includes("Votre compte n'est pas encore validé")) {
              setValidationError(true);
            }
          }
        } else {
          console.error("Erreur lors de la connexion:", err);
        }
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

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <ThemeProvider theme={SigninFormTheme}>
      <SigninForm onSubmit={handleSignIn}>
        <Grid container direction="column" spacing={1}>
          <Grid item container justifyContent="center" width="100%">
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "30vh", sm: "30vh", md: "40vh", lg: "40vh" },
                backgroundImage: "url(/images/singin-page-picture.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                overflow: "hidden",
              }}
            />
          </Grid>

          <Grid item container justifyContent="center">
            <Typography variant="body1" gutterBottom>
              Connecte toi pour participer à une quête et valider tes missions
              quotidiennes !
            </Typography>
          </Grid>

          <Grid item container justifyContent="center">
            <SigninDiv>
              <Grid item container justifyContent="center">
                <TextField
                  size="small"
                  error={emailError}
                  required
                  id="email"
                  label="Email"
                  variant="outlined"
                  color="secondary"
                  helperText={emailError ? "Format de l'email incorrect" : ""}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item container justifyContent="center">
                <TextField
                  size="small"
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={clickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item container justifyContent="center">
                {failedConnexion && (
                  <Typography variant="body2" color="error" gutterBottom>
                    Les identifiants sont incorrects
                  </Typography>
                )}
                {validationError && (
                  <Typography variant="body2" color="error" gutterBottom>
                    Ton compte n&apos;a pas encore été validé. Vérifie ta boîte
                    mail et utilise le lien de validation.
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

              <Grid item container justifyContent="center">
                <Button
                  variant="text"
                  color="secondary"
                  onClick={handleOpenModal}
                >
                  Mot de passe oublié ?
                </Button>
              </Grid>
            </SigninDiv>
          </Grid>

          <Grid item container justifyContent="center" height={"10%"}>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ width: "60%", textAlign: "center", marginTop: "1%" }}
            >
              Tu n&apos;as pas de compte ?
            </Typography>
          </Grid>

          <Grid item container justifyContent="center">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/signup")}
              sx={{ marginBottom: "1rem" }}
            >
              Inscris-toi
            </Button>
          </Grid>
        </Grid>

        <ResetPasswordModal open={openModal} handleClose={handleCloseModal} />
      </SigninForm>
    </ThemeProvider>
  );
};

export default Signin;

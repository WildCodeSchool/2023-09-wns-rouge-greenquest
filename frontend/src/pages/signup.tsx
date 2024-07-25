import React, { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import {
  Button,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signup } from "@/graphql/mutationSignup";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Snackbar from "@mui/material/Snackbar";
import {
  SignupDiv,
  SignupForm,
  SignupFormImg,
  SignupTheme,
} from "@/themes/signupTheme";

const Signup = () => {
  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [toastOpen, setToastOpen] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = toastOpen;

  const [toastMessage, setToastMessage] = React.useState("");

  const [doSignup] = useMutation(signup);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await doSignup({
        variables: {
          data: {
            firstname,
            lastname,
            nickname,
            email,
            password,
          },
        },
      });
      if (data.item) {
        setToastMessage(
          "Inscription réussie ! Vérifie ton adresse mail pour valider ton compte 👍🏻"
        );
        setToastOpen({ ...toastOpen, open: true });
        setTimeout(() => {
          router.replace("/signin");
        }, 5000);
      }
    } catch (error: any) {
      if (error.message.includes("Existing user")) {
        setEmailError(true);
      }

      if (error.message.includes("Password length")) {
        setPasswordError(true);
      }
      if (password !== confirmPassword) {
        setErrorConfirmPassword(true);
      }
    }
  };

  return (
    <Layout title="signup">
      <ThemeProvider theme={SignupTheme}>
        <SignupForm onSubmit={onSubmit}>
          <Grid container direction="column" spacing={2} alignItems="center">
            <Grid item container justifyContent="center">
              <SignupFormImg
                src="https://images.pexels.com/photos/259280/pexels-photo-259280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Picture of the author"
              />
            </Grid>
            <Grid item container justifyContent="center">
              <Typography variant="h2">
                Inscrit toi ou connecte toi pour participer à une quête et
                valider des missions quotidiennement 🏹 !
              </Typography>
              <br />
              <br />
            </Grid>
            <Grid item container justifyContent="space-around">
              <SignupDiv>
                <Grid item container justifyContent="center">
                  <TextField
                    className="textfield-outline-shadow"
                    color="success"
                    value={firstname}
                    required
                    id="fisrtname"
                    label="Prénom"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item container justifyContent="center">
                  <TextField
                    className="textfield-outline-shadow"
                    color="success"
                    value={lastname}
                    required
                    id="lastname"
                    label="Nom"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item container justifyContent="center">
                  <TextField
                    className="textfield-outline-shadow"
                    color="success"
                    value={nickname}
                    id="Nickname"
                    label="Pseudo"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </Grid>
                <Grid item container justifyContent="center">
                  <TextField
                    className="textfield-outline-shadow"
                    color="success"
                    error={emailError}
                    value={email}
                    required
                    id="email"
                    label="Email"
                    variant="outlined"
                    helperText={
                      emailError === true ? "Email déjà utilisé!" : ""
                    }
                    size="small"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(false);
                    }}
                  />
                </Grid>
                <Grid item container justifyContent="center">
                  <TextField
                    className="textfield-outline-shadow"
                    color="success"
                    error={passwordError}
                    value={password}
                    required
                    id="password"
                    label="Mot de passe"
                    variant="outlined"
                    helperText={
                      passwordError === true
                        ? "Le mot de passe doit faire au moins 8 caractères"
                        : ""
                    }
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                    size="small"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(false);
                    }}
                  />
                </Grid>
                <Grid item container justifyContent="center">
                  <TextField
                    className="textfield-outline-shadow"
                    color="success"
                    error={errorConfirmPassword}
                    value={confirmPassword}
                    required
                    id="confirmPassword"
                    label="Confirmer le mot de passe"
                    variant="outlined"
                    helperText={
                      errorConfirmPassword
                        ? "Les deux mots de passes doivent être similaires"
                        : ""
                    }
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      ),
                    }}
                    size="small"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrorConfirmPassword(false);
                    }}
                  />
                </Grid>
                <Grid item container justifyContent="center">
                  <Button variant="contained" type="submit" color="success">
                    Inscription
                  </Button>
                </Grid>
              </SignupDiv>
            </Grid>
          </Grid>
        </SignupForm>
      </ThemeProvider>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setToastOpen({ ...toastOpen, open: false })}
        message={toastMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={vertical + horizontal}
      />
    </Layout>
  );
};

export default Signup;

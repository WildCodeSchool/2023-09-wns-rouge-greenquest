import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { mutationSetPassword } from "@/graphql/mutationSetPassword";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [resetError, setResetError] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (!token) {
      setResetError(true);
    }
  }, [token]);

  const clickShowPassword = () => setShowPassword((show) => !show);
  const clickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const [setPassword] = useMutation(mutationSetPassword);

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResetError(false);

    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid) {
      try {
        const { data } = await setPassword({
          variables: { token: token as string, password: newPassword },
        });

        if (data?.setPassword) {
          console.log("Password reset successfully");
          router.replace("/signin");
        } else {
          setResetError(true);
          console.error("Password reset failed:", data);
        }
      } catch (error) {
        setResetError(true);
        console.error("Error resetting password:", error);
      }
    }
  }

  const validatePassword = () => {
    const isValid = newPassword.length >= 8;
    setPasswordError(!isValid);
    return isValid;
  };

  const validateConfirmPassword = () => {
    const isValid = newPassword === confirmPassword;
    setConfirmPasswordError(!isValid);
    return isValid;
  };

  return (
    <form onSubmit={handleResetPassword}>
      <Grid container direction="column" spacing={2}>
        <Grid item container justifyContent="center">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "30vh", sm: "30vh", md: "40vh", lg: "40vh" },
              backgroundImage: `url('/images/singin-page-picture.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
              overflow: "hidden",
            }}
          />
        </Grid>

        <Grid item container justifyContent="center">
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              width: "90%",
              maxWidth: "600px",
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            Rentre ton nouveau mot de passe 🔒
          </Typography>
        </Grid>

        <Grid item container justifyContent="center">
          <Box
            sx={{
              backgroundColor: "#ECEBF5",
              padding: "20px",
              borderRadius: "5px",
              width: "90%",
              maxWidth: "600px",
            }}
          >
            <Grid
              container
              direction="column"
              spacing={2}
              justifyContent="center"
            >
              <Grid item>
                <TextField
                  error={passwordError}
                  required
                  id="new-password"
                  label="Nouveau mot de passe"
                  variant="outlined"
                  color="secondary"
                  helperText={
                    passwordError
                      ? "Le mot de passe doit faire au moins 8 caractères"
                      : ""
                  }
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  fullWidth
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

              <Grid item>
                <TextField
                  error={confirmPasswordError}
                  required
                  id="confirm-password"
                  label="Confirmer le mot de passe"
                  variant="outlined"
                  color="secondary"
                  helperText={
                    confirmPasswordError
                      ? "Les mots de passe ne correspondent pas"
                      : ""
                  }
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={clickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item>
                {resetError && (
                  <Typography variant="body2" color="error" gutterBottom>
                    Échec de la réinitialisation du mot de passe
                  </Typography>
                )}
              </Grid>

              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: "20px" }}
                >
                  Réinitialiser le mot de passe
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewPasswordForm;

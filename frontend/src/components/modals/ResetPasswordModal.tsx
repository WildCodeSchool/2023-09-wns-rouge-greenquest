import React, { FormEvent, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { mutationResetPassword } from "@/graphql/mutationResetPassword";

interface ResetPasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

export function ResetPasswordModal({
  open,
  handleClose,
}: ResetPasswordModalProps) {
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const [resetMyPassword] = useMutation(mutationResetPassword);

  const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await resetMyPassword({ variables: { email: resetEmail } });
      setResetEmailSent(true);
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe:",
        error
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "80%", sm: "80%", md: "80%", lg: "90%" },
          maxWidth: "1000px",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "12.5px", sm: "16px", md: "18px" },
              textAlign: "left",
            }}
          >
            Réinitialisation du mot de passe
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              pr: 0,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {resetEmailSent ? (
          <Typography
            variant="body1"
            sx={{
              width: "100%",
              fontSize: { xs: "12.5px", sm: "16px", md: "18px" },
              fontWeight: "normal",
              textAlign: "left",
            }}
          >
            Un email de réinitialisation a été envoyé à ton adresse mail 📤
          </Typography>
        ) : (
          <form onSubmit={resetPassword}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="reset-email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              sx={{
                width: "100%",
                height: "3rem",
                mb: 2,
                ml: 0,
                input: {
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  height: { xs: "20px", sm: "20px", md: "20px" },
                },
                label: {
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                },
                "& .MuiFormHelperText-root": {
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ width: "50%" }}
              >
                Envoyer
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
}

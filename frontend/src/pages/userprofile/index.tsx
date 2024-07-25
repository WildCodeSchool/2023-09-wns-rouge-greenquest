import React, { useState, useRef, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Layout from "@/components/Layout";
import { queryMySelf } from "@/graphql/queryMySelf";
import { mutationUpdateUser } from "@/graphql/userProfileUpdate/mutationUpdateUser";
import { mutationUpdateUserImage } from "@/graphql/userProfileUpdate/mutationUpdateUserImage";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Avatar,
  Snackbar,
  Paper,
  SnackbarContent,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ProfileTheme, ProfileContainer } from "../../themes/profilTheme";

export interface UserType {
  email: string;
  firstname: string;
  lastname: string;
  nickname: string;
  id: number;
  image?: {
    uri: string;
  };
}

export default function Profile(): React.ReactNode {
  const { loading, error, data } = useQuery(queryMySelf);
  const [updateUser] = useMutation(mutationUpdateUser);
  const [updateUserImage] = useMutation(mutationUpdateUserImage);
  const [editable, setEditable] = useState(false);
  const [editableFields, setEditableFields] = useState<UserType | null>(null);
  const [firstnameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [toastOpen, setToastOpen] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = toastOpen;
  const [toastMessage, setToastMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  const me = data?.item;

  const handleFieldChange = (field: keyof UserType, value: string) => {
    if (editableFields) {
      setEditableFields({
        ...editableFields,
        [field]: value,
      });
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const backUrl =
    typeof window !== "undefined" && location.origin.includes("localhost")
      ? "http://localhost:5050/api"
      : "/api";

  const handleUpdateProfile = async () => {
    if (editableFields) {
      const { firstname, lastname, nickname } = editableFields;
      const isFirstNameValid = validateFirstName(firstname);
      const isLastNameValid = validateLastName(lastname);
      const isNicknameValid = validNickName(nickname);

      if (!isFirstNameValid || !isLastNameValid || !isNicknameValid) {
        return;
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch(`${backUrl}/users/${me.id}/image`, {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            "x-apollo-operation-name": "uploadImage",
            "apollo-require-preflight": "true",
          },
        });
        const result = await response.json();
        if (result.success) {
          const imageId = result.image.id;
          await updateUserImage({
            variables: {
              image: { id: imageId },
            },
            refetchQueries: [{ query: queryMySelf }],
          });
        } else {
          setToastMessage(
            "Une erreur est survenue lors de l'upload de l'image."
          );
          setToastOpen({ ...toastOpen, open: true });
          return;
        }
      }

      updateUser({
        variables: {
          firstname,
          lastname,
          nickname,
        },
        refetchQueries: [{ query: queryMySelf }],
      })
        .then(() => {
          setToastMessage("Ton profil a été mis à jour avec succès 👍🏻 !");
          setToastOpen({ ...toastOpen, open: true });
        })
        .catch((error) => {
          setToastMessage("Une erreur est survenue 😔 ");
          setToastOpen({ ...toastOpen, open: true });
        });
      setEditable(false);
    }
  };

  const validateFirstName = (value: string) => {
    const isValid = value.trim() !== "";
    setFirstNameError(!isValid);
    return isValid;
  };

  const validateLastName = (value: string) => {
    const isValid = value.trim() !== "";
    setLastNameError(!isValid);
    return isValid;
  };

  const validNickName = (value: string) => {
    const isValid = value.trim() !== "";
    setNicknameError(!isValid);
    return isValid;
  };

  return (
    <ThemeProvider theme={ProfileTheme}>
      <Layout title="Mon profil">
        <ProfileContainer>
          <Grid
            container
            justifyContent="center"
            gap="1.5rem"
            alignItems="center"
          >
            <Grid item xs={12} container justifyContent="center">
              <Typography variant="h3" paragraph>
                Page de profil
              </Typography>
            </Grid>
            <Grid item container justifyContent="center">
              <Typography
                variant="body1"
                gutterBottom
                sx={{ width: "90%", textAlign: "center" }}
              >
                L&apos;adresse email liée à ton compte est :{" "}
                <strong> {me?.email} </strong>
                <br />
                Si tu souhaites la modifier, contacte un administrateur.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Paper
                style={{
                  backgroundColor: "#ECEBF5",
                  padding: "20px",
                  borderRadius: "5px",
                  margin: "0 auto",
                  marginBottom: "60px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" paragraph>
                      Pseudo
                    </Typography>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      sx={{ width: "100%" }}
                      value={
                        editable
                          ? (editableFields && editableFields.nickname) || ""
                          : (me && me.nickname) || ""
                      }
                      onChange={(e) =>
                        handleFieldChange("nickname", e.target.value)
                      }
                      disabled={!editable}
                      error={nicknameError}
                      helperText={
                        nicknameError ? "Renseigner un pseudo valide" : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" paragraph>
                      Prénom
                    </Typography>
                    <TextField
                      variant="outlined"
                      sx={{ width: "100%" }}
                      autoComplete="off"
                      value={
                        editable
                          ? (editableFields && editableFields.firstname) || ""
                          : (me && me.firstname) || ""
                      }
                      onChange={(e) =>
                        handleFieldChange("firstname", e.target.value)
                      }
                      disabled={!editable}
                      error={firstnameError}
                      helperText={
                        firstnameError ? "Renseigner un prénom valide" : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" paragraph>
                      Nom
                    </Typography>
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      sx={{ width: "100%" }}
                      value={
                        editable
                          ? (editableFields && editableFields.lastname) || ""
                          : (me && me.lastname) || ""
                      }
                      onChange={(e) =>
                        handleFieldChange("lastname", e.target.value)
                      }
                      disabled={!editable}
                      error={lastNameError}
                      helperText={
                        lastNameError ? "Renseigner un nom valide" : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" paragraph sx={{ pl: 1, pt: 1 }}>
                      Avatar
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        {preview ? (
                          <Avatar
                            alt="Avatar Preview"
                            src={preview}
                            sx={{ width: 56, height: 56 }}
                          />
                        ) : me?.image?.uri ? (
                          <Avatar
                            alt="Current Avatar"
                            src={`${backUrl}${me.image.uri}`}
                            sx={{ width: 56, height: 56 }}
                          />
                        ) : (
                          <Avatar sx={{ width: 56, height: 56 }}>
                            {me?.firstname?.charAt(0)}
                          </Avatar>
                        )}
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          disabled={!editable}
                        >
                          Changer d&apos;avatar
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} container justifyContent="center">
                    {editable ? (
                      <Button
                        variant="contained"
                        onClick={handleUpdateProfile}
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Sauvegarder
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => {
                          setEditable(true);
                          setEditableFields({ ...me });
                        }}
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Modifier
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </ProfileContainer>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setToastOpen({ ...toastOpen, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          key={vertical + horizontal}
        >
          <SnackbarContent
            message={toastMessage}
            style={{
              backgroundColor: "#333",
              color: "#fff",
            }}
          />
        </Snackbar>
      </Layout>
    </ThemeProvider>
  );
}

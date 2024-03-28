import Layout from "@/components/Layout";
import { Grid, Typography, TextField, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuestContext } from "@/contexts/QuestContext";

export default function QuestTunnel() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setQuestInfo } = useQuestContext();

  const MIN_TITLE_LENGTH = 5;

  const nextPage = () => {
    // Vérification du titre
    if (title.trim().length < MIN_TITLE_LENGTH) {
      return;
    }
    setQuestInfo({
      title: title,
      description: description,
    });

    router.push("/questtunnel/startDateAndDuration");
  };

  return (
    <Layout title="Création de quête">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
        marginTop={3}
      >
        <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Créer votre quête
        </Typography>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          component={Paper}
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 5,
          }}
          gap={3}
        >
          <Typography variant="h2" sx={{ fontSize: "1.5rem" }}>
            Étape 1
          </Typography>
          <TextField
            label="Titre de la quête"
            variant="outlined"
            fullWidth
            margin="normal"
            InputProps={{ style: { borderRadius: 8 } }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            helperText={
              title.length > 0 && title.length < MIN_TITLE_LENGTH
                ? `Minimum ${MIN_TITLE_LENGTH} caractères requis`
                : ""
            }
            error={title.length > 0 && title.length < MIN_TITLE_LENGTH}
          />
          <TextField
            label="Description de la quête (facultative)"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            InputProps={{ style: { borderRadius: 8 } }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#7BD389", color: "#000000" }}
            onClick={nextPage}
            disabled={title.trim().length < MIN_TITLE_LENGTH}
          >
            Suivant
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

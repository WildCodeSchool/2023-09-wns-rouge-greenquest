import Layout from "@/components/Layout";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";

enum Difficulty {
  Beginner = "Débutant",
  Intermediate = "Confirmé",
  Expert = "Expert",
}

export default function DifficultyLevel() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);

  const previousPage = () => {
    router.back();
  };

  const nextPage = () => {
    // Gérer la logique pour passer à la page suivante ici
  };

  const difficultyChoice = (event: SelectChangeEvent<Difficulty>) => {
    setDifficulty(event.target.value as Difficulty);
  };

  return (
    <>
      <Layout title="Niveau de difficulté">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          gap={5}
          marginTop={3}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
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
              maxWidth: "90%",
              padding: 4,
              borderRadius: 5,
            }}
            gap={3}
          >
            <Typography variant="h2" sx={{ fontSize: "1.5rem" }}>
              Étape 3
            </Typography>
            <InputLabel id="demo-simple-select-label">
              Choisissez le niveau de difficulté
            </InputLabel>
            <Select
              value={difficulty}
              onChange={difficultyChoice}
              fullWidth
              variant="outlined"
              sx={{
                "&.Mui-focused fieldset": {
                  borderColor: "#7BD389 !important",
                },
              }}
            >
              <MenuItem value={"Débutant"}>Débutant</MenuItem>
              <MenuItem value={"Confirmé"}>Confirmé</MenuItem>
              <MenuItem value={"Expert"}>Expert</MenuItem>
            </Select>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Button
                variant="contained"
                onClick={previousPage}
                sx={{ bgcolor: "#7BD389", color: "#000000" }}
              >
                Retour
              </Button>
              <Button
                variant="contained"
                onClick={nextPage}
                sx={{ bgcolor: "#7BD389", color: "#000000" }}
              >
                Suivant
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

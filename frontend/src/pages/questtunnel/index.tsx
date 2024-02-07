import Layout from "@/components/Layout";
import { Grid, Typography, TextField, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";

export default function QuestTunnel() {
  const router = useRouter();

  const nextPage = () => {
    router.push("/questtunnel/startDateAndDuration");
  };

  return (
    <>
      <Layout title="Création de quête">
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
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
              padding: 4,
              borderRadius: 5,
              flex: 1,
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
            />
            <TextField
              label="Description de la quête (facultative)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              InputProps={{ style: { borderRadius: 8 } }}
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#7BD389", color: "#000000" }}
              onClick={nextPage}
            >
              Suivant
            </Button>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

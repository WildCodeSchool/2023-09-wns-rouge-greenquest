import Layout from "@/components/Layout";
import { Grid, Typography, TextField, Button, Paper } from "@mui/material";
import { useRouter } from "next/router";

export default function StartAndDuration() {
  const router = useRouter();

  const previousPage = () => {
    router.back();
  };

  const nextPage = () => {
    router.push("/questtunnel/difficulty");
  };

  return (
    <>
      <Layout title="Date de début et durée de la quête">
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
              Étape 2
            </Typography>
            <TextField
              label="Date de début de la quête"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Durée de la quête (en jours)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 1 } }}
            />
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
                sx={{ bgcolor: "#7BD389", color: "#000000" }}
                onClick={nextPage}
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

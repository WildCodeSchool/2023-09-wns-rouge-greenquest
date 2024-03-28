import Layout from "@/components/Layout";
import { Grid, Typography, Button, Paper } from "@mui/material";

import { useRouter } from "next/router";

export default function QuestLink() {
  const router = useRouter();

  const nothing = () => {
    router.push("/");
  };

  return (
    <Layout title="Lien de la quête">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={5}
        marginTop={3}
      >
        <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          Votre quête a été créée
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
            Pour inviter vos amis, partager le lien ci-dessous
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1rem" }}>
            Lien
          </Typography>

          <Button
            variant="contained"
            onClick={nothing}
            sx={{ bgcolor: "#7BD389", color: "#000000" }}
          >
            Aller sur la quête
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
}

import {
  homeTheme,
  HomeSecondContainer,
  HomeFirstContainer,
  HomeLogo,
} from "@/themes/homeTheme";
import { Button, Typography, ThemeProvider } from "@mui/material";
import router from "next/router";

export default function Home() {
  return (
    <ThemeProvider theme={homeTheme}>
      <HomeFirstContainer>
        <HomeSecondContainer>
          <HomeLogo
            src="/images/greenquest_logo.png"
            alt="Logo de l'application"
          />
          <Typography variant="body1">
            GreenQuest est une plateforme te permettant de lancer des challenges
            écologiques entre ami.e.s
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/signin")}
          >
            Connexion
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/signup")}
          >
            Inscription
          </Button>
        </HomeSecondContainer>
      </HomeFirstContainer>
    </ThemeProvider>
  );
}

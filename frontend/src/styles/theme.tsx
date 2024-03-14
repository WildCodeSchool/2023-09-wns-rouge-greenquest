import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DBAD42", // Couleur principale (jaune)
    },
    secondary: {
      main: "#1d8a37", // Couleur secondaire (vert)
    },
  },
});

//Doc : https://v4.mui.com/fr/customization/palette/

// light, dark... seront calculés à partir de palette.primary.main
// light, dark... seront calculés à partir de palette.secondary.main

export default theme;

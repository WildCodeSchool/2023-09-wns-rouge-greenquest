import { createTheme, styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const ProfileTheme = createTheme({
  palette: {
    primary: {
      main: "#DBAD42",
    },
    secondary: {
      main: "#50E3C2",
    },
    background: {
      default: "#DBAD42",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h3: ({ theme }) => ({
          color: "#333",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "1rem",
          [theme.breakpoints.up("xs")]: {
            fontSize: "1.4rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1.6rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1.8rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "2rem",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "2.2rem",
          },
        }),
        h6: ({ theme }) => ({
          color: "#555",
          fontWeight: "bold",
          [theme.breakpoints.up("xs")]: {
            fontSize: "1.1rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1.2rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1.3rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "1.4rem",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "1.5rem",
          },
        }),
        body1: ({ theme }) => ({
          color: "#666",
          [theme.breakpoints.up("xs")]: {
            fontSize: "0.9rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1.1rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "1.2rem",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "1.3rem",
          },
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          [theme.breakpoints.up("xs")]: {
            fontSize: "0.9rem",
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "1rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "1.1rem",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "1.2rem",
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "1.3rem",
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: "8px",
          boxShadow: theme.shadows[2],
          [theme.breakpoints.up("xs")]: {
            fontSize: "0.8rem",
            padding: theme.spacing(1),
          },
          [theme.breakpoints.up("sm")]: {
            fontSize: "0.8rem",
            padding: theme.spacing(1.5),
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "0.9rem",
            padding: theme.spacing(2),
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "0.9rem",
            padding: theme.spacing(2),
          },
          [theme.breakpoints.up("xl")]: {
            fontSize: "1rem",
            padding: theme.spacing(2),
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
          boxShadow: theme.shadows[4],
        }),
      },
    },
  },
});

// Style pour le conteneur principal de la page de profil
const ProfileContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: theme.spacing(1),
  margin: "0 auto",
  [theme.breakpoints.up("xs")]: {
    width: "90%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "90%",
  },
  [theme.breakpoints.up("md")]: {
    width: "90%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "90%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "90%",
  },
}));

export { ProfileTheme, ProfileContainer };

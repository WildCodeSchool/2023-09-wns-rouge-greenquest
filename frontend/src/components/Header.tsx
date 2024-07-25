import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import HeaderModal from "./modals/HeaderModal";
import { useQuery } from "@apollo/client";
import { queryMySelf } from "@/graphql/queryMySelf";
import { userMissionType } from "./MissionsTab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@mui/material/styles";
import { headerTheme, HeaderLogo } from "@/themes/headerTheme";
import router from "next/router";

export type userType = {
  id: number;
  email: string;
  nickname: string;
  userMissions: userMissionType[];
  image?: {
    uri: string;
  };
};

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const backUrl =
    typeof window !== "undefined" && location.origin.includes("localhost")
      ? "http://localhost:5050/api"
      : "/api";

  const { loading, data, error } = useQuery<{ item: userType }>(queryMySelf);
  const me = data && data?.item;

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleChange = () => {
    setModalOpen(true);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          height: "75px",
        }}
      >
        Loading...
      </div>
    );

  return (
    <ThemeProvider theme={headerTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {!me && (
              <>
                <Link href="/">
                  <HeaderLogo
                    src={`/images/greenquest_logo.png`}
                    alt="Greenquest_logo"
                    loading="lazy"
                  />
                </Link>
                <Typography
                  variant="h4"
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    color: "#fff",
                    fontFamily: "'Titan One', sans-serif",
                    fontWeight: "bold",
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                    letterSpacing: "0.1rem",
                  }}
                >
                  <span style={{ color: "green" }}>Green</span>
                  <span style={{ color: "black" }}>Quest</span>
                </Typography>
                <Stack direction="row">
                  {router.pathname === "/signin" ? (
                    <Link href="/signup" passHref>
                      <Button color={"success"} variant="contained">
                        Inscription
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/signin" passHref>
                      <Button color={"success"} variant="contained">
                        Connexion
                      </Button>
                    </Link>
                  )}
                </Stack>
              </>
            )}
            {me && (
              <>
                <div>
                  <IconButton
                    size="small"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleMenu}
                    style={{
                      padding: 0,
                      border: "1px solid #ccc",
                      borderRadius: "50%",
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      transition: "background-color 0.3s ease",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {me.image ? (
                      <img
                        src={`${backUrl}${me.image.uri}`}
                        alt="Avatar"
                        style={{
                          width: "3.5rem",
                          height: "3.5rem",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <AccountCircle
                        sx={{
                          fontSize: {
                            xs: "3.5rem", // taille de la police pour les écrans extra-petits
                            sm: "4rem", // taille de la police pour les petits écrans
                            md: "3.5rem", // taille de la police pour les écrans moyens
                            lg: "4rem", // taille de la police pour les grands écrans
                          },
                        }}
                      />
                    )}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{ marginTop: "1.3rem" }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/userprofile"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Profil
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/questtunnel"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Créer une quête
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <Link
                        href="/dashboard"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Tableau de bord
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
                <Typography variant="h6" component="div">
                  {me.nickname}
                </Typography>
                <Button
                  onClick={handleChange}
                  color={"success"}
                  variant="contained"
                >
                  {me ? "Déconnexion" : "Se connecter"}
                </Button>
                <HeaderModal
                  modalOpen={modalOpen}
                  handleClose={handleCloseModal}
                  me={me}
                />
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;

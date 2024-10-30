import Button from "@mui/material/Button";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useAuth } from "../GlobalProviders";
import { createContext, useContext } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const AuthPageContext = createContext({});

export const useAuthPage = () => useContext(AuthPageContext);

const AuthPageProvider = () => {
  const { googleLogin, handleSkipLogin } = useAuth();

  return (
    <AuthPageContext.Provider value={{}}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={0}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%", // Ensure the Box takes up the full height of its parent
            }}
          >
            <Button
              component="button" // Use "button" or another valid component
              size="large"
              variant="contained"
              onClick={googleLogin}
              startIcon={<GitHubIcon fontSize="large" />}
              sx={{ fontSize: "1.25rem" }} // Adjust font size using sx prop
            >
              Google SSO Sign In
            </Button>
            <Button
              component="button" // Same here
              size="large"
              variant="contained"
              onClick={handleSkipLogin}
              startIcon={<GitHubIcon fontSize="large" />}
              id="google-sso-button"
              // sx={{ opacity: 0 }} // Keep this line to hide the button
            >
              Google SSO Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </AuthPageContext.Provider>
  );
};

export default AuthPageProvider;

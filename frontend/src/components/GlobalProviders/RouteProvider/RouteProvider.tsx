import AuthPageProvider from "@frontend-ui/components/AuthPage/AuthPageProvider";
import { Header } from "@frontend-ui/components/Header";
import { Landing } from "@frontend-ui/components/Landing";
import { Profile } from "@frontend-ui/components/Profile/Profile";
import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { createContext, useContext, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../AuthProvider";

interface RouteContext {
  pageTitle: string;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

const RouteContext = createContext<RouteContext>({
  pageTitle: "",
  setPageTitle: () => {
    throw new Error("setPageTitle function not in context.");
  },
});

export const useRoute = () => useContext(RouteContext);

const RouteProvider = () => {
  const { isAuthenticated } = useAuth();
  const [pageTitle, setPageTitle] = useState("");
  const GoBackButton = () => {
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate(-1);
    };
    return (
      <Button variant="contained" color="primary" onClick={handleGoBack}>
        Go Back
      </Button>
    );
  };

  const GoForwardButton = () => {
    const navigate = useNavigate();
    const handleGoForward = () => {
      navigate(1);
    };
    return (
      <Button variant="contained" color="primary" onClick={handleGoForward}>
        Go Forward
      </Button>
    );
  };
  return (
    <RouteContext.Provider value={{ pageTitle, setPageTitle }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/authenticated" />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
          <Route
            path="/auth"
            element={
              isAuthenticated ? (
                <Navigate to="/authenticated" />
              ) : (
                <AuthPageProvider />
              )
            }
          />

          <Route
            path="/authenticated"
            element={
              isAuthenticated ? (
                <>
                  <Header />
                  <Landing />
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />

          <Route
            path="/authenticated/profile"
            element={
              isAuthenticated ? (
                <>
                  <Header />
                  <Profile />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                  >
                    <Stack direction="row" spacing={2}>
                      <GoBackButton />
                      <GoForwardButton />
                    </Stack>
                  </Box>
                </>
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
};
export default RouteProvider;

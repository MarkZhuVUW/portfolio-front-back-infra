import {
  LocalStorageProvider,
  RouteProvider,
  ThemeProvider,
  AuthProvider,
  ErrorProvider,
} from "./components/GlobalProviders";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CssBaseline } from "@mui/material";
const App = () => (
  <LocalStorageProvider>
    <ThemeProvider>
      <CssBaseline />
      <ErrorProvider>
        <GoogleOAuthProvider clientId="1083292527788-2ehr1pss5tjac6156qk7likrbu4eps58.apps.googleusercontent.com">
          <AuthProvider>
            <RouteProvider />
          </AuthProvider>
        </GoogleOAuthProvider>
      </ErrorProvider>
    </ThemeProvider>
  </LocalStorageProvider>
);
export default App;

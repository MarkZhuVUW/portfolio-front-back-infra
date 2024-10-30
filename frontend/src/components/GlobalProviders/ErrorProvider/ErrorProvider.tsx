import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SyntheticEvent,
} from "react";
import { default as MuiSnackbar } from "@mui/material/Snackbar";
import {
  Box,
  Collapse,
  IconButton,
  Typography,
  AlertTitle,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { APIError } from "./types";
interface ErrorContext {
  error: APIError | null;
  setError: React.Dispatch<React.SetStateAction<APIError | null>>;
}

const ErrorContext = createContext<ErrorContext>({
  error: null,
  setError: () => {
    throw new Error("setError function not in context.");
  },
});

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<APIError | null>(null);
  const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const errorMsgRenderer = () => {
    // Handle all other types of error.
    return <Typography>{error && error.message}</Typography>;
  };
  const renderErrorAlert = () => (
    <Alert
      severity={"error"}
      onClose={handleSnackbarClose}
      action={
        <Box display="flex" flexDirection="row" width="100%">
          <IconButton
            aria-label="Snackbar close icon"
            color="inherit"
            size="small"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
      }
    >
      <AlertTitle>Error</AlertTitle>
      {error && errorMsgRenderer()}
    </Alert>
  );
  const handleSnackbarClose = (event: Event | SyntheticEvent<any, Event>) => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      <MuiSnackbar
        aria-label={"Snackbar"}
        open={!!error}
        onClose={handleSnackbarClose}
        TransitionComponent={Collapse}
        ClickAwayListenerProps={{ mouseEvent: false }}
        key={"Snackbar"}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {error ? renderErrorAlert() : undefined}
      </MuiSnackbar>
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;

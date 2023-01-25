import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Snackbar, ThemeProvider } from "@mui/material";
import { Alert } from "@mui/lab";
import Loading from "./utils/Loading";
import { theme } from "./utils/theme";
import ProtectedRoute from "./ProtectedRoute";
import AuthRouter from "./AuthRoute";
import { history } from "./store";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const SwitchRouter = ({ condition }) => {
  if (condition) {
    return <ProtectedRoute />;
  }
  return <AuthRouter />;
};

function App(props) {
  const { token } = props;
  return (
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <SwitchRouter condition={token} />
        {props.loader ? <Loading /> : ""}
        {props.toaster ? (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={props.toaster ? true : false}
            autoHideDuration={3000}
          >
            <Alert variant="filled" severity={props.severity || "error"}>
              {props.errorMessage || `Something went wrong`}
            </Alert>
          </Snackbar>
        ) : (
          ""
        )}
        {/* </LocalizationProvider> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default connect(({ auth, loaders }) => {
  const { token } = auth;
  return {
    token,
    loader: loaders.loader,
    toaster: loaders.toaster,
    errorMessage: loaders.errorMessage,
    severity: loaders.severity
  };
})(App);

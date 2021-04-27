import { Snackbar } from "@material-ui/core";
import React from "react";
import { Alert, ISuccessSnackbar } from "./SuccessSnackbar";

interface IErrorSnackbar extends ISuccessSnackbar {
  errorMessage: string;
}
const ErrorSnackbar = (props: IErrorSnackbar) => {
  return (
    <Snackbar
      open={props.openSnackbar}
      autoHideDuration={3000}
      onClose={() => props.handleCloseSnackbar()}
    >
      <Alert severity="error">{props.errorMessage}</Alert>
    </Snackbar>
  );
};
export default ErrorSnackbar;

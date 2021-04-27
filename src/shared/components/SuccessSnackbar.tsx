import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";

export const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export interface ISuccessSnackbar {
  openSnackbar: boolean;
  handleCloseSnackbar: () => void;
}
const SuccessSnackbar = (props: ISuccessSnackbar) => {
  return (
    <Snackbar
      open={props.openSnackbar}
      autoHideDuration={3000}
      onClose={() => props.handleCloseSnackbar()}
    >
      <Alert severity="success">Superheroe agregado exitosamente</Alert>
    </Snackbar>
  );
};
export default SuccessSnackbar;

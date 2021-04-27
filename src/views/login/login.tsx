import {
  Button,
  Checkbox,
  Fade,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IRootState } from "../../shared/reducers";
import {
  loginSucess,
  loginError,
  checkSavedToken,
} from "../../shared/reducers/authentication";

type loginInfoType = { email: string; password: string };

interface ILogin extends StateProps, DispatchProps, RouteComponentProps {}

const Login = (props: ILogin) => {
  const [loginInfo, setLoginInfo] = useState<loginInfoType>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [emptyFields, setEmptyFields] = useState<boolean>(false);

  useEffect(() => {
    props.checkSavedToken();
  }, []);

  useEffect(() => {
    if (props.isAuthenticated) props.history.push("/");
  }, [props.isAuthenticated]);

  const loginInfoHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: "email" | "password"
  ) => void = (event, fieldName) => {
    setLoginInfo((prevState) => {
      prevState[fieldName] = event.target.value;
      return { ...prevState };
    });
  };

  const loginHandler: () => void = () => {
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      setEmptyFields(true);
      return;
    }
    axios
      .post("http://challenge-react.alkemy.org", {
        email: loginInfo.email,
        password: loginInfo.password,
      })
      .then((response) => {
        console.log(response.data.token);
        props.loginSucess(response.data.token, rememberMe);
      })
      .catch(() =>
        alert("Ha ocurrido un error al intentar ingresar al sistema")
      );
  };

  return (
    <div className="container" style={{ maxWidth: "300px" }}>
      <div
        className="row justify-content-center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <div className="col-auto">
          <Typography
            color="primary"
            variant="h2"
            style={{ fontWeight: "bold" }}
          >
            Login
          </Typography>
        </div>
      </div>
      <div className="row col" style={{ marginBottom: "20px" }}>
        <TextField
          label="Email"
          value={loginInfo.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            loginInfoHandler(event, "email")
          }
        />
      </div>
      <div className="row col" style={{ marginBottom: "20px" }}>
        <TextField
          label="Contraseña"
          value={loginInfo.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            loginInfoHandler(event, "password")
          }
        />
        <Fade in={emptyFields}>
          <Typography style={{ color: "red", fontSize: "small" }}>
            *Alguno de los campos se encuentra vacío
          </Typography>
        </Fade>
      </div>
      <div className="row g-0">
        <div className="col">
          Recordarme
          <Checkbox
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            color="primary"
            disableRipple={true}
            name="Recordarme"
          />
        </div>
        <div className="col-auto">
          <Button
            color="primary"
            variant="contained"
            onClick={loginHandler}
            disableRipple={true}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = {
  loginSucess,
  loginError,
  checkSavedToken,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Login);

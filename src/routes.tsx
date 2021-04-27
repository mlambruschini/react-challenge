import { Switch, Route, RouteProps, Redirect } from "react-router-dom";
import React from "react";
import Login from "./views/login/login";
import Home from "./views/logged/home";
import { IRootState } from "./shared/reducers";
import { connect } from "react-redux";

interface IRoutes extends StateProps {}
const Routes = (props: IRoutes) => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute
        isAuthenticated={props.isAuthenticated}
        path="/"
        component={Home}
      />
    </Switch>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(Routes);

interface IPrivateRoute extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute = (props: IPrivateRoute) => {
  if (props.isAuthenticated)
    return <Route path={props.path} component={props.component} />;

  return (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          from: props.location,
        },
      }}
    />
  );
};

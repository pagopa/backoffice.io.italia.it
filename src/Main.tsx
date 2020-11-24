import React, { JSXElementConstructor } from "react";
import FirstSearch from "./pages/FirstSearch";
import Sheet from "./pages/Sheet";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { DashboardHeader } from "./components/DashboardHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "typeface-titillium-web";
import "typeface-roboto-mono";
import "typeface-lora";
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
  RouteProps
} from "react-router-dom";

const Layout: React.FunctionComponent = ({ children }) => (
  <>
    <DashboardHeader></DashboardHeader>
    <section className="container">
      <div className="my-5">{children}</div>
    </section>
  </>
);

type PrivateRouteParams = {
  // tslint:disable-next-line: no-any
  component: JSXElementConstructor<any>;
} & RouteProps;

const PrivateRoute: React.FunctionComponent<PrivateRouteParams> = ({
  component: Component,
  ...rest
}) =>
  !!sessionStorage.getItem("userToken") ? (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  ) : (
    <Redirect
      to={{
        pathname: "/login"
      }}
    />
  );

export const Main: React.FunctionComponent<{}> = () => (
  <HashRouter>
    <Switch>
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/logout" component={Logout} />
      <PrivateRoute exact={true} path="/" component={FirstSearch} />
      <PrivateRoute exact={true} path="/sheet" component={Sheet} />
      <Route component={Login} />
    </Switch>
  </HashRouter>
);

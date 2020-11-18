import React, {Component} from "react";
import { App } from "./App";
import { FirstSearch } from "./pages/FirstSearch";
import { Sheet } from "./pages/Sheet";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { DashboardHeader } from "./components/DashboardHeader";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';
import {
    HashRouter,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";

export interface IMainProps
{
    app: App;
}

const Layout = ({ children }: { children: ReactNode }) => (
    <>
    <DashboardHeader></DashboardHeader>
    <section className="container">
        <div className="my-5">
            {children}
        </div>
    </section>
    </>
  );

type PrivateRouteParams = {
  // tslint:disable-next-line:no-any
  component: any;
} & RouteProps;

const PrivateRoute = ({
  component : Component,
  ...rest
  }: PrivateRouteParams) => (
    !!sessionStorage.getItem("userToken") ?
    <Route
      {...rest}
      render={props => 
      <Layout>
        <Component  {...props} />
      </Layout>
      }
    /> :
    <Redirect
    to={{
      pathname: "/login",
    }}
    />
);


export class Main extends React.Component<IMainProps, {}>
{
    constructor(props: IMainProps)
    {
        super(props);
    }

    public render(): JSX.Element
    {
        return (
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
    }
}
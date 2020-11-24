import React, { Component } from "react";
import { getUserTokenOrRedirect } from "../helpers/msal";

export class Login extends Component {
  public componentDidMount = async () => {
    try {
      const tokenAndAccount = await getUserTokenOrRedirect();
      if (tokenAndAccount) {
        // tslint:disable-next-line: no-console
        console.debug("Login::getUserTokenOrRedirect::tokenAndAccount");
        // bearer token to call backend api
        sessionStorage.setItem("userToken", tokenAndAccount.token);
        window.location.replace("/");
      }
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.error("Login needed", e);
    }
  };

  public render(): JSX.Element {
    return (
      <>
        <div className="w-50 m-5 p-5 shadow rounded mx-auto text-center">
          <h1>Login Backoffice IO</h1>
        </div>
      </>
    );
  }
}

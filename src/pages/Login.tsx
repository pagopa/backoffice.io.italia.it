import React, { Component } from "react";
import { getUserTokenOrRedirect } from "../helpers/msal";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";


export class Login extends Component {
    public componentDidMount = async () => {
        try {

          const tokenAndAccount = await getUserTokenOrRedirect();
          if (tokenAndAccount) {
            console.debug(
              "Login::getUserTokenOrRedirect::tokenAndAccount");
            // bearer token to call backend api
            sessionStorage.setItem("userToken", tokenAndAccount.token);
            window.location.replace("/");
          }
        } catch (e) {
          console.error("Login needed", e);
        }
      };

    public render() {
        return (
                <>
                <div className="w-50 m-5 p-5 shadow rounded mx-auto text-center">
                    <h1>Login Backoffice IO</h1>
                </div>
                </>
                );
    }

}
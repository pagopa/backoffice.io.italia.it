import React, { Component } from "react";
import { getUserTokenOrRedirect } from "../helpers/msal";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

  interface MsalConfig {
    audience: string;
    authority: string;
    [b2cScopes: string]: [];
    changePasswordLink?: string;
    clientID: string;
    redirectUri?: string;
    validateAuthority?: boolean;
}

export class Login extends Component {
    public componentDidMount = async () => {
        try {
            const configuration : MsalConfig = {
                "audience": "https://iobackoffice.b2clogin.com/iobackoffice.onmicrosoft.com/c2c9dbf8-9fc3-4f69-b8a6-c87d10d0ab06",
                "authority": "https://iobackoffice.b2clogin.com/iobackoffice.onmicrosoft.com/B2C_1_backoffice",
                "b2cScopes": ["https://iobackoffice.onmicrosoft.com/c2c9dbf8-9fc3-4f69-b8a6-c87d10d0ab06/ProfileRead"],
                "changePasswordLink": "",
                "clientID": "c2c9dbf8-9fc3-4f69-b8a6-c87d10d0ab06",
                "redirectUri": "http://localhost:3000",
                "validateAuthority": false
              };

          const tokenAndAccount = await getUserTokenOrRedirect(configuration);
    
          if (tokenAndAccount) {
            console.debug(
              "Login::getUserTokenOrRedirect::tokenAndAccount",
              tokenAndAccount
            );
    
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
                    <h1>Backoffice IO</h1>
                    <Link to="/"
                          className="my-2 btn btn-primary">
                          Login
                    </Link>
                </div>
                </>
                );
    }

}
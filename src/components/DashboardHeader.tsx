import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { getUserAgentApplication } from "../helpers/msal";
import { format, parseISO, fromUnixTime } from "date-fns";
import { useTranslation } from "react-i18next";

type tokenProps = {
  given_name: string;
  family_name: string;
  email: string;
  exp: string;
};

const DashboardHeader: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation();
  const [loggedUser, setLoggeduser] = useState<tokenProps>({
    given_name: "",
    family_name: "",
    email: "",
    exp: ""
  });

  function onSignOut(): void {
    const userAgentApplication = getUserAgentApplication();
    sessionStorage.clear();
    userAgentApplication.logout();
  }
  useEffect(() => {
    const idToken = getUserAgentApplication().getAccount().idToken;
    const expDate = fromUnixTime(parseInt(idToken.exp));
    console.log(idToken);
    setLoggeduser({
      given_name: idToken.given_name,
      family_name: idToken.family_name,
      email: idToken.emails[0],
      exp: `${expDate.getHours()}:${expDate.getMinutes()}`
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark justify-content-between">
        <Link to="/" className="text-white">
          PagoPA
        </Link>

        <div className=" d-flex align-items-center">
          <div className="text-white small mr-3">
            {loggedUser.given_name} {loggedUser.family_name} /{" "}
            {loggedUser.email} |{" "}
            <b>
              {t("Token until")} {loggedUser.exp}
            </b>
          </div>
          <div className="it-access-top-wrapper">
            <Button color="primary" size="sm" tag="button" onClick={onSignOut}>
              Log-out
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardHeader;

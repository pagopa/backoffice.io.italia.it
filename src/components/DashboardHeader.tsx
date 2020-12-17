import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { fromUnixTime } from "date-fns";
import { getUserAgentApplication } from "../helpers/msal";
import { useTranslation } from "react-i18next";
import { logout } from "../helpers/logout";

type tokenProps = {
  email: string;
  exp: string;
  family_name: string;
  given_name: string;
};

const DashboardHeader: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation();
  const [loggedUser, setLoggeduser] = useState<tokenProps>({
    email: "",
    exp: "",
    family_name: "",
    given_name: ""
  });

  function onSignOut(): void {
    logout();
  }
  useEffect(() => {
    const idToken = getUserAgentApplication().getAccount().idToken;
    const expDate = fromUnixTime(parseInt(idToken.exp, 10));
    setLoggedUser({
      email: idToken.emails[0],
      exp: `${expDate.getHours()}:${expDate.getMinutes()}`,
      family_name: idToken.family_name,
      given_name: idToken.given_name
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

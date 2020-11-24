import React from "react";
import { Link } from "react-router-dom";

export const Logout = () => (
  <>
    <div className="w-50 m-5 p-5 shadow rounded mx-auto text-center">
      <h1>Log-out dal Backoffice IO effettuato con successo</h1>
      <Link to="/" className="my-5 btn btn-primary">
        Login
      </Link>
    </div>
  </>
);

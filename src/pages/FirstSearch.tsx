import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./FirstSearch.css";

export class FirstSearch extends Component {
  public render(): JSX.Element {
    return (
      <>
        <div className="FirstSearch__form p-5 shadow rounded mx-auto">
          <h2>Cerca per support token</h2>
          <div className="form-group">
            <div className="input-group mt-5">
              <input
                type="text"
                className="form-control"
                id="input-group-3"
                name="input-group-3"
                placeholder="Codice fiscale"
              />
              <div className="input-group-append">
                <Link
                  to="/sheet"
                  className="btn btn-primary d-flex align-items-center"
                >
                  Invio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

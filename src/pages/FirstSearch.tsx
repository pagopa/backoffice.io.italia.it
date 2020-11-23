import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./FirstSearch.css";

function FirstSearch(props) {
    const [citizenid, setCitizenid] = useState("");

    return (
      <>
        <div className="FirstSearch__form p-5 shadow rounded mx-auto">
          <h2>Cerca cittadino</h2>
          <div className="form-group">
            <div className="input-group mt-5">
              <input
                type="text"
                className="form-control"
                id="searchtoken"
                name="searchtoken"
                placeholder=""
                onChange={e=>setCitizenid(e.target.value)}
              />
              <div className="input-group-append">
                <Link
                  id="submitCitizenid"
                  to={{pathname: "/sheet",
                    state: {
                      citizenid: citizenid
                    }
                    }}
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

export default FirstSearch;

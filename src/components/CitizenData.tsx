import React from "react";
import Paymethods from "./Paymethods";
import { BPDCitizen } from "../generated/definitions/BPDCitizen";
import Moment from 'react-moment';

interface CitizenDataProps {
  resultData: BPDCitizen
}

function CitizenData(props: CitizenDataProps) {
    return (
    <>
        <div className="d-flex align-items-center">
          <h1>Profilo Cittadino</h1>
          <span className="text-secondary small ml-auto">
            Hai cercato: {window.sessionStorage.getItem('citizenid')}
          </span>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row mt-2">
              <div className="col-md-3 font-weight-bold">Codice fiscale</div>
            <div className="col-md-9">{props.resultData.fiscal_code}</div>
            </div>
            <div className="row mt-2">
              <div className="col-md-3 font-weight-bold">Data On-boarding</div>
              <div className="col-md-9"><Moment  date={props.resultData.timestamp_tc} /></div>
            </div>
            {props.resultData.payoff_instr &&
            <div className="row mt-2">
              <div className="col-md-3 font-weight-bold">Payoff</div>
              <div className="col-md-9">{props.resultData.payoff_instr_type} {props.resultData.payoff_instr} </div>
            </div>
            }

        {props.resultData.payment_methods.length > 0 && <Paymethods paylist={props.resultData.payment_methods} /> }
          </div>
          <div className="col-md-4">
            <div className="bg-light p-3 p-md-5 mt-3 mt-md-0">
              <h6 className="text-uppercase">
                Situazione Premio al{" "}
                <span className="text-primary">30/10/2020</span>{" "}
              </h6>
              <div className="h1 p-2 bg-white rounded-lg d-inline-block shadow">
                110°
              </div>
              <div className="h2">
                1120 <span className="h6">punti</span>
              </div>
              <div className="h3">
                22020 <span className="h6">transazioni</span>
              </div>
            </div>
          </div>
        </div>
      </>
      )
}

export default CitizenData;
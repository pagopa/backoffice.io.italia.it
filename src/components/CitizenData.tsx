import React, { useState } from "react";
import { Paymethods } from "./Paymethods";
import { BPDCitizen } from "../../generated/definitions/BPDCitizen";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { RawModal } from "./RawModal";
import classNames from "classnames";
import "./CitizenData.css";

type CitizenDataProps = {
  resultData: BPDCitizen;
};

export const CitizenData: React.FunctionComponent<CitizenDataProps> = props => {
  const { t } = useTranslation();
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");

  function popModal(data: object): void {
    setModalcontent(JSON.stringify(data, null, 3));
    setModalstate(!modalState);
  }

  return (
    <>
      <RawModal state={modalState} jsonobj={modalContent} />

      <div className="d-flex align-items-center">
        <h1
          className={classNames({
            cancelled: !props.resultData.enabled
          })}
        >
          {t("Citizen profile")}
          <button
            className="ml-2 btn btn-sm btn-primary"
            onClick={() => {
              popModal(props.resultData);
            }}
          >
            RAW
          </button>
        </h1>
        {!props.resultData.enabled && (
          <span className="badge badge-secondary ml-2">{t("Cancelled")}</span>
        )}
        <div className="text-secondary small ml-auto col-md-4 text-truncate">
          {t("Searched string")}: {window.sessionStorage.getItem("citizenid")}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="row mt-2">
            <div className="col-md-3 font-weight-bold">{t("Fiscal code")}</div>
            <div className="col-md-9">{props.resultData.fiscal_code}</div>
          </div>
          <div className="row mt-2">
            <div className="col-md-3 font-weight-bold">
              {t("On-boarding date")}
            </div>
            <div className="col-md-9">
              {format(
                parseISO(props.resultData.timestamp_tc),
                "dd/MM/yyyy HH:mm"
              )}
            </div>
          </div>
          {props.resultData.payoff_instr && (
            <div className="row mt-2">
              <div className="col-md-3 font-weight-bold">Payoff</div>
              <div className="col-md-9">
                {props.resultData.payoff_instr_type}{" "}
                {props.resultData.payoff_instr}{" "}
              </div>
            </div>
          )}

          {props.resultData.payment_methods.length > 0 && (
            <Paymethods paylist={props.resultData.payment_methods} />
          )}
        </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

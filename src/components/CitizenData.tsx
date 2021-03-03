import React, { useState, useEffect } from "react";
import { Paymethods } from "./Paymethods";
import { BPDCitizen } from "../../generated/definitions/BPDCitizen";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import { RawModal } from "./RawModal";
import classNames from "classnames";
import { getCitizenId, getUserToken } from "../helpers/coredata";
import "./CitizenData.css";
import { Awards } from "./Awards";
import { ILocation } from "../@types/location";
import { BackofficeClient } from "../helpers/client";
import { toError } from "fp-ts/lib/Either";
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import { GetPMWalletV2T } from "../../generated/definitions/requestTypes";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { Wallet } from "../../generated/definitions/Wallet";

type CitizenDataProps = {
  location: ILocation;
  resultData: BPDCitizen;
};

export const CitizenData: React.FunctionComponent<CitizenDataProps> = props => {
  const { t } = useTranslation();
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");
  const [resultDataWallet, setResultdataWallet] = useState<Wallet | undefined>(
    undefined
  );
  const [resultErrWallet, setResulterrWallet] = useState<string>("");

  function popModal(data: object): void {
    setModalcontent(JSON.stringify(data, null, 3));
    setModalstate(!modalState);
  }

  useEffect(() => {
    tryCatch(
      () =>
        BackofficeClient.GetPMWalletV2({
          Bearer: `Bearer ${getUserToken()}`,
          "x-citizen-id": getCitizenId()
        }),
      toError
    )
      .foldTaskEither(
        apiError =>
          fromLeft<Error, TypeofApiResponse<GetPMWalletV2T>>(apiError),
        apiResponse =>
          fromEither(
            apiResponse.mapLeft(err => {
              return new Error(readableReport(err));
            })
          )
      )
      .mapLeft(_ => {
        // TODO: Validation Error
      })
      .map(_ => {
        if (_.status === 200) {
          setResultdataWallet(_.value);
        }
        if (_.status === 404) {
          setResulterrWallet(`404, ${t("Error 404")} "${getCitizenId()}"`);
        }
        if (_.status === 429) {
          setResulterrWallet(`429, ${t("Error 429")}`);
        }
        if (_.status === 500) {
          setResulterrWallet(`500, ${t("Error 500")}`);
        }
      })
      .run()
      .catch(_ => {
        setResulterrWallet(_.value);
      });
  }, []);

  return (
    <>
      <RawModal state={modalState} jsonobj={modalContent} />

      <div className="d-flex align-items-center">
        <h1
          className={classNames({
            "enabled-false": !props.resultData.enabled
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
          {t("Searched string")}: {getCitizenId()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div
            className={classNames({
              "enabled-false": !props.resultData.enabled
            })}
          >
            <div className="row mt-2">
              <div className="col-md-3 font-weight-bold">
                {t("Fiscal code")}
              </div>
              <div className="col-md-9">{props.resultData.fiscal_code}</div>
            </div>

            <div className="row mt-2">
              <div className="col-md-3 font-weight-bold">
                {t("On-boarding date")}
              </div>
              <div className="col-md-3">
                {format(
                  parseISO(props.resultData.timestamp_tc),
                  "dd/MM/yyyy HH:mm"
                )}
              </div>
            </div>
            {props.resultData.cancellation && (
              <>
                <div className="col-md-3 font-weight-bold bg-warning">
                  {t("Cancellation Date")}
                </div>
                <div className="col-md-3 bg-warning">
                  {format(
                    parseISO(props.resultData.cancellation),
                    "dd/MM/yyyy HH:mm"
                  )}
                </div>
              </>
            )}
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
          <div className="row mt-2">
            <div className="col-md-3 font-weight-bold">Check-IBAN</div>
            <div className="col-md-9">
              <ul className="list-unstyled">
                <li>
                  <b>{t("State")}: </b>
                  {props.resultData.checkiban_status}
                </li>
                <li>
                  <b>{t("Name")}: </b>
                  {props.resultData.checkiban_name}
                </li>
                <li>
                  <b>{t("Surname")}: </b>
                  {props.resultData.checkiban_surname}
                </li>
                <li>
                  <b>{t("Fiscal code")}: </b>
                  {props.resultData.checkiban_fiscal_code}
                </li>
              </ul>
            </div>
          </div>
          {resultErrWallet && (
            <div className="alert alert-warning">
              <p className="m-0">PM API: {resultErrWallet}</p>
            </div>
          )}
          {props.resultData.payment_methods.length > 0 && (
            <Paymethods
              paylist={props.resultData.payment_methods}
              wallet={resultDataWallet}
            />
          )}
        </div>
        <div className="col-md-4">
          <Awards {...props}></Awards>
        </div>
      </div>
    </>
  );
};

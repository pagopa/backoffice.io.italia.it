import React, { useState } from "react";
import { BPDTransaction } from "../../generated/definitions/BPDTransaction";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { fromNullable } from "fp-ts/lib/Option";
import viewIcon from "../assets/view.svg";
import classNames from "classnames";

type TransactionProps = {
  el: BPDTransaction;
  index: number;
  key?: number;
  popModal: (el: BPDTransaction) => void;
};

export const Transaction: React.FunctionComponent<TransactionProps> = props => {
  const { t } = useTranslation();

  const [activeClass, setActiveclass] = useState<boolean>(false);

  return (
    <div
      key={props.index}
      className={classNames({
        active: activeClass,
        "py-2 row TransactionsList__row": true
      })}
    >
      <div className="col-sm-2">
        {format(parseISO(props.el.trx_timestamp), "dd/MM/yyyy HH:mm")}
      </div>
      <div className="col-sm-3 ">{props.el.acquirer_descr}</div>
      <div className="col-sm-2 ">{props.el.circuit_type_descr}</div>
      <div className="col-sm-2 ">
        {props.el.amount} <small>{props.el.amount_currency_descr}</small>
      </div>
      <div className="col-sm-2 ">*{props.el.hpan.slice(-5)}</div>
      <div className="col-sm-1 p-0">
        <img
          className="viewIcon"
          src={viewIcon}
          onClick={() => {
            setActiveclass(!activeClass);
          }}
        />
        <span
          className="badge badge-primary"
          onClick={() => {
            props.popModal(props.el);
          }}
        >
          RAW
        </span>
      </div>
      <div className="col-12 my-3 TransactionsList__detail">
        <h5 className="border-bottom">{t("Transaction details")}</h5>
        <div className="row">
          <div className="col-sm-4 ">
            <div className="font-weight-bold">{t("ABI Acquirer")}</div>
            {props.el.acquirer}
          </div>
          <div className="col-sm-4 ">
            <div className="font-weight-bold">
              {t("Acquirer transaction ID")}
            </div>
            {props.el.id_trx_acquirer}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Issuer transaction ID")}</div>
            {props.el.id_trx_issuer}
          </div>
          <div className="col-sm-8 ">
            <div className="font-weight-bold">{t("HPAN")}</div>
            {props.el.hpan}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Operation type")}</div>
            {props.el.operation_type_descr}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Score")}</div>
            {props.el.score}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Cashback period")}</div>
            {props.el.award_period_id}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Insert date")}</div>
            {fromNullable(props.el.insert_date)
              .map(_ => format(parseISO(_), "dd/MM/yyyy HH:mm"))
              .getOrElse("")}
          </div>
        </div>
      </div>
    </div>
  );
};

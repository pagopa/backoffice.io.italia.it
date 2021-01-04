import React, { useState } from "react";
import { AwardPeriod } from "../../generated/definitions/AwardPeriod";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { fromNullable } from "fp-ts/lib/Option";
import viewIcon from "../assets/view.svg";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

type AwardProps = {
  el: AwardPeriod;
  index: number;
  key?: number;
  popModal: (el: AwardPeriod) => void;
};

export const Award: React.FunctionComponent<AwardProps> = props => {
  const [activeClass, setActiveclass] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div className="awards__item" key={props.el.award_period_id}>
      <div className="awards__item__title">
        <h5 className="text-primary">
          {t("Award")} {props.el.award_period_id}
        </h5>
        <div className="float-right">
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
      </div>
      <div className="awards__item__body">
        <div className="row">
          <div className="col-sm-6">
            <b className="d-block">{t("Refound")}</b>
            123 &euro;
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Cashback")}</b>
            123 &euro;
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Transactions")}</b>
            11
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Ranking")}</b>
            112345°
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Start date")}</b>
            8/12/2020
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("End Date")}</b>
            31/12/2020
          </div>
          <div className="col-sm-12">
            <b className="d-block">{t("Update date")}</b>
            31/12/2020
          </div>
          <div className="col-sm-12 text-break">
            <b className="d-block">{t("IBAN")}</b>
            2349023402304D1231203112312312312398928
          </div>
        </div>
      </div>
    </div>
  );
};

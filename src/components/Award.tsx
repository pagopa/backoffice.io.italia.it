import React, { useState } from "react";
import { AwardPeriod } from "../../generated/definitions/AwardPeriod";
import { useTranslation } from "react-i18next";
import { format, parseISO, isPast } from "date-fns";
import viewIcon from "../assets/view.svg";
import classNames from "classnames";
import "./Award.css";

type AwardProps = {
  el: AwardPeriod;
  popModal: (elToShowInModal: AwardPeriod) => void;
};

export const Award: React.FunctionComponent<AwardProps> = ({
  el,
  popModal
}) => {
  const [activeClass, setActiveclass] = useState<boolean>(false);
  const { t } = useTranslation();

  function isAwardExpired(endDate: string): boolean {
    return isPast(parseISO(endDate));
  }

  return (
    <div className="awards__item mb-2">
      <div className="awards__item__title">
        <h5 className="text-primary">
          {t("Award")} {el.award_period_id}
          <div className="float-right">
            <img
              className={classNames({
                active: activeClass,
                viewIcon: true
              })}
              src={viewIcon}
              onClick={() => {
                setActiveclass(!activeClass);
              }}
            />
            <span
              className="badge badge-primary cursor-pointer"
              onClick={() => {
                popModal(el);
              }}
            >
              RAW
            </span>
          </div>
        </h5>
      </div>
      <div
        className={classNames({
          active: activeClass,
          awards__item__body: true
        })}
      >
        <div className="row">
          <div className="col-sm-6">
            <b className="d-block">{t("Refound")}</b>
            {isAwardExpired(el.award_period_end) &&
              `${el.award_winner_amount} €`}
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Cashback")}</b>
            {el.citizen_ranking_cashback} &euro;
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Transactions")}</b>
            {el.citizen_ranking_transaction}
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Ranking")}</b>
            {el.citizen_ranking_ranking}
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Start date")}</b>
            {el.award_period_start &&
              format(parseISO(el.award_period_start), "dd/MM/yyyy")}
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("End date")}</b>
            {el.award_period_end &&
              format(parseISO(el.award_period_end), "dd/MM/yyyy")}
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Update date")}</b>
            {el.citizen_ranking_ranking_date &&
              format(
                parseISO(el.citizen_ranking_ranking_date),
                "dd/MM/yyyy HH:mm"
              )}
          </div>
          <div className="col-sm-6">
            <b className="d-block">{t("Grace")}</b>
            {el.award_period_grace_period}
          </div>
          <div className="col-sm-12 text-break">
            <b className="d-block">CheckIBAN</b>
            <ul className="list-unstyled m-0 pl-2">
              <li>
                <i>{t("Name")}: </i>
                {el.award_winner_account_holder_name}
              </li>
              <li>
                <i>{t("Surname")}: </i>
                {el.award_winner_account_holder_surname}
              </li>
              <li>
                <i>{t("Status")}: </i>
                {el.award_winner_check_instr_status}
              </li>
            </ul>
          </div>
          <div className="col-sm-12 text-break">
            <b className="d-block">{t("IBAN")}</b>
            {el.award_winner_payoff_instr}
          </div>
        </div>
      </div>
    </div>
  );
};

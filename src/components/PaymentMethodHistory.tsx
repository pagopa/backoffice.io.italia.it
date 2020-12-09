import React, { useState } from "react";
import { PaymentMethodDetails } from "../../generated/definitions/PaymentMethodDetails";
import { ActivationPeriods } from "../../generated/definitions/ActivationPeriods";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { fromNullable } from "fp-ts/lib/Option";
import classNames from "classnames";

type PaymentMethodHistoryProps = {
  el: PaymentMethodDetails;
  popModal: (el: PaymentMethodDetails) => void;
};

export const PaymentMethodHistory: React.FunctionComponent<PaymentMethodHistoryProps> = props => {
  const { t } = useTranslation();

  const [activeClass, setActiveclass] = useState<boolean>(false);

  return (
    <div
      className={classNames({
        active: activeClass,
        "my-2 PaymentMethod__history": true
      })}
    >
      <div className="row">
        <div className="col-sm-2 font-weight-bold">Abilitazione</div>
        <div className="col-sm-4">{props.el.enabled ? t("Yes") : t("No")}</div>
      </div>
      <div className="PaymentMethod__hlist__title my-2 bg-light rounded p-3">
        <div className="d-flex w-100">
          <a
            className="expandbutton  cursor-pointer"
            onClick={() => {
              setActiveclass(!activeClass);
            }}
          >
            {t("Crono method")}
          </a>
          <button
            className="ml-2 btn btn-sm btn-primary ml-auto"
            onClick={() => {
              props.popModal(props.el);
            }}
          >
            RAW
          </button>
        </div>
        <div className="row PaymentMethod__hlist__list">
          {props.el.activation_periods.map(
            (el: ActivationPeriods, index: number) => (
              <div className="col col-sm-6 border-bottom mb-2 pb-2" key={index}>
                <p className="mb-0">
                  <span className="font-weight-bold">{t("State")}: </span>
                  {el.status}
                </p>
                <p className="mb-0">
                  <span className="font-weight-bold">{t("Enrollment")}: </span>
                  {format(parseISO(el.enrollment), "dd/MM/yyyy HH:mm")}
                </p>
                <p className="mb-0">
                  <span className="font-weight-bold">
                    {t("Cancellation")}:{" "}
                  </span>
                  {fromNullable(el.cancellation)
                    .map(_ => format(parseISO(_), "dd/MM/yyyy HH:mm"))
                    .getOrElse("")}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

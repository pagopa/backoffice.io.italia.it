import React from "react";
import { TabPane } from "reactstrap";
import { PaymentMethod as PaymentMethodDef } from "../../generated/definitions/PaymentMethod";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { fromNullable } from "fp-ts/lib/Option";

type PaymentMethodProps = {
  el: PaymentMethodDef;
  index: number;
  key?: number;
};

export const PaymentMethod: React.FunctionComponent<PaymentMethodProps> = props => {
  const { t } = useTranslation();
  return (
    <TabPane tabId={props.index}>
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-2 font-weight-bold">{t("State")}</div>
          <div className="col-sm-10">{props.el.payment_instrument_status}</div>
          <div className="col-12 py-2"></div>
          <div className="col-sm-2 font-weight-bold">{t("Insert date")}</div>
          <div className="col-sm-4">
            {fromNullable(props.el.payment_instrument_insert_date)
              .map(_ => format(parseISO(_), "dd/MM/yyyy HH:mm"))
              .getOrElse("")}
          </div>
          <div className="col-sm-2 font-weight-bold">{t("Update date")}</div>
          <div className="col-sm-4">
            {fromNullable(props.el.payment_instrument_update_date)
              .map(_ => format(parseISO(_), "dd/MM/yyyy HH:mm"))
              .getOrElse("")}
          </div>
          <div className="col-12 py-2"></div>
          <div className="col-sm-2 font-weight-bold">HPAN</div>
          <div className="col-sm-10 text-break">
            {props.el.payment_instrument_hpan}
          </div>
        </div>
      </div>
    </TabPane>
  );
};

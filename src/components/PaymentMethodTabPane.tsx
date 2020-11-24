import React from "react";
import { TabPane } from "reactstrap";
import { PaymentMethod } from "../generated/definitions/PaymentMethod";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";

type PaymentMethodTabPaneProps = {
  index: number;
  el: PaymentMethod;
};

function PaymentMethodTabPane(element: PaymentMethodTabPaneProps): JSX.Element {
  const { t, i18n } = useTranslation();
  return (
    <TabPane tabId={element.index}>
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-2 font-weight-bold">{t("State")}</div>
          <div className="col-sm-10">
            {element.el.payment_instrument_status}
          </div>
          <div className="col-12 py-2"></div>
          <div className="col-sm-2 font-weight-bold">{t("Insert date")}</div>
          <div className="col-sm-4">
            {fromNullable(element.el.payment_instrument_insert_date)
              .map(_ => format(parseISO(_), "dd/MM/yyyy HH:mm"))
              .getOrElse("")}
          </div>
          <div className="col-sm-2 font-weight-bold">{t("Update date")}</div>
          <div className="col-sm-4">
            {format(
              parseISO(element.el.payment_instrument_update_date),
              "dd/MM/yyyy HH:mm"
            )}
          </div>
          <div className="col-12 py-2"></div>
          <div className="col-sm-2 font-weight-bold">HPAN</div>
          <div className="col-sm-10 text-break">
            {element.el.payment_instrument_hpan}
          </div>
        </div>
      </div>
    </TabPane>
  );
}

export default PaymentMethodTabPane;

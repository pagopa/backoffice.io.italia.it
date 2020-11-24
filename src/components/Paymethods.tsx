import { number } from "io-ts";
import { Integer } from "italia-ts-commons/lib/numbers";
import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import PaymentMethod from "./PaymentMethod";
import { format, parseISO } from "date-fns";
import { useTranslation } from "react-i18next";
import "./Paymethods.css";
import { PaymentMethod as PaymentMethodDef } from "../generated/definitions/PaymentMethod";
import classNames from "classnames";

function Paymethods(props) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const { t, i18n } = useTranslation();

  const toggle = (tab: number) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <>
      <div className="mt-4 mb-2 font-weight-bold">{t("Payment methods")}</div>

      <Nav tabs className="PaymentMethod__list">
        {props.paylist.map((el: PaymentMethodDef, index: number) => (
          <NavItem key={index}>
            <NavLink
              className={classNames({
                "d-flex align-items-center position-relative": true,
                active: activeTab === index
              })}
              title="{t('Detail')}"
              onClick={() => {
                toggle(index);
              }}
            >
              <div
                className={`PaymentMethod__state ${el.payment_instrument_status}`}
              ></div>
              <div>
                <div>*{el.payment_instrument_hpan.slice(-5)}</div>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {props.paylist.map((el: PaymentMethodDef, index: number) => (
          <PaymentMethod index={index} el={el} key={index} />
        ))}
      </TabContent>
    </>
  );
}

export default Paymethods;

import React, { useState, useEffect } from "react";
import { TabContent, Nav, NavItem, NavLink } from "reactstrap";
import { PaymentMethod } from "./PaymentMethod";
import { useTranslation } from "react-i18next";
import "./Paymethods.css";
import { PaymentMethod as PaymentMethodDef } from "../../generated/definitions/PaymentMethod";
import { Wallet as WalletDef } from "../../generated/definitions/Wallet";
import { PublicWalletItem } from "../../generated/definitions/PublicWalletItem";
import classNames from "classnames";
import { PublicCreditCard } from "../../generated/definitions/PublicCreditCard";

type PaymethodsProps = {
  paylist: ReadonlyArray<PaymentMethodDef>;
  wallet?: WalletDef;
};

export const Paymethods: React.FunctionComponent<PaymethodsProps> = props => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [walletInfo, setWalletInfo] = useState<
    Record<string, PublicWalletItem> | undefined
  >(undefined);

  function renderPAN(walletItem: PublicWalletItem): string {
    return PublicCreditCard.is(walletItem)
      ? ` | *${walletItem.masked_pan}`
      : `| ${walletItem.type}`;
  }

  useEffect(() => {
    setWalletInfo(
      props.wallet?.data.reduce(
        (obj, item) => ({ ...obj, [item.hpan]: item }),
        {} as Record<string, PublicWalletItem>
      )
    );
  }, [props.wallet]);

  const { t } = useTranslation();

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
                active: activeTab === index,
                "d-flex align-items-center position-relative": true,
                "enabled-false": !el.payment_instrument_enabled
              })}
              title={t("Detail")}
              onClick={() => {
                toggle(index);
              }}
            >
              <div
                className={classNames({
                  PaymentMethod__state: true,
                  "status-active": el.payment_instrument_status === "ACTIVE"
                })}
              ></div>
              <div>
                <div>
                  *{el.payment_instrument_hpan.slice(-5)}
                  {walletInfo &&
                    renderPAN(walletInfo[el.payment_instrument_hpan])}
                </div>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {props.paylist.map((el: PaymentMethodDef, index: number) => (
          <PaymentMethod
            el={el}
            index={index}
            key={index}
            walletItemInfo={
              walletInfo && walletInfo[el.payment_instrument_hpan]
            }
          />
        ))}
      </TabContent>
    </>
  );
};

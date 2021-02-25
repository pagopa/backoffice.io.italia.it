import React, { useState } from "react";
import { PaymentMethod } from "../../generated/definitions/PaymentMethod";
import { PublicWalletItem } from "../../generated/definitions/PublicWalletItem";
import { RawModal } from "./RawModal";
import { useTranslation } from "react-i18next";
import { renderPAN } from "../helpers/utils";

type PaymethodsProps = {
  paylistItems: Record<string, PaymentMethod>;
  walletItems: Record<string, PublicWalletItem>;
};

export const OrphanPaymethods: React.FunctionComponent<PaymethodsProps> = ({
  paylistItems,
  walletItems
}) => {
  const { t } = useTranslation();
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");
  const paylistHPANs = Object.keys(paylistItems);
  const walletHPANs = Object.keys(walletItems);
  const orphans = walletHPANs.filter(x => !paylistHPANs.includes(x));

  function popModal(data?: object): void {
    setModalcontent(
      data === undefined ? "undefined" : JSON.stringify(data, null, 3)
    );
    setModalstate(!modalState);
  }

  return (
    (orphans.length > 0 && (
      <>
        <RawModal state={modalState} jsonobj={modalContent} />
        <div className="mt-4 mb-2 font-weight-bold">
          {t("Other payment methods")}
        </div>
        <ul className="p-0 m-0 list-inline">
          {orphans.map((hpan: string, index: number) => (
            <li className="bg-light rounded p-2 list-inline-item" key={index}>
              <button
                className="ml-2 btn btn-sm btn-primary ml-auto"
                onClick={() => {
                  popModal(walletItems[hpan]);
                }}
              >
                RAW
              </button>
              <span className="ml-2">{`*${hpan.slice(-5)} ${renderPAN(
                walletItems[hpan]
              )}`}</span>
            </li>
          ))}
        </ul>
      </>
    )) || <div></div>
  );
};

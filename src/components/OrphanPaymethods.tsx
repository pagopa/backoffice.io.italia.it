import React, { useState } from "react";
import { PaymentMethod } from "../../generated/definitions/PaymentMethod";
import { PublicWalletItem } from "../../generated/definitions/PublicWalletItem";
import { RawModal } from "./RawModal";
import { useTranslation } from "react-i18next";
import { renderPAN } from "../helpers/utils";
import { Wallet } from "../../generated/definitions/Wallet";
import { filterWallet } from "../helpers/utils";

type PaymethodsProps = {
  paylistItems: Record<string, PaymentMethod>;
  walletItems: Record<string, PublicWalletItem>;
  wallet?: Wallet;
};

export const OrphanPaymethods: React.FunctionComponent<PaymethodsProps> = ({
  paylistItems,
  walletItems,
  wallet
}) => {
  const { t } = useTranslation();
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");
  const paylistHPANs = Object.keys(paylistItems);
  const walletHPANs = Object.keys(walletItems);
  const onlyWalletHPANs = walletHPANs.filter(x => !paylistHPANs.includes(x));

  function popModal(data?: object): void {
    setModalcontent(
      data === undefined ? "undefined" : JSON.stringify(data, null, 3)
    );
    setModalstate(!modalState);
  }

  return (
    (onlyWalletHPANs.length > 0 && (
      <>
        <RawModal state={modalState} jsonobj={modalContent} />
        <div className="mt-4 mb-2 font-weight-bold">
          {t("Other payment methods")}
        </div>
        <ul className="p-0 m-0 list-inline">
          {onlyWalletHPANs.map((hpan: string, index: number) => (
            <li className="bg-light rounded p-2 list-inline-item" key={index}>
              <span className="ml-2">
                {wallet && filterWallet(wallet, hpan).length > 1 && (
                  <span className="p-1 alert alert-danger mr-1">!</span>
                )}
                {`*${hpan.slice(-5)} ${renderPAN(walletItems[hpan])}`}
              </span>
              {wallet &&
                Array.from(filterWallet(wallet, hpan)).map(
                  (item: PublicWalletItem, indexBtn: number) => (
                    <button
                      key={indexBtn}
                      className="btn btn-sm btn-primary mb-1 ml-1"
                      onClick={() => {
                        popModal(item);
                      }}
                    >
                      RAW
                    </button>
                  )
                )}
            </li>
          ))}
        </ul>
      </>
    )) || <div></div>
  );
};

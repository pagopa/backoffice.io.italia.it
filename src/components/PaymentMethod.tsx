import React, { useEffect, useState } from "react";
import { TabPane } from "reactstrap";
import { PaymentMethod as PaymentMethodDef } from "../../generated/definitions/PaymentMethod";
import { useTranslation } from "react-i18next";
import { PaymentMethodDetails } from "../../generated/definitions/PaymentMethodDetails";
import { GetBPDPaymentInstrumentT } from "../../generated/definitions/requestTypes";
import { format, parseISO } from "date-fns";
import { fromNullable } from "fp-ts/lib/Option";
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import { BackofficeClient } from "../helpers/client";
import { toError } from "fp-ts/lib/Either";
import { getCitizenId, getUserToken } from "../helpers/coredata";
import { PaymentMethodHistory } from "./PaymentMethodHistory";
import { RawModal } from "./RawModal";
import classNames from "classnames";
import { PublicWalletItem } from "../../generated/definitions/PublicWalletItem";
import { PublicCreditCard } from "../../generated/definitions/PublicCreditCard";
import { Wallet } from "../../generated/definitions/Wallet";
import { filterWallet } from "../helpers/utils";

type PaymentMethodProps = {
  el: PaymentMethodDef;
  index: number;
  key?: number;
  walletItemInfo?: PublicWalletItem;
  wallet?: Wallet;
};

export const PaymentMethod: React.FunctionComponent<PaymentMethodProps> = props => {
  const { t } = useTranslation();
  const [resultData, setResultdata] = useState<
    PaymentMethodDetails | undefined
  >(undefined);
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");
  const [resultErr, setResulterr] = useState<string>("");
  const [walletFilteredByHpan, setWalletFilteredByHpan] = useState<
    ReadonlyArray<PublicWalletItem>
  >([]);

  function popModal(data?: object): void {
    setModalcontent(
      data === undefined ? "undefined" : JSON.stringify(data, null, 3)
    );
    setModalstate(!modalState);
  }

  useEffect(() => {
    if (props.wallet && props.el) {
      setWalletFilteredByHpan(
        filterWallet(props.wallet, props.el.payment_instrument_hpan)
      );
    }
  }, [props.wallet]);

  useEffect(() => {
    tryCatch(
      () =>
        BackofficeClient.GetBPDPaymentInstrument({
          Bearer: `Bearer ${getUserToken()}`,
          hpan: props.el.payment_instrument_hpan,
          "x-citizen-id": getCitizenId()
        }),
      toError
    )
      .foldTaskEither(
        apiError =>
          fromLeft<Error, TypeofApiResponse<GetBPDPaymentInstrumentT>>(
            apiError
          ),
        apiResponse =>
          fromEither(
            apiResponse.mapLeft(err => {
              return new Error(readableReport(err));
            })
          )
      )
      .mapLeft(_ => {
        // TODO: Validation Error
      })
      .map(_ => {
        if (_.status === 200) {
          setResultdata(_.value);
        }
      })
      .run()
      .catch(_ => {
        setResulterr(_.value);
      });
  }, []);

  return (
    <TabPane
      tabId={props.index}
      className={classNames({
        "enabled-false": !props.el.payment_instrument_enabled,
        "status-inactive": props.el.payment_instrument_status === "INACTIVE"
      })}
    >
      <RawModal state={modalState} jsonobj={modalContent} />
      <div className="container my-3">
        <div className="row">
          <div className="col-sm-2 font-weight-bold">{t("State")}</div>
          <div className="col-sm-4">{props.el.payment_instrument_status}</div>
          <div className="col-sm-2 font-weight-bold">{t("Enabled")}</div>
          <div className="col-sm-4">
            {props.el.payment_instrument_enabled ? t("Yes") : t("No")}
          </div>
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
          {props.walletItemInfo && PublicCreditCard.is(props.walletItemInfo) && (
            <>
              <div className="col-12 py-2"></div>
              <div className="col-sm-2 font-weight-bold">
                {t("Circuit Brand")}
              </div>
              <div className="col-sm-4">{props.walletItemInfo.brand}</div>
              <div className="col-sm-2 font-weight-bold">{t("Masked PAN")}</div>
              <div className="col-sm-4">*{props.walletItemInfo.masked_pan}</div>
            </>
          )}
          <div className="col-12 py-2"></div>
          <div className="col-sm-2 font-weight-bold">
            HPAN
            {walletFilteredByHpan.length > 1 && (
              <span className="p-1 alert alert-danger ml-1">!</span>
            )}{" "}
            {Array.from(walletFilteredByHpan).map(
              (item: PublicWalletItem, index: number) => (
                <button
                  key={index}
                  className="btn btn-sm btn-primary mb-1"
                  onClick={() => {
                    popModal(item);
                  }}
                >
                  RAW
                </button>
              )
            )}
          </div>
          <div className="col-sm-10 text-break">
            {props.el.payment_instrument_hpan.slice(0, -5)}
            <u>{props.el.payment_instrument_hpan.slice(-5)}</u>
          </div>
        </div>

        {resultData && (
          <PaymentMethodHistory
            el={resultData}
            popModal={popModal}
          ></PaymentMethodHistory>
        )}
      </div>
      {resultErr && <div className="alert">Error: {resultErr}</div>}
    </TabPane>
  );
};

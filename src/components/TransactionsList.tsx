import React, { useEffect, useState } from "react";
import "./TransactionsList.css";
import { useTranslation } from "react-i18next";
import { BPDTransactionList } from "../../generated/definitions/BPDTransactionList";
import { BPDTransaction } from "../../generated/definitions/BPDTransaction";
import { GetBPDTransactionsT } from "../../generated/definitions/requestTypes";
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import { BackofficeClient } from "../helpers/client";
import { Transaction } from "./Transaction";
import { toError } from "fp-ts/lib/Either";
import { getCitizenId, getUserToken } from "../helpers/coredata";
import { ILocation } from "../@types/location";
import { RawModal } from "./RawModal";
import { SelectPayMethods } from "./SelectPayMethods";
import { PaymentMethod } from "../../generated/definitions/PaymentMethod";

type Props = {
  location: ILocation;
  citPayMethods: ReadonlyArray<PaymentMethod>;
};

export const TransactionsList: React.FunctionComponent<Props> = props => {
  const [resultData, setResultdata] = useState<BPDTransactionList | undefined>(
    undefined
  );
  const [resultErr, setResulterr] = useState<string>("");
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");
  const [filterByHPAN, setFilterByHPAN] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    tryCatch(
      () =>
        BackofficeClient.GetBPDTransactions({
          Bearer: `Bearer ${getUserToken()}`,
          "x-citizen-id": props.location.state
            ? props.location.state.citizenid
            : getCitizenId()
        }),
      toError
    )
      .foldTaskEither(
        apiError =>
          fromLeft<Error, TypeofApiResponse<GetBPDTransactionsT>>(apiError),
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

  function popModal(data: object): void {
    setModalcontent(JSON.stringify(data, null, 3));
    setModalstate(!modalState);
  }

  return (
    <>
      <RawModal state={modalState} jsonobj={modalContent} />
      <h3>
        {(filterByHPAN && (
          <>
            {t("Transactions list by method")}{" "}
            <span className="text-primary font-weight-bold">
              *{filterByHPAN.slice(-5)}
            </span>
          </>
        )) ||
          t("Transactions list")}
      </h3>
      {resultErr && <div className="alert">Error: {resultErr}</div>}
      <div className="mt-3">
        <div className="row border-bottom border-dark py-2">
          <div className="col-sm-2 font-weight-bold">{t("Datetime")}</div>
          <div className="col-sm-3 font-weight-bold">{t("Acquirer")}</div>
          <div className="col-sm-2 font-weight-bold">{t("Circuit name")}</div>
          <div className="col-sm-2 font-weight-bold">{t("Amount")}</div>
          <div className="col-sm-2 font-weight-bold">
            {props.citPayMethods && (
              <SelectPayMethods
                el={props.citPayMethods}
                setFilterByHPAN={setFilterByHPAN}
              ></SelectPayMethods>
            )}
          </div>
          <div className="col-sm-1 font-weight-bold"></div>
        </div>
        {resultData &&
          ((filterByHPAN !== "" &&
            resultData.transactions
              .filter((item: BPDTransaction) => {
                return item.hpan === filterByHPAN;
              })
              .map((el: BPDTransaction, index: number) => (
                <Transaction
                  el={el}
                  index={index}
                  key={index}
                  popModal={popModal}
                />
              ))) ||
            resultData.transactions.map((el: BPDTransaction, index: number) => (
              <Transaction
                el={el}
                index={index}
                key={index}
                popModal={popModal}
              />
            )))}
      </div>
    </>
  );
};

export default TransactionsList;

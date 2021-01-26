import React, { useEffect, useState } from "react";
import "./TransactionsList.css";
import { useTranslation } from "react-i18next";
import { BPDTransactionList } from "../../generated/definitions/BPDTransactionList";
import { GetBPDTransactionsT } from "../../generated/definitions/requestTypes";
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import { BackofficeClient } from "../helpers/client";
import { toError } from "fp-ts/lib/Either";
import { getCitizenId, getUserToken } from "../helpers/coredata";
import { ILocation } from "../@types/location";
import { TransactionsTable } from "./TransactionsTable";

type Props = {
  location: ILocation;
};

export const TransactionsList: React.FunctionComponent<Props> = props => {
  const [resultData, setResultdata] = useState<BPDTransactionList | undefined>(
    undefined
  );
  const [resultErr, setResulterr] = useState<string>("");
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

  return (
    <>
      <h3>{t("Transactions list")}</h3>
      <p className="small">{t("TransactionTableDesc")}</p>

      {resultData && (
        <TransactionsTable transactionsList={resultData}></TransactionsTable>
      )}

      {resultErr && <div className="alert">Error: {resultErr}</div>}
    </>
  );
};

export default TransactionsList;

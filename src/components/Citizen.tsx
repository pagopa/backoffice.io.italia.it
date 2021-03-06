import React, { useEffect, useState } from "react";
import { CitizenData } from "./CitizenData";
import { GetBPDCitizenT } from "../../generated/definitions/requestTypes";
import { BPDCitizen } from "../../generated/definitions/BPDCitizen";
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import { BackofficeClient } from "../helpers/client";
import { toError } from "fp-ts/lib/Either";
import { useTranslation } from "react-i18next";
import { ILocation } from "../@types/location";
import { getCitizenId, getUserToken } from "../helpers/coredata";
import { logout } from "../helpers/logout";
import { PaymentMethod } from "../../generated/definitions/PaymentMethod";
import { FiscalCode } from "../../generated/definitions/FiscalCode";
import { format, fromUnixTime } from "date-fns";
import { decode } from "jsonwebtoken";

type Props = {
  location: ILocation;
  setCitPayMethods: (arg: ReadonlyArray<PaymentMethod>) => void;
};

export const Citizen: React.FunctionComponent<Props> = props => {
  const [resultData, setResultdata] = useState<BPDCitizen | undefined>(
    undefined
  );
  const [resultErr, setResulterr] = useState<string>("");

  const { t } = useTranslation();

  useEffect(() => {
    tryCatch(
      () =>
        BackofficeClient.GetBPDCitizen({
          Bearer: `Bearer ${getUserToken()}`,
          "x-citizen-id": props.location.state
            ? props.location.state.citizenid
            : getCitizenId()
        }),
      toError
    )
      .foldTaskEither(
        apiError =>
          fromLeft<Error, TypeofApiResponse<GetBPDCitizenT>>(apiError),
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
          props.setCitPayMethods(_.value.payment_methods);
        }
        if (_.status === 400) {
          setResulterr(`400, ${t("Error 400")} "${getCitizenId()}"`);
        }
        if (_.status === 401) {
          setResulterr(`401, ${t("Error 401")}`);
          logout();
        }
        if (_.status === 403) {
          if (FiscalCode.is(getCitizenId())) {
            setResulterr(
              `403, ${t("Error 403 authorization")} "${getCitizenId()}"`
            );
          } else {
            const payload = decode(getCitizenId());
            payload && typeof payload !== "string" && payload.exp
              ? setResulterr(
                  `403, ${t("Error 403 token")} [exp: ${format(
                    fromUnixTime(payload.exp),
                    "dd-MM-yyyy HH:mm:ss OOOO"
                  )}] "${getCitizenId()}"`
                )
              : setResulterr(
                  `403, ${t("Error 403 token")} "${getCitizenId()}"`
                );
          }
        }
        if (_.status === 404) {
          setResulterr(`404, ${t("Error 404")} "${getCitizenId()}"`);
        }
        if (_.status === 500) {
          setResulterr(`500, ${t("Error 500")}`);
        }
      })
      .run()
      .catch(_ => {
        setResulterr(_.value);
      });
  }, []);

  return (
    <>
      {resultData ? (
        <CitizenData {...props} resultData={resultData} />
      ) : (
        <h2>Error: {resultErr}</h2>
      )}
    </>
  );
};

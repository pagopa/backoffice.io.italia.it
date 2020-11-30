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

type Props = {
  location: ILocation;
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
        }
        if (_.status === 400) {
          setResulterr(
            `400, ${t("Error 400")} "${window.sessionStorage.getItem(
              "citizenid"
            )}"`
          );
        }
        if (_.status === 401) {
          setResulterr(`401, ${t("Error 401")}`);
        }
        if (_.status === 404) {
          setResulterr(
            `404, ${t("Error 404")} "${window.sessionStorage.getItem(
              "citizenid"
            )}"`
          );
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
        <CitizenData resultData={resultData} />
      ) : (
        <h2>Error: {resultErr}</h2>
      )}
    </>
  );
};

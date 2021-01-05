import React, { useState, useEffect } from "react";
import { ILocation } from "../@types/location";
import { AwardsList } from "../../generated/definitions/AwardsList";
import { GetBPDAwardsT } from "../../generated/definitions/requestTypes";
import { BackofficeClient } from "../helpers/client";
import { getCitizenId, getUserToken } from "../helpers/coredata";
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import { toError } from "fp-ts/lib/Either";
import { RawModal } from "./RawModal";
import { Award } from "./Award";
import { AwardPeriod } from "../../generated/definitions/AwardPeriod";
import { useTranslation } from "react-i18next";

type AwardsDataProps = {
  location: ILocation;
};

export const Awards: React.FunctionComponent<AwardsDataProps> = props => {
  const [resultData, setResultdata] = useState<AwardsList | undefined>(
    undefined
  );
  const [resultErr, setResulterr] = useState<string>("");
  const [modalContent, setModalcontent] = useState<string>("");
  const [modalState, setModalstate] = useState<boolean>(false);
  const { t } = useTranslation();

  useEffect(() => {
    tryCatch(
      () =>
        BackofficeClient.GetBPDAwards({
          Bearer: `Bearer ${getUserToken()}`,
          "x-citizen-id": props.location.state
            ? props.location.state.citizenid
            : getCitizenId()
        }),
      toError
    )
      .foldTaskEither(
        apiError => fromLeft<Error, TypeofApiResponse<GetBPDAwardsT>>(apiError),
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
    <div className="border rounded shadow p-3 awards">
      <RawModal state={modalState} jsonobj={modalContent} />

      <h3>{t("Awards")}</h3>
      {resultErr && <b>{resultErr}</b>}
      {resultData &&
        resultData.awards.map((el: AwardPeriod, index: number) => (
          <Award el={el} index={index} key={index} popModal={popModal} />
        ))}
    </div>
  );
};

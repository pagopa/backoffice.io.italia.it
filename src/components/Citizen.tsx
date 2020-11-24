import React, { useEffect, useState } from "react";
import CitizenData from "./CitizenData";
import { GetBPDCitizenT } from "../generated/definitions/requestTypes";
import { BPDCitizen } from "../generated/definitions/BPDCitizen"
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";
import {simpleClient} from "../helpers/client";
import { toError } from "fp-ts/lib/Either";
import { useTranslation } from 'react-i18next';


function Citizen(props) {
    const [resultData, setResultdata] = useState<BPDCitizen | undefined>(undefined);
    const [resultErr, setResulterr] = useState<string>("");

    const { t, i18n } = useTranslation();

    useEffect(() => {
      if (props.location.state) {
        const citizenid = props.location.state.citizenid;
        // useful to have value also in case of page-refresh
        window.sessionStorage.setItem('citizenid',props.location.state.citizenid);
      }

      // TaskEither
      tryCatch(() => simpleClient.GetBPDCitizen({
        'x-citizen-id': window.sessionStorage.getItem('citizenid') || "",
        Bearer: `Bearer ${sessionStorage.getItem('userToken')}`
      }), () => toError)
      .foldTaskEither(
        apiError => fromLeft<Error, TypeofApiResponse<GetBPDCitizenT>>(apiError),
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
          setResultdata(_.value)
        }
        if (_.status === 400) {
          setResulterr(`400, ${t('Error 400')} "${window.sessionStorage.getItem('citizenid')}"`)
        }
        if (_.status === 401) {
          setResulterr(`401, ${t('Error 401')}`)
        }
        if (_.status === 404) {
          setResulterr(`404, ${t('Error 401')} "${window.sessionStorage.getItem('citizenid')}"`)
        }
        if (_.status === 500) {
          setResulterr(`500, ${t('Error 500')}`)
        }
      }).run()
    }, []);


    return (
      <>{ resultData ? 
      <CitizenData resultData={resultData} /> :
      <h2>{resultErr}</h2> }
      </>
    );
}

export default Citizen;

import React, { useEffect, useState } from "react";
import CitizenData from "./CitizenData";
import { createClient, WithDefaultsT } from "../generated/definitions/client";
import { GetBPDCitizenT } from "../generated/definitions/requestTypes";
import { BPDCitizen } from "../generated/definitions/BPDCitizen"
import { fromEither, fromLeft, tryCatch } from "fp-ts/lib/TaskEither";
import { readableReport } from "italia-ts-commons/lib/reporters";
import { TypeofApiResponse } from "italia-ts-commons/lib/requests";



function Citizen(props) {
    const [resultData, setResultdata] = useState<BPDCitizen | undefined>(undefined);
    const [resultErr, setResulterr] = useState<string>("");
    

    useEffect(() => {
      if (props.location.state) {
        const citizenid = props.location.state.citizenid;
        // useful to have value also in case of page-refresh
        window.sessionStorage.setItem('citizenid',props.location.state.citizenid);
      }

      const simpleClient = createClient({
        baseUrl: process.env.REACT_APP_API_URL,
        fetchApi: fetch
      });
      // TaskEither
      tryCatch(() => simpleClient.GetBPDCitizen({
        'x-citizen-id': window.sessionStorage.getItem('citizenid') || "",
        Bearer: `Bearer ${sessionStorage.getItem('userToken')}`
      }), () => new Error("API Error"))
      // Unificare gli errori di reject della promise e di Left di GetBPDCitizen
      .foldTaskEither(
        // Creiamo un TaskEither left contenente un Error
        // TaskEither<Left, Right> -> { Left(Error) }
        apiError => fromLeft<Error, TypeofApiResponse<GetBPDCitizenT>>(apiError),
        // Creiamo un TaskEither a partire da l'Either di GetBPDCitizen
        apiResponse =>
          fromEither(
            // Modifichiamo il tipo left da Errors a Error
            apiResponse.mapLeft(err => {
              return new Error(readableReport(err));
            })
          )
      )
      // Adesso abbiamo un unico TaskEither contenente il risultato dell'API o l'errore
      .mapLeft(_ => {
        // TODO: Validation Error
      })
      .map(_ => {
        if (_.status === 200) {
          setResultdata(_.value)
        }
        if (_.status === 401) {
          setResulterr(`401, token di autenticazione non valido`)
        }
        if (_.status === 404) {
          setResulterr(`404, Nessuna corrispondenza trovata con il codice ${window.sessionStorage.getItem('citizenid')}`)
        }
        if (_.status === 500) {
          setResulterr(`505, Errore generico`)
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

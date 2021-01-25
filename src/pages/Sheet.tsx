import React, { useEffect, useState } from "react";
import { ILocation } from "../@types/location";
import { Citizen } from "../components/Citizen";
import TransactionsList from "../components/TransactionsList";
import { setCitizenId } from "../helpers/coredata";
import { PaymentMethod } from "../../generated/definitions/PaymentMethod";

type Props = {
  location: ILocation;
};

const Sheet = (props: Props) => {
  const [, setCitPayMethods] = useState<ReadonlyArray<PaymentMethod>>([]);

  useEffect(() => {
    if (props.location.state) {
      // "state" lost value in case of refresh, so we need to persist data in some way (sessionStorage, for now)
      setCitizenId(props.location.state.citizenid);
    }
  }, [props.location.state]);

  return (
    <>
      <Citizen {...props} setCitPayMethods={setCitPayMethods} />

      <hr />

      <TransactionsList {...props} />
    </>
  );
};

export default Sheet;

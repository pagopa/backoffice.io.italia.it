import React from "react";
import { ILocation } from "../@types/location";
import { Citizen } from "../components/Citizen";
import TransactionsList from "../components/TransactionsList";

type Props = {
  location: ILocation;
};

const Sheet = (props: Props) => {
  useEffect(() => {
    if (props.location.state) {
      // useful to have value also in case of page-refresh
      setCitizenId(props.location.state.citizenid);
    }
  });

  return (
    <>
      <Citizen {...props} />

      <hr />

      <TransactionsList {...props} />
    </>
  );
};

export default Sheet;

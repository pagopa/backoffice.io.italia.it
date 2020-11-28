import React, { useEffect } from "react";
import { Citizen } from "../components/Citizen";
import TransactionsList from "../components/TransactionsList";
import { Location } from "history";
import { setCitizenId } from "../helpers/coredata";

type Props = {
  location: Location<{ citizenid: string }>;
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

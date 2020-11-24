import React, { useEffect } from "react";
import { Citizen } from "../components/Citizen";
import TransactionsList from "../components/TransactionsList";
import { Location } from "history";

type Props = {
  location: Location<{ citizenid: string }>;
};

function Sheet(props: Props) {
  return (
    <>
      <Citizen {...props} />

      <hr />

      <TransactionsList />
    </>
  );
}

export default Sheet;

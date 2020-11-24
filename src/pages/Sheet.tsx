import React, { useEffect } from "react";
import Citizen from "../components/Citizen";
import TransactionsList from "../components/TransactionsList";

function Sheet(props) {
  return (
    <>
      <Citizen {...props} />

      <hr />

      <TransactionsList />
    </>
  );
}

export default Sheet;

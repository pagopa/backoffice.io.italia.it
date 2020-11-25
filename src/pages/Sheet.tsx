import React from "react";
import { ILocation } from "../@types/location";
import { Citizen } from "../components/Citizen";
import TransactionsList from "../components/TransactionsList";

type Props = {
  location: ILocation;
};

const Sheet = (props: Props) => {
  return (
    <>
      <Citizen {...props} />

      <hr />

      <TransactionsList />
    </>
  );
};

export default Sheet;

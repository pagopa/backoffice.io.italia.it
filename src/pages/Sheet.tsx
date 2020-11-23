import React, {useEffect} from "react";
import Citizen from "../components/Citizen";
import { ListaTransazioni } from "../components/ListaTransazioni";




function Sheet(props) {

  return (
    <>
      <Citizen {...props} />

      <hr />

      <ListaTransazioni />
    </>
  );
}

export default Sheet;
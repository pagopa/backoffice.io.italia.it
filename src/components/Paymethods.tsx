import { number } from "io-ts";
import { Integer } from "italia-ts-commons/lib/numbers";
import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Moment from 'react-moment';
import "./Paymethods.css";



import {PaymentMethod} from "../generated/definitions/PaymentMethod";

function Paymethods(props) {

  const [activeTab, setActiveTab] = useState<number>(0);

  const toggle = (tab: number) => {
    if(activeTab !== tab) setActiveTab(tab);
  }


    return (
      <>
        <div className="mt-4 mb-2 font-weight-bold">
          Metodi di pagamento registrati
        </div>

        <Nav tabs className="MetodiPagamento__list">
        {props.paylist.map((el: PaymentMethod, index: number) => (
          <NavItem key={index}>
          <NavLink
            className={`d-flex align-items-center position-relative ${
              activeTab === index ? "active" : ""
            }`}
            title="Visualizza dettaglio"
            onClick={()=> {toggle(index)}}
          >
            <div className={`MetodiPagamento__stato ${el.payment_instrument_status}`}></div>
            <div>
              <div>Metodo {index + 1}</div>
            </div>
          </NavLink>
          </NavItem>
        ))}
        </Nav>
        <TabContent activeTab={activeTab}>
        {props.paylist.map((el: PaymentMethod, index: number) => (
          <TabPane tabId={index} key={index}>
            <div className="container my-3">
              <div className="row">
                <div className="col-sm-2 font-weight-bold">Stato</div>
                <div className="col-sm-10">{el.payment_instrument_status}</div>
                <div className="col-12 py-2"></div>
                <div className="col-sm-2 font-weight-bold">Inserimento</div>
                <div className="col-sm-4"><Moment date={el.payment_instrument_insert_date} /></div>
                <div className="col-sm-2 font-weight-bold">Aggiornamento</div>
                <div className="col-sm-4"><Moment  date={el.payment_instrument_update_date} /></div>
                <div className="col-12 py-2"></div>
                <div className="col-sm-2 font-weight-bold">HPAN</div>
                <div className="col-sm-10 text-break">{el.payment_instrument_hpan}</div>
              </div>
            </div>
          </TabPane>
          ))}
        </TabContent>
      </>
    );

}


export default Paymethods;
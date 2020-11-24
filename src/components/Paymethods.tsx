import { number } from "io-ts";
import { Integer } from "italia-ts-commons/lib/numbers";
import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { format, parseISO } from "date-fns";
import { useTranslation } from 'react-i18next';
import "./Paymethods.css";
import {PaymentMethod} from "../generated/definitions/PaymentMethod";
import classNames from "classnames";

function Paymethods(props) {

  const [activeTab, setActiveTab] = useState<number>(0);

  const { t, i18n } = useTranslation();

  const toggle = (tab: number) => {
    if(activeTab !== tab) setActiveTab(tab);
  }

    return (
      <>
        <div className="mt-4 mb-2 font-weight-bold">
        {t('Payment methods')}
        </div>

        <Nav tabs className="MetodiPagamento__list">
        {props.paylist.map((el: PaymentMethod, index: number) => (
          <NavItem key={index}>
          <NavLink
            className={classNames({
              'd-flex align-items-center position-relative': true,
              'active': activeTab==index
            })}
            title="Visualizza dettaglio"
            onClick={()=> {toggle(index)}}
          >
            <div className={`MetodiPagamento__stato ${el.payment_instrument_status}`}></div>
            <div>
              <div>*{el.payment_instrument_hpan.slice(-5)}</div>
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
                <div className="col-sm-2 font-weight-bold">{t('State')}</div>
                <div className="col-sm-10">{el.payment_instrument_status}</div>
                <div className="col-12 py-2"></div>
                <div className="col-sm-2 font-weight-bold">{t('Insert date')}</div>
                <div className="col-sm-4">{format( parseISO(el.payment_instrument_insert_date), 'dd/MM/yyyy HH:mm')}</div>
                <div className="col-sm-2 font-weight-bold">{t('Update date')}</div>
                <div className="col-sm-4">{format( parseISO(el.payment_instrument_update_date), 'dd/MM/yyyy HH:mm')}</div>
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
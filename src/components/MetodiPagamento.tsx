import React, { Component, useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import "./MetodiPagamento.css";
import creditcardIcon from '/assets/creditcard.svg';


export class MetodiPagamento extends Component {
    


    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0
        };
      }

    toggle(tab) {
        if(this.state.activeTab !== tab) this.setState({ activeTab: tab });
    }

    public render() {
        
            return (
                <>
                <div className="mt-4 mb-2 font-weight-bold">Metodi di pagamento registrati</div>
                    <Nav tabs
                         className="MetodiPagamento__list">
                        <NavItem>
                        <NavLink
                            className={`d-flex align-items-center position-relative ${this.state.activeTab=='1' ? 'active' :''}`}
                            title="Visualizza dettaglio"
                            onClick={() => { this.toggle('1'); }}
                        >
                            <div className="MetodiPagamento__stato attivo"></div>
                            <img src={creditcardIcon} height="32"
                                className="mr-2"
                                />
                            <div>
                                <div>Carta di credito</div>
                                <div className="my-2 text-monospace">***432</div>
                            </div>
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={`d-flex align-items-center position-relative ${this.state.activeTab=='2' ? 'active' :''}`}
                            onClick={() => { this.toggle('2'); }}
                            title="Visualizza dettaglio"
                        >
                            <div className="MetodiPagamento__stato"></div>
                            <img src={creditcardIcon} height="32"
                                className="mr-2"
                                />
                            <div>
                                <span>Carta di debito</span>
                                <div className="my-2 text-monospace">*112</div>
                            </div>
                        </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="container my-3">
                                <div className="row">
                                    <div className="col-sm-3 font-weight-bold">Intestatario</div>
                                    <div className="col-sm-3">Mario Rossi</div>
                                    <div className="col-sm-3 font-weight-bold">PAN</div>
                                    <div className="col-sm-3">***432</div>
                                    <div className="col-sm-3 font-weight-bold">Circuito</div>
                                    <div className="col-sm-3">Visa</div>
                                    <div className="col-sm-3 font-weight-bold">Tipo</div>
                                    <div className="col-sm-3">Carta di credito</div>
                                    <div className="col-sm-3 font-weight-bold">Stato</div>
                                    <div className="col-sm-3">Attivo</div>
                                </div>

                            </div>

                        </TabPane>
                        <TabPane tabId="2">
                        <div className="container my-3">
                                <div className="row">
                                    <div className="col-sm-3 font-weight-bold">Intestatario</div>
                                    <div className="col-sm-3">Raimondo Castino</div>
                                    <div className="col-sm-3 font-weight-bold">PAN</div>
                                    <div className="col-sm-3">*112</div>
                                    <div className="col-sm-3 font-weight-bold">Circuito</div>
                                    <div className="col-sm-3">VisaElectron</div>
                                    <div className="col-sm-3 font-weight-bold">Tipo</div>
                                    <div className="col-sm-3">Carta di credito</div>
                                    <div className="col-sm-3 font-weight-bold">Stato</div>
                                    <div className="col-sm-3">Disattivo</div>
                                </div>

                            </div>
                        </TabPane>
                    </TabContent>

                </>
            );
        }
    }
import React, { Component } from "react";
import { MetodiPagamento } from "./MetodiPagamento";



export class Cittadino extends Component {

    public render() {
        return (
            <>
            <div className="d-flex align-items-center">
                
                <h1>Profilo Cittadino</h1>
                <span className="text-secondary small ml-auto">Support token ricercato: AO201122233</span>
                </div>                
                <div className="row">
                    <div className="col-md-8">
                        <div className="row mt-2">
                            <div className="col-md-3 font-weight-bold">Codice fiscale</div>
                            <div className="col-md-9">MRRSST01A78V123H</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-3 font-weight-bold">Data on-boarding</div>
                            <div className="col-md-9">01/10/2020</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-3 font-weight-bold">Issuer</div>
                            <div className="col-md-9">pagoPA</div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-3 font-weight-bold">IBAN</div>
                            <div className="col-md-9">IT60X0542811101000000123456</div>
                        </div>
                        <MetodiPagamento />
                    </div>
                    <div className="col-md-4">
                        <div className="bg-light p-3 p-md-5 mt-3 mt-md-0">
                            <h6 className="text-uppercase">Situazione Premio al <span className="text-primary">30/10/2020</span> </h6>
                            <div className="h1 p-2 bg-white rounded-lg d-inline-block shadow">110°</div>
                            <div className="h2">1120 <span className="h6">punti</span></div>
                            <div className="h3">22020 <span className="h6">transazioni</span></div>
                        </div>
                    </div>
                </div>
                </>
    
        );
    }
}
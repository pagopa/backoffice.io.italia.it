import React, { Component } from "react";
import "./ListaTransazioni.css";
import viewIcon from "/assets/view.svg";

export class ListaTransazioni extends Component {
  openDetail(index) {
    let idDetail = `detail${index}`;
    document.getElementById(idDetail)?.classList.toggle("d-none");
  }

  public render() {
    return (
      <>
        <h3>Lista transazioni</h3>

        <div className="mt-3">
          <div className="row border-bottom border-dark py-2">
            <div className="col-sm-2 font-weight-bold">Data ora</div>
            <div className="col-sm-2 font-weight-bold">Importo</div>
            <div className="col-sm-2 font-weight-bold">Cashback</div>
            <div className="col-sm-3 font-weight-bold">HPAN</div>
            <div className="col-sm-2 font-weight-bold">Circuit</div>
            <div className="col-sm-1 font-weight-bold"></div>
          </div>
          {[...Array(30)].map((elementInArray, index) => (
            <div
              key={index}
              className={`ListaTransazioni__row row py-2 ${
                index % 2 == 1 ? "bg-light" : ""
              }`}
            >
              <div className="col-sm-2">01/12/20 12:23</div>
              <div className="col-sm-2 ">300,21</div>
              <div className="col-sm-2 ">30,00</div>
              <div className="col-sm-3 ">*432</div>
              <div className="col-sm-2 ">Visa </div>
              <div className="col-sm-1 p-0">
                <img
                  src={viewIcon}
                  className="mr-3 cursor-pointer"
                  height="24"
                  onClick={() => {
                    this.openDetail(index);
                  }}
                />
                <span className="badge badge-primary">RAW</span>
              </div>
              <div
                className="col-12 d-none ListaTransazioni__dettaglio"
                id={`detail${index}`}
              >
                Dettaglio con altri dati
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

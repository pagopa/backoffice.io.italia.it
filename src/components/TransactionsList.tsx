import React from "react";
import "./TransactionsList.css";
import viewIcon from "/assets/view.svg";
import { useTranslation } from "react-i18next";

const TransactionsList = () => {
  function openDetail(index: number): void {
    const idDetail = `detail${index}`;
    document.getElementById(idDetail)?.classList.toggle("d-none");
  }
  const { t } = useTranslation();

  return (
    <>
      <h3>{t("Transactions list")}</h3>

      <div className="mt-3">
        <div className="row border-bottom border-dark py-2">
          <div className="col-sm-2 font-weight-bold">Data ora</div>
          <div className="col-sm-2 font-weight-bold">Importo</div>
          <div className="col-sm-2 font-weight-bold">Cashback</div>
          <div className="col-sm-3 font-weight-bold">HPAN</div>
          <div className="col-sm-2 font-weight-bold">Circuit</div>
          <div className="col-sm-1 font-weight-bold"></div>
        </div>
        {[...Array(30)].map(index => (
          <div
            key={index}
            className={`TransactionsList__row row py-2 ${
              index % 2 === 1 ? "bg-light" : ""
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
                  openDetail(index);
                }}
              />
              <span className="badge badge-primary">RAW</span>
            </div>
            <div
              className="col-12 d-none TransactionsList__detail"
              id={`detail${index}`}
            >
              {t("Transaction details")}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionsList;

import React, { useState } from "react";
import "./TransactionsTable.css";
import { BPDTransactionList } from "../../generated/definitions/BPDTransactionList";
import { useTable, useSortBy, useExpanded, useFilters } from "react-table";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import { fromNullable } from "fp-ts/lib/Option";
import classNames from "classnames";
import { Filter, DefaultColumnFilter } from "../helpers/filters";
import { RawModal } from "./RawModal";
import { TransactionsTableColumns } from "../helpers/TransactionsTableColumns";
import { Columns } from "../@types/react-table";

type Props = {
  transactionsList: BPDTransactionList;
};

export const TransactionsTable: React.FunctionComponent<Props> = ({
  transactionsList
}) => {
  const { t } = useTranslation();
  const [modalState, setModalstate] = useState<boolean>(false);
  const [modalContent, setModalcontent] = useState<string>("");
  const data = React.useMemo(() => transactionsList.transactions, []);
  const columnsDefinition = TransactionsTableColumns();
  const columns = React.useMemo(() => columnsDefinition, []);

  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        sortBy: [
          {
            desc: true,
            id: "trx_timestamp"
          }
        ]
      }
    },
    useFilters,
    useSortBy,
    useExpanded
  );

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <div className="col-12 my-3">
        <div className="row">
          <div className="col-sm-4 ">
            <div className="font-weight-bold">{t("ABI Acquirer")}</div>
            {row.original.acquirer}
          </div>
          <div className="col-sm-4 ">
            <div className="font-weight-bold">
              {t("Acquirer transaction ID")}
            </div>
            {row.original.id_trx_acquirer}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Issuer transaction ID")}</div>
            {row.original.id_trx_issuer}
          </div>
          <div className="col-sm-8 ">
            <div className="font-weight-bold">{t("HPAN")}</div>
            {row.original.hpan}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Operation type")}</div>
            {row.original.operation_type_descr}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Score")}</div>
            {row.original.score}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Cashback period")}</div>
            {row.original.award_period_id}
          </div>
          <div className="col-sm-4">
            <div className="font-weight-bold">{t("Insert date")}</div>
            {fromNullable(row.original.insert_date)
              .map(_ => format(parseISO(_), "dd/MM/yyyy HH:mm"))
              .getOrElse("")}
          </div>
        </div>
      </div>
    ),
    []
  );

  function popModal(structData: object): void {
    setModalcontent(JSON.stringify(structData, null, 3));
    setModalstate(!modalState);
  }

  return (
    <>
      <RawModal state={modalState} jsonobj={modalContent} />
      <table className="table TransactionTable">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? " ↓" : " ↑") : ""}
                  </span>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <React.Fragment key={i}>
                <tr
                  className={classNames({
                    "bg-light": row.isExpanded,
                    cancelled: !row.original.enabled
                  })}
                >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr
                    className={classNames({
                      "bg-light": row.isExpanded,
                      cancelled: !row.original.enabled
                    })}
                  >
                    <td colSpan={visibleColumns.length}>
                      <span
                        className="badge badge-primary float-right cursor-pointer"
                        onClick={() => {
                          popModal(row.original);
                        }}
                      >
                        RAW
                      </span>
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

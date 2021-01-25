import React from "react";
import { useTranslation } from "react-i18next";
import { SelectColumnFilter, SelectHpanFilter } from "./filters";
import { format, parseISO } from "date-fns";
import {
  BPDTransaction,
  Operation_type_descrEnum as OperationType
} from "../../generated/definitions/BPDTransaction";
import viewIcon from "../assets/view.svg";
import { CellProps, Column } from "react-table";

export const TransactionsTableColumns = (): Array<Column<BPDTransaction>> => {
  const { t } = useTranslation();
  return [
    {
      Cell: ({ value }: CellProps<BPDTransaction>) => {
        return format(parseISO(value), "dd/MM/yyyy HH:mm");
      },
      Header: t("Datetime") || "",
      accessor: "trx_timestamp",
      disableFilters: true
    },
    {
      Header: t("Acquirer") || "",
      accessor: "acquirer_descr",
      disableFilters: true
    },
    {
      Header: t("Circuit name") || "",
      accessor: "circuit_type_descr",
      disableFilters: true
    },
    {
      Cell: ({ row }: CellProps<BPDTransaction>) => {
        return (
          <>
            {row.values.amount}{" "}
            <small>{row.original.amount_currency_descr}</small>
          </>
        );
      },
      Header: t("Amount") || "",
      accessor: "amount",
      disableFilters: true
    },
    {
      Cell: ({ value }: CellProps<BPDTransaction>) => {
        return value.slice(-5);
      },
      Filter: SelectHpanFilter,
      Header: t("HPAN") || "",
      accessor: "hpan",
      disableSortBy: true,
      filter: "equals"
    },
    {
      Cell: ({ row }: CellProps<BPDTransaction>) => {
        return row.values.elab_ranking ? (
          t("Yes")
        ) : (
          <span className="elab">{t("No")}</span>
        );
      },
      Header: t("Elab") || "",
      accessor: "elab_ranking",
      disableFilters: true,
      disableSortBy: true
    },
    {
      Cell: ({ row }: CellProps<BPDTransaction>) => {
        {
          return row.values.operation_type_descr === OperationType.Transfer ? (
            <span className="revert">{t("Yes")}</span>
          ) : (
            t("No")
          );
        }
      },
      Header: t("Revert") || "",
      accessor: "operation_type_descr",
      disableFilters: true,
      disableSortBy: true
    },
    {
      Filter: SelectColumnFilter,
      Header: t("Cashback period") || "",
      accessor: "award_period_id",
      disableSortBy: true,
      filter: "equals"
    },
    {
      Cell: ({ row }: CellProps<BPDTransaction>) => (
        <>
          <img
            className="viewIcon float-right"
            src={viewIcon}
            {...row.getToggleRowExpandedProps()}
          />
        </>
      ),
      Header: () => null,
      id: "tools"
    }
  ];
};

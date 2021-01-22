import React from "react";
import { useTranslation } from "react-i18next";
import { SelectColumnFilter, SelectHpanFilter } from "./filters";
import { format, parseISO } from "date-fns";
import { Operation_type_descrEnum as OperationType } from "../../generated/definitions/BPDTransaction";
import viewIcon from "../assets/view.svg";

export const TransactionsTableColumns = () => {
  const { t } = useTranslation();
  return [
    {
      Cell: props => {
        return format(parseISO(props.value), "dd/MM/yyyy HH:mm");
      },
      Header: t("Datetime"),
      accessor: "trx_timestamp",
      disableFilters: true
    },
    {
      Header: t("Acquirer"),
      accessor: "acquirer_descr",
      disableFilters: true
    },
    {
      Header: t("Circuit name"),
      accessor: "circuit_type_descr",
      disableFilters: true
    },
    {
      Cell: ({ row }) => {
        return (
          <>
            {row.values.amount}{" "}
            <small>{row.original.amount_currency_descr}</small>
          </>
        );
      },
      Header: t("Amount"),
      accessor: "amount",
      disableFilters: true
    },
    {
      Cell: props => {
        return props.value.slice(-5);
      },
      Filter: SelectHpanFilter,
      Header: t("HPAN"),
      accessor: "hpan",
      disableSortBy: true,
      filter: "equals"
    },
    {
      Cell: ({ row }) => {
        return row.values.elab_ranking ? (
          t("Yes")
        ) : (
          <span className="elab">{t("No")}</span>
        );
      },
      Header: t("Elab"),
      accessor: "elab_ranking",
      disableFilters: true,
      disableSortBy: true
    },
    {
      Cell: ({ row }) => {
        {
          return row.values.operation_type_descr === OperationType.Transfer ? (
            <span className="revert">{t("Yes")}</span>
          ) : (
            t("No")
          );
        }
      },
      Header: t("Revert"),
      accessor: "operation_type_descr",
      disableFilters: true,
      disableSortBy: true
    },
    {
      Filter: SelectColumnFilter,
      Header: t("Cashback period"),
      accessor: "award_period_id",
      disableSortBy: true,
      filter: "equals"
    },
    {
      Cell: ({ row }) => (
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

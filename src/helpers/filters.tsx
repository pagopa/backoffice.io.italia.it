import React from "react";
import { Input, CustomInput } from "reactstrap";
import { useTranslation } from "react-i18next";
import { FilterProps } from "react-table";
import { BPDTransaction } from "../../generated/definitions/BPDTransaction";

export const DefaultColumnFilter = ({
  column: { filterValue, setFilter }
}: FilterProps<BPDTransaction>) => {
  const { t } = useTranslation();
  return (
    <Input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`${t("Search")} ...`}
    />
  );
};

export const SelectHpanFilter = ({
  column: { filterValue, setFilter, preFilteredRows }
}: FilterProps<BPDTransaction>) => {
  const options = React.useMemo(() => {
    const optionsSet = new Set<string>();
    preFilteredRows.forEach(row => {
      optionsSet.add(row.values.hpan);
    });
    const optionsArray = Array.from(optionsSet.values());
    return [...optionsArray];
  }, [preFilteredRows]);

  return (
    <CustomInput
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=""> </option>
      {options.map(option => (
        <option key={option} value={option}>
          {option.slice(-5)}
        </option>
      ))}
    </CustomInput>
  );
};
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id }
}: FilterProps<BPDTransaction>) => {
  const options = React.useMemo(() => {
    const optionsSet = new Set<string>();
    preFilteredRows.forEach(row => {
      optionsSet.add(row.values[id]);
    });
    const optionsArray = Array.from(optionsSet.values());
    return [...optionsArray];
  }, [id, preFilteredRows]);

  return (
    <CustomInput
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value=""> </option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CustomInput>
  );
};

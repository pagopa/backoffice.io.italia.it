import React from "react";
import { Input, CustomInput } from "reactstrap";
import { useTranslation } from "react-i18next";

export const Filter = ({ column }) => {
  return <div>{column.canFilter && column.render("Filter")}</div>;
};

export const DefaultColumnFilter = ({ column: { filterValue, setFilter } }) => {
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
}) => {
  const options = React.useMemo(() => {
    const optionsSet = new Set();
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
}) => {
  const options = React.useMemo(() => {
    const optionsSet = new Set();
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

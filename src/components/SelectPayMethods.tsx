import React from "react";
import { PaymentMethod } from "../../generated/definitions/PaymentMethod";
import { useTranslation } from "react-i18next";

type SelectProps = {
  el: ReadonlyArray<PaymentMethod>;
  setFilterByHPAN: (arg0: string) => void;
};

export const SelectPayMethods: React.FunctionComponent<SelectProps> = props => {
  const { t } = useTranslation();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    props.setFilterByHPAN(e.target.value);
  }

  return (
    <>
      <select className="custom-select" onChange={handleChange}>
        <option value="">{t("HPAN")}</option>
        {props.el.map((item: PaymentMethod) => (
          <option
            key={item.payment_instrument_hpan}
            value={item.payment_instrument_hpan}
          >
            {item.payment_instrument_hpan.slice(-5)}
          </option>
        ))}
      </select>
    </>
  );
};

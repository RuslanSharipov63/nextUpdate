"use client";
import { FC } from "react";

type TextFieldProps = {
  typeText: string;
  valueText: string;
  nameText: string;
  funcChange: (itemValue: string, itemName: string) => void;
  funcFocus: (itemName: string) => void;
};

const TextField: FC<TextFieldProps> = ({
  typeText,
  valueText,
  funcChange,
  funcFocus,
  nameText,
}) => {
  return (
    <>
      <input
        type={typeText}
        value={valueText}
        onChange={(e) => funcChange(e.target.value, e.target.name)}
        onFocus={(e) => funcFocus(e.target.name)}
        name={nameText}
      />
    </>
  );
};

export default TextField;

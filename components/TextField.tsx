"use client";
import { FC } from "react";

type TextFieldProps = {
  typeText: string;
  valueText?: string;
  nameText: string;
  funcChange: (itemValue: string, itemName: string) => void;
  funcFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  idText: string;
  funcBlur?: (itemName: string) => void
};

const TextField: FC<TextFieldProps> = ({
  typeText,
  valueText,
  funcChange,
  funcFocus,
  nameText,
  idText,
  funcBlur
}) => {

  return (
    <>
      <input
        type={typeText}
        value={valueText}
        onChange={(e) => funcChange(e.target.value, e.target.name)}
        onFocus={(e) => funcFocus?.(e)}
        name={nameText}
        id={idText}
        onBlur={funcBlur && ((e) => funcBlur(e.target.name))}
      />
    </>
  );
};

export default TextField;

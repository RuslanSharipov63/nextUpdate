import { FC } from "react";
import style from "./../stylescomponent/Button.module.css";

type ButtonProps = {
  text: string;
  funcClick: (e: any) => void;
};

const Button: FC<ButtonProps> = ({ text, funcClick }) => {
  return (
    <button
      className={`${style.button} btn waves-effect waves-light`}
      value="ANY_VALUE_HERE"
      type="submit"
      onClick={(e) => funcClick(e)}
    >
      {text}
    </button>
  );
};

export default Button;

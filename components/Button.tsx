import { FC } from "react";

type ButtonProps = {
  text: string;
  funcClick: (e: any) => void;
};

const Button: FC<ButtonProps> = ({ text, funcClick }) => {

  return (
    <button
      className="btn waves-effect waves-light"
      value="ANY_VALUE_HERE"
      type="submit"
      onClick={(e) => funcClick(e)}
    >
      {text}
    </button>
  );
};

export default Button;

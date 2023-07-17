import { FC } from "react";

type LabelTextProps = {
  text: string;
};

const LabelText: FC<LabelTextProps> = ({ text }) => {
  return (
    <div>
      <label>{text}</label>
    </div>
  );
};

export default LabelText;

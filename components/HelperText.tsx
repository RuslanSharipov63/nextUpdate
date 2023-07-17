import { FC } from "react";
type HelperTextProps = {
  text?: string | boolean | null;
};
const HelperText: FC<HelperTextProps> = ({ text }) => {
  return (
    <div>
      <span className="helper-text">{text && text}</span>
    </div>
  );
};

export default HelperText;

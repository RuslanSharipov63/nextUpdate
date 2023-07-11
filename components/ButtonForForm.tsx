import { FC } from "react";
type ButtonForFormProps = {
  text: string;
};

const ButtonForForm: FC<ButtonForFormProps> = ({ text }) => {
  return (
    <button
      className="btn waves-effect waves-light"
      value="ANY_VALUE_HERE"
      type="submit"
     /*  disabled={!props.isvalid}
      onClick={props.handleUpload} */
    >
      {text}
    </button>
  );
};

export default ButtonForForm;

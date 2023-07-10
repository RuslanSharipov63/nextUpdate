import Link from "next/link";
import { FC } from "react";

type buttonProps = {
  text: string;
  linktext: string;
};

const Button: FC<buttonProps> = ({ text, linktext }) => {
  return (
    <li>
      <Link href={linktext} className="waves-effect waves-light btn">
        {text}
      </Link>
    </li>
  );
};

export default Button;

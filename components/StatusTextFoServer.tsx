import { FC } from "react";

type StatusTextForServerProp = {
  text: string;
};

const StatusTextForServer: FC<StatusTextForServerProp> = ({ text }) => {
  return (
    <div>
      <h5 className="center-align">{text}</h5>
    </div>
  );
};

export default StatusTextForServer;

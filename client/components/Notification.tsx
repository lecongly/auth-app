import React from "react";

type Props = {
  err?: string;
  success?: string;
};

const Notification = (props: Props) => {
  return (
    <div className="h-7 mb-2 text-center">
      {props.err && <h2 className="text-red-500">{props.err}</h2>}
      {props.success && <h2 className="text-green-500">{props.success}</h2>}
    </div>
  );
};

export default Notification;

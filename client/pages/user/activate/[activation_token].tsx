import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Notification from "../../../components/Notification";
import Link from "next/link";

const Activate = () => {
  const router = useRouter();
  const { activation_token } = router.query;
  const [err, setErr] = useState("1");
  const [success, setSuccess] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Notification err={err} success={success} />
      <Link href="/user/login">
        <div className="btn-primary">Go to sign in</div>
      </Link>
    </div>
  );
};

export default Activate;

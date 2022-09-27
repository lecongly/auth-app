import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Notification from "../../../components/Notification";
import Link from "next/link";
import { ActivationEmail } from "../../../services/user.service";
import Head from "next/head";

const Activate = () => {
  const router = useRouter();
  const queryParams = router.query;
  const activation_token = String(queryParams.activation_token);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const data = await ActivationEmail(activation_token);
          setSuccess(data.msg);
        } catch (err: any) {
          setErr(err.response.data.msg || "Something is error");
        }
      };
      activationEmail();
    }
  }, [activation_token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Activation</title>
      </Head>
      <div className="text-xl mb-5">
        <Notification err={err} success={success} />
      </div>
      <Link href="/user/login">
        <div className="btn-primary">Go to sign in</div>
      </Link>
    </div>
  );
};

export default Activate;

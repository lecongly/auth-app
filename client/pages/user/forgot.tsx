import Head from "next/head";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import Notification from "../../components/Notification";

const initialState = {
  email: "",
  err: "",
  success: "",
};

const Forgot = () => {
  const [data, setData] = useState(initialState);
  const { email, err, success } = data;

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Forgot Password</title>
      </Head>
      {success ? (
        <div className="flex flex-col items-center justify-center">
          <Notification success={success} />
          <BiMailSend size={"lg"} className="" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h2 className="text-3xl font-bold text-primary mb-20">
            Forgot Your Password?
          </h2>
          <form
            // onSubmit={forgotPassword}
            className="flex flex-col w-1/2 items-center"
          >
            <label htmlFor="email" className="mb-5">
              Enter your email address
            </label>
            <Notification err={err} />

            <input
              type="email"
              id="email"
              className={`${
                err ? "border-red-500" : "border-gray-500"
              } w-full border-2  px-5 py-2 bg-gray-100 outline-none text-base text-gray-500`}
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <button type="submit" className="w-max mt-5 btn-primary">
              Verify your email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Forgot;

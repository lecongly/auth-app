import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Notification from "../../../components/Notification";
const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const ResetPassword = () => {
  const router = useRouter();
  const queryParams = router.query;
  const token = String(queryParams.token);

  const [data, setData] = useState(initialState);
  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {success ? (
        <div className="flex flex-col items-center justify-center">
          <Notification success={success} />
          <Link href="/user/login">
            <div className="w-max mt-5 btn-primary">Go to Login</div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h2 className="text-3xl font-bold text-primary mb-10">
            Reset Password
          </h2>
          <Notification err={err} />
          <form
            // onSubmit={handleResetPass}
            className="flex flex-col w-1/2 items-center"
          >
            <label htmlFor="password" className="my-2">
              Enter password
            </label>

            <input
              type="password"
              id="password"
              className={`${
                err ? "border-red-500" : "border-gray-500"
              } w-full border-2  px-5 py-2 bg-gray-100 outline-none text-base text-gray-500`}
              name="password"
              value={password}
              onChange={handleChangeInput}
            />
            <label htmlFor="cf_password" className="my-2">
              Enter confirm password
            </label>

            <input
              type="password"
              id="cf_password"
              className={`${
                err ? "border-red-500" : "border-gray-500"
              } w-full border-2  px-5 py-2 bg-gray-100 outline-none text-base text-gray-500`}
              name="cf_password"
              value={cf_password}
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
export default ResetPassword;

import Head from "next/head";
import Link from "next/link";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import { BiHide, BiShowAlt, BiUserCircle } from "react-icons/bi";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Notification from "../../components/Notification";

import SocialLogin from "../../components/SocialLogin";
import { IRegister } from "../../models/auth.model";

const initialState: IRegister = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [user, setUser] = useState(initialState);
  const { name, email, password, cf_password, err, success } = user;

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Sign up</title>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className=" rounded-2xl shadow-2xl flex flex-row-reverse w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              L<span className="text-primary">CL</span>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-primary">Sign Up</h2>
              <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              <Notification err={err} success={success} />
              <form
                // onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="bg-gray-100 w-96 p-2 flex items-center">
                  <BiUserCircle className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="bg-gray-100 outline-none text-sm text-gray-500 flex-1"
                    value={name}
                    name="name"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="bg-gray-100 w-96 p-2 flex items-center">
                  <FaRegEnvelope className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm text-gray-500 flex-1"
                    value={email}
                    name="email"
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="bg-gray-100 w-96 p-2 flex items-center">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input
                    type={`${isShowPassword ? "text" : "password"}`}
                    placeholder="Password"
                    className="bg-gray-100 outline-none text-sm text-gray-500 flex-1"
                    value={password}
                    name="password"
                    onChange={handleChangeInput}
                  />
                  <div
                    onClick={() => {
                      setIsShowPassword(!isShowPassword);
                    }}
                    className="cursor-pointer"
                  >
                    {isShowPassword ? <BiHide /> : <BiShowAlt />}
                  </div>
                </div>
                <div className="bg-gray-100 w-96 p-2 mb-2 flex items-center">
                  <MdLockOutline className="text-gray-400 mr-2" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="bg-gray-100 outline-none text-sm text-gray-500 flex-1"
                    value={cf_password}
                    name="cf_password"
                    onChange={handleChangeInput}
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Sign Up
                </button>
              </form>
              <p className="text-gray-400">or sign in with</p>
              <SocialLogin />
            </div>
          </div>
          <div className="w-2/5 bg-primary text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">If you already have account</p>
            <Link href="/user/login">
              <div className="btn-primary-reverse">Sign In</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;

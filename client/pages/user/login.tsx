import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// import icons
import { BiHide, BiShowAlt } from "react-icons/bi";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Notification from "../../components/Notification";
import SocialLogin from "../../components/SocialLogin";
import { ILogin } from "../../models/auth.model";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/user/auth.slice";
import { UserLogin } from "../../services/user.service";

type Props = {};

const initialState: ILogin = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = (props: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = await UserLogin(email, password);
      setUser({ ...user, err: "", success: data.msg });
      localStorage.setItem("login", "true");
      dispatch(loginUser());
      router.push("/");
    } catch (err: any) {
      setUser({
        ...user,
        err: err.response.data.msg || "Something is error",
        success: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Sign up</title>
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className=" rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <div className="text-left font-bold">
              L<span className="text-primary">CL</span>
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-primary">
                Sign in to Account
              </h2>
              <div className="border-2 w-10 border-primary inline-block mb-2"></div>
              <SocialLogin />
              <p className="text-gray-400">or use your email account</p>
              <Notification err={err} success={success} />
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div
                  className={`mb-2.5 rounded-xl overflow-hidden border ${
                    err ? "border-red-500" : " "
                  }`}
                >
                  <div className="bg-gray-100 w-96 p-2.5 flex items-center">
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
                  <div className="bg-gray-100 w-96 p-2.5 flex items-center">
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
                </div>
                <div className="flex justify-between w-96 mb-5 mt-2">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1" />
                    <p>Remember me</p>
                  </label>
                  <div className="text-xs hover:text-gray-400">
                    <Link href="/user/forgot">Forgot Password?</Link>
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="w-2/5 bg-primary text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-2">
              Fill up personal information and start journey with us.
            </p>
            <Link href="/user/register">
              <div className="btn-primary-reverse">Sign Up</div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

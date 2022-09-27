import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IUser } from "../models/user.model";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { enteranceUser, loggedIn, logoutUser } from "../redux/user/auth.slice";
import { myToken, removeToken } from "../redux/user/token.slice";
import { Logout } from "../services/user.service";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector<IUser>(enteranceUser);
  const token = useAppSelector(myToken);
  const isLoggedIn = useAppSelector<boolean>(loggedIn);

  const handleLogout = async () => {
    try {
      const res = await Logout(token);
      console.log(res);
      localStorage.removeItem("firstLogin");
      dispatch(logoutUser());
      dispatch(removeToken());
      router.push("/");
    } catch (err) {
      router.push("/");
    }
  };

  const userLink = () =>
    user ? (
      <div className="group relative dropdown text-primary hover:text-purple-700 cursor-pointer font-bold text-base tracking-wide">
        <div className="flex items-center gap-2">
          <div className="border border-primary w-7 h-7 rounded-full overflow-hidden">
            <Image src={user.avatar} alt="avt" height={30} width={30} />
          </div>
          <p>{user.name}</p>
        </div>
        <div className="group-hover:block dropdown-menu absolute hidden h-auto">
          <ul className="top-0 w-full bg-white shadow px-6 py-4">
            <li className="py-1">
              <Link href="/profile">
                <a className="block text-purple-500 font-bold text-base hover:text-purple-700 cursor-pointer">
                  Profile
                </a>
              </Link>
            </li>
            <li className="py-1" onClick={handleLogout}>
              <a className="block text-purple-500 font-bold text-base hover:text-purple-700 cursor-pointer">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <></>
    );

  return (
    <header className={`border-b shadow-sm bg-white`}>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">LCL</Link>
        </div>
        <ul className="flex items-center gap-x-2">
          <li
            className={`headerLink ${
              router.asPath == "/#about" ? "active" : ""
            }`}
          >
            <Link href="/#about">About</Link>
          </li>
          <li
            className={`${
              router.asPath == "/#page" ? "active" : ""
            } headerLink`}
          >
            <Link href="/#page">Page</Link>
          </li>
        </ul>
        <div>
          {isLoggedIn ? userLink() : <Link href="/user/login">Sign In</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;

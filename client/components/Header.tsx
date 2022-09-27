import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();

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
          <Link href="/user/login">Sign In</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

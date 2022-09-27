import React from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
};

export default Layout;

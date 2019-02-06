import React, { ReactNode } from "react";

interface IComponentProps {
  children: ReactNode;
}

const Layout = (props: IComponentProps) => {

  return <div style={{
    margin: "auto",
    maxWidth: 1000,
  }}>{props.children}</div>;
};

export default Layout;

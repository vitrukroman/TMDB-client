import React, { ReactNode } from "react";

interface IComponentProps {
  children: ReactNode;
}

const Layout = (props: IComponentProps) => {
  return <div style={{
    maxWidth: 1000,
    margin: "auto",
  }}>{props.children}</div>;
};

export default Layout;

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: IProps) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "12px" }}>{children}</Content>
    </Layout>
  );
}

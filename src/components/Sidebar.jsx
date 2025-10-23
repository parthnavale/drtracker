import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  MedicineBoxOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar({ collapsed = false }) {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={200}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" style={{ padding: 16, color: "#fff", fontWeight: 700 }}>
        DrTracker
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["add"]}>
        <Menu.Item key="overview" icon={<HomeOutlined />}>Overview</Menu.Item>
        <Menu.Item key="add" icon={<UserAddOutlined />}>Add New Patient</Menu.Item>
        <Menu.Item key="stock" icon={<MedicineBoxOutlined />}>Medicine Stock</Menu.Item>
        <Menu.Item key="insights" icon={<BarChartOutlined />}>Patient Insights</Menu.Item>
      </Menu>
    </Sider>
  );
}
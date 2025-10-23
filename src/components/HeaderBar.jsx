import React from "react";
import { Layout, Button, Space, Avatar } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function HeaderBar({ collapsed, onToggle, onOpenCustomizer }) {
  return (
    <Header
      style={{
        background: "#00b896",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Space align="center">
        <Button type="text" onClick={onToggle} style={{ color: "#fff" }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <div style={{ fontWeight: 700 }}>Dr. [Name] - General Physician</div>
      </Space>
      <Space>
        <Button shape="circle" type="text" onClick={onOpenCustomizer} icon={<SettingOutlined />} style={{ color: "#fff" }} />
        <Avatar style={{ background: "#fff", color: "#00b896" }}>D</Avatar>
      </Space>
    </Header>
  );
}
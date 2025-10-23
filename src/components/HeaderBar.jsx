import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { ThemeContext } from "../themeContext";

const { Header } = Layout;

export default function HeaderBar({ collapsed, onToggle, onOpenCustomizer }) {
  const { tokens } = useContext(ThemeContext);

  return (
    <Header
      style={{
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: tokens?.headerBg || "#fff",
        borderBottom: `1px solid ${tokens?.borderColor || "#f0f0f0"}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button
          type="text"
          onClick={onToggle}
          aria-pressed={collapsed}
          style={{
            color: tokens?.colorPrimary || "#1890ff",
            fontSize: 18,
            padding: "4px 8px",
          }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <h4 style={{ margin: 0, color: tokens?.colorText }}>App Title</h4>
      </div>

      <div>
        <Button onClick={onOpenCustomizer} type="primary" style={{ backgroundColor: tokens?.colorPrimary }}>
          Customize
        </Button>
      </div>
    </Header>
  );
}
import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, BgColorsOutlined } from "@ant-design/icons";
import { ThemeContext } from "../themeContext";

const { Header } = Layout;

export default function HeaderBar({ collapsed, onToggle, onOpenCustomizer }) {
  const { tokens } = useContext(ThemeContext);

  return (
    <Header
      style={{
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        height: 64,
        lineHeight: '64px',
        position: 'sticky',
        top: 0,
        zIndex: 99
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
          type="text"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            fontSize: 18,
            width: 40,
            height: 40,
            color: tokens.colorPrimary
          }}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <h1 style={{ 
          margin: 0, 
          fontSize: '20px', 
          fontWeight: '600',
          color: '#262626'
        }}>
          DrTracker
        </h1>
      </div>

      <div>
        <Button 
          onClick={onOpenCustomizer} 
          type="primary" 
          icon={<BgColorsOutlined />}
          style={{ 
            background: tokens.colorPrimary,
            borderColor: tokens.colorPrimary
          }}
        >
          Customize Theme
        </Button>
      </div>
    </Header>
  );
}
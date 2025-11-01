import React, { useContext, useMemo } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { ThemeContext } from "../themeContext";

const { Sider } = Layout;

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens } = useContext(ThemeContext);

  const menuItems = useMemo(() => [
    {
      key: "/overview",
      icon: <HomeOutlined />,
      label: "Overview",
      onClick: () => navigate("/overview"),
    },
    {
      key: "/patients",
      icon: <UserOutlined />,
      label: "Patients",
      onClick: () => navigate("/patients"),
    },
  ], [navigate]);

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      trigger={null}
      width={200}
      collapsedWidth={0}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: '#001529',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <h2 style={{
          color: '#fff',
          margin: 0,
          fontSize: '24px',
          fontWeight: '600'
        }}>
          DrTracker
        </h2>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          background: 'transparent',
          border: 'none',
          marginTop: 16
        }}
        items={menuItems}
      />
    </Sider>
  );
}
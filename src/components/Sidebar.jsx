import React, { useContext } from "react";
import { Menu } from "antd";
import { ThemeContext } from "../themeContext";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

export default function Sidebar({ collapsed }) {
  const { tokens } = useContext(ThemeContext);

  // When collapsed === true we hide completely (width 0).
  const sidebarWidth = collapsed ? 0 : 200;

  return (
    <aside
      className="app-sidebar"
      style={{
        width: sidebarWidth,
        transition: "width 200ms ease, background-color 200ms ease",
        overflow: "hidden",
        background: tokens?.sidebarBg || "#001529",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
        borderRight: `1px solid ${tokens?.borderColor || "rgba(0,0,0,0.06)"}`,
      }}
      aria-hidden={collapsed}
    >
      <div
        className="sidebar-inner"
        style={{
          width: sidebarWidth,
          padding: sidebarWidth === 0 ? 0 : 16,
        }}
      >
        {/* optional logo area */}
        {sidebarWidth !== 0 && (
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ color: tokens?.colorText || "#fff", margin: 0 }}>App</h3>
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            background: "transparent",
            border: "none",
            color: tokens?.colorText || "#fff",
          }}
          items={[
            { key: "1", icon: <HomeOutlined />, label: "Dashboard" },
            { key: "2", icon: <UserOutlined />, label: "Patients" },
          ]}
        />
      </div>
    </aside>
  );
}
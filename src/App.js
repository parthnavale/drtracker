import React, { useContext, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import AddPatientForm from "./components/AddPatientForm";
import ThemeCustomizer from "./components/ThemeCustomizer";
import { ThemeContext } from "./themeContext";
import "./index.css";

const { Content } = Layout;

export default function App() {
  const { tokens } = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const antdTheme = {
    token: {
      colorPrimary: tokens.colorPrimary,
      borderRadius: tokens.borderRadius,
    },
  };

  // Match the sidebar width used in Sidebar.jsx
  const sidebarWidth = collapsed ? 0 : 200;

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} />

        <Layout
          className={`site-layout ${tokens.compact ? "compact" : ""}`}
          style={{
            marginLeft: sidebarWidth,
            transition: "margin-left 200ms ease",
            minHeight: "100vh",
          }}
        >
          <HeaderBar
            collapsed={collapsed}
            onToggle={() => setCollapsed((c) => !c)}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />
          <Content style={{ padding: "24px", background: tokens?.contentBg || "#f5f5f5" }}>
            <div className="card">
              <h2>Add New Patient</h2>
              <AddPatientForm />
            </div>
          </Content>
        </Layout>

        <ThemeCustomizer open={customizerOpen} onClose={() => setCustomizerOpen(false)} />
      </Layout>
    </ConfigProvider>
  );
}
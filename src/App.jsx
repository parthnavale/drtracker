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

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} />
        <Layout
          className={`site-layout ${tokens.compact ? "compact" : ""}`}
          style={{
            marginLeft: collapsed ? 80 : 200,
            transition: "margin-left 0.2s",
          }}
        >
          <HeaderBar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />
          <Content style={{ padding: "24px" }}>
            <div className="card">
              <h2>Add New Patient</h2>
              <AddPatientForm />
            </div>
          </Content>
        </Layout>
        <ThemeCustomizer
          open={customizerOpen}
          onClose={() => setCustomizerOpen(false)}
        />
      </Layout>
    </ConfigProvider>
  );
}

import React, { useContext, useState, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, Layout, Spin } from "antd";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import ThemeCustomizer from "./components/ThemeCustomizer";
import OverviewPage from "./pages/OverviewPage";
import PatientsPage from "./pages/PatientsPage";
import PatientInsightsPage from "./pages/PatientInsightsPage";
import MedicineStockPage from "./pages/MedicineStockPage";
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
            marginLeft: collapsed ? 0 : 200,
            transition: "margin-left 0.2s",
          }}
        >
          <HeaderBar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />
          <Content 
            style={{ 
              background: '#f0f2f5',
              minHeight: 'calc(100vh - 64px)'
            }}
          >
            <Suspense fallback={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
              }}>
                <Spin size="large" />
              </div>
            }>
              <Routes>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/patient-insights" element={<PatientInsightsPage />} />
                <Route path="/medicine-stock" element={<MedicineStockPage />} />
                <Route path="/" element={<Navigate to="/overview" replace />} />
              </Routes>
            </Suspense>
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

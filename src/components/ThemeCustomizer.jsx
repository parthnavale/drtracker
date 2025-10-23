import React, { useContext, useState, useEffect } from "react";
import { Drawer, Input, Slider, Radio, Button, Space } from "antd";
import { ThemeContext } from "../themeContext";

/**
 * Simple theme customizer drawer. Updates tokens in ThemeContext.
 * - primary color (hex)
 * - border radius (px)
 * - compact mode (reduces padding via CSS class)
 */
export default function ThemeCustomizer({ open, onClose }) {
  const { tokens, setTokens } = useContext(ThemeContext);
  const [color, setColor] = useState(tokens.colorPrimary || "#00b896");
  const [radius, setRadius] = useState(tokens.borderRadius || 6);
  const [compact, setCompact] = useState(tokens.compact || false);

  useEffect(() => {
    setColor(tokens.colorPrimary);
    setRadius(tokens.borderRadius);
    setCompact(tokens.compact || false);
  }, [tokens, open]);

  const apply = () => {
    setTokens({
      colorPrimary: color,
      borderRadius: radius,
      compact,
    });
    onClose();
  };

  return (
    <Drawer title="Customize Theme" placement="right" onClose={onClose} open={open} width={420}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Primary Color</div>
        <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 80 }} />
        <div style={{ marginTop: 8 }}>
          <Space size="small">
            <Button size="small" onClick={() => setColor("#00b896")} style={{ background: "#00b896", borderColor: "#00b896" }} />
            <Button size="small" onClick={() => setColor("#1890ff")} style={{ background: "#1890ff", borderColor: "#1890ff" }} />
            <Button size="small" onClick={() => setColor("#722ed1")} style={{ background: "#722ed1", borderColor: "#722ed1" }} />
            <Button size="small" onClick={() => setColor("#ff4d4f")} style={{ background: "#ff4d4f", borderColor: "#ff4d4f" }} />
          </Space>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Border Radius ({radius}px)</div>
        <Slider min={0} max={16} value={radius} onChange={(v) => setRadius(v)} />
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}>Compact</div>
        <Radio.Group value={compact ? "compact" : "default"} onChange={(e) => setCompact(e.target.value === "compact")}> 
          <Radio value="default">Default</Radio>
          <Radio value="compact">Compact</Radio>
        </Radio.Group>
      </div>

      <div style={{ textAlign: "right" }}>
        <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
        <Button type="primary" onClick={apply}>Apply</Button>
      </div>
    </Drawer>
  );
}
import React, { useContext, useState, useEffect } from "react";
import { Drawer, Input, Slider, Radio, Button, Space, Divider } from "antd";
import { ThemeContext } from "../themeContext";

/**
 * Theme customizer drawer component
 * Allows users to customize:
 * - Primary color (hex)
 * - Border radius (px)
 * - Compact mode (reduces spacing)
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

  const resetToDefault = () => {
    setColor("#00b896");
    setRadius(6);
    setCompact(false);
  };

  const presetColors = [
    { color: "#00b896", label: "Green (Default)" },
    { color: "#1890ff", label: "Blue" },
    { color: "#722ed1", label: "Purple" },
    { color: "#ff4d4f", label: "Red" },
    { color: "#fa8c16", label: "Orange" },
    { color: "#13c2c2", label: "Cyan" },
  ];

  return (
    <Drawer 
      title="Customize Theme" 
      placement="right" 
      onClose={onClose} 
      open={open} 
      width={420}
    >
      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12, fontWeight: 500, fontSize: 14 }}>Primary Color</div>
        <Input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
          style={{ width: 100, height: 40, cursor: 'pointer' }} 
        />
        <Divider style={{ margin: '16px 0' }} />
        <div style={{ marginBottom: 8, fontSize: 13, color: '#666' }}>Preset Colors</div>
        <Space size="middle" wrap>
          {presetColors.map((preset) => (
            <Button
              key={preset.color}
              size="large"
              onClick={() => setColor(preset.color)}
              style={{ 
                background: preset.color, 
                borderColor: preset.color,
                width: 40,
                height: 40,
                padding: 0,
                border: color === preset.color ? '3px solid #000' : '1px solid transparent'
              }}
              title={preset.label}
            />
          ))}
        </Space>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 12, fontWeight: 500, fontSize: 14 }}>Border Radius ({radius}px)</div>
        <Slider 
          min={0} 
          max={16} 
          value={radius} 
          onChange={(v) => setRadius(v)}
          marks={{
            0: '0px',
            8: '8px',
            16: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: 32 }}>
        <div style={{ marginBottom: 12, fontWeight: 500, fontSize: 14 }}>Layout Density</div>
        <Radio.Group 
          value={compact ? "compact" : "default"} 
          onChange={(e) => setCompact(e.target.value === "compact")}
          buttonStyle="solid"
        > 
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="compact">Compact</Radio.Button>
        </Radio.Group>
      </div>

      <div style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 24px',
        background: '#fff',
        borderTop: '1px solid #f0f0f0'
      }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button onClick={resetToDefault}>Reset to Default</Button>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={apply}>Apply Changes</Button>
          </Space>
        </Space>
      </div>
    </Drawer>
  );
}
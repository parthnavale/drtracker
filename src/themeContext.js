import React, { createContext, useState } from "react";

/**
 * ThemeContext holds Ant Design token overrides and a setter to update them.
 * We keep a minimal set: colorPrimary and borderRadius for the demo.
 */
export const ThemeContext = createContext({
  tokens: {
    colorPrimary: "#00b896",
    borderRadius: 6,
  },
  setTokens: () => {},
});

export function ThemeProvider({ children }) {
  const [tokens, setTokens] = useState({
    colorPrimary: "#00b896",
    borderRadius: 6,
  });

  return (
    <ThemeContext.Provider value={{ tokens, setTokens }}>
      {children}
    </ThemeContext.Provider>
  );
}
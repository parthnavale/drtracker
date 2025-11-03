import React, { createContext, useState } from "react";

/**
 * ThemeContext manages application-wide theme settings
 * Persists theme preferences to localStorage
 */
const DEFAULT_THEME = {
  colorPrimary: "#00b896",
  borderRadius: 6,
  compact: false,
};

const STORAGE_KEY = "drtracker_theme";

export const ThemeContext = createContext({
  tokens: DEFAULT_THEME,
  setTokens: () => {},
});

export function ThemeProvider({ children }) {
  const [tokens, setTokensState] = useState(() => {
    // Load theme from localStorage on initial render
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_THEME, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
    }
    return DEFAULT_THEME;
  });

  const setTokens = (newTokens) => {
    setTokensState(newTokens);
    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTokens));
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ tokens, setTokens }}>
      {children}
    </ThemeContext.Provider>
  );
}
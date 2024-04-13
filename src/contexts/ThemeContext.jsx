import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "my theme";

export default function ThemeContextProvider({ children }) {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const [theme, setTheme] = useState(storedTheme || "light");

  function saveThemeInLocalStorage() {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }

  useEffect(saveThemeInLocalStorage, [theme]);

  const value = { theme, setTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

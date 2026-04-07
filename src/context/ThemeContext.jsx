import { createContext, useContext, useEffect, useRef, useState } from 'react';

const THEMES = ['primary', 'secondary', 'tertiary', 'brand'];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeIndex, setThemeIndex] = useState(-1); // -1 = default, 0-3 = color themes
  const [isDark, setIsDark] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimerRef = useRef(null);

  useEffect(() => {
    if (themeIndex === -1) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', THEMES[themeIndex]);
    }
  }, [themeIndex]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-dark', '');
    } else {
      document.documentElement.removeAttribute('data-dark');
    }
  }, [isDark]);

  const cycleColorTheme = () => {
    setThemeIndex(i => {
      if (i === -1) {
        // Activating from default — show tooltip
        setShowTooltip(true);
        clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = setTimeout(() => setShowTooltip(false), 5000);
        return 0;
      }
      return (i + 1) % THEMES.length;
    });
  };

  const resetTheme = () => {
    setThemeIndex(-1);
    setShowTooltip(false);
    clearTimeout(tooltipTimerRef.current);
  };

  const toggleDark = () => setIsDark(d => !d);

  return (
    <ThemeContext.Provider value={{ themeIndex, cycleColorTheme, resetTheme, showTooltip, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

import { useMemo, useState } from 'react';
import { useSystemColorScheme } from 'shared/hooks/useSystemColorScheme';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const systemScheme = useSystemColorScheme();
  const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || systemScheme;

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps} >
      {children}
    </ThemeContext.Provider >
  );
};

export default ThemeProvider;
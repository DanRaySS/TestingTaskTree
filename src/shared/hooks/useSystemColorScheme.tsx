import { Theme } from 'app/providers/ThemeProvider';
import { useEffect, useState } from 'react';

export function useSystemColorScheme() {
  const [scheme, setScheme] = useState<Theme>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.DARK
      : Theme.LIGHT;
  });

  useEffect(() => {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const changeHandler = (e: MediaQueryListEvent) => {
      setScheme(e.matches ? Theme.DARK : Theme.LIGHT);
    };

    darkMedia.addEventListener('change', changeHandler);

    return () => {
      darkMedia.removeEventListener('change', changeHandler);
    };
  }, []);

  return scheme;
}

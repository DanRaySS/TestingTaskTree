import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../button/Button';
import cls from './ThemeToggle.module.scss';

interface IThemeToggle {
  className?: string;
}

export const ThemeToggle = ({ className }: IThemeToggle) => {
  const { theme, toggleTheme } = useTheme();

  const lightThemeText = 'Светлая тема';
  const darkThemeText = 'Тёмная тема';

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Button
            className={classNames(cls.Toggle, {}, [className])}
            onClick={toggleTheme}
          >
            {theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal container={document.getElementById('body')}>
          <Tooltip.Content className={cls.Tooltip}>
            {theme === Theme.LIGHT ? darkThemeText : lightThemeText}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

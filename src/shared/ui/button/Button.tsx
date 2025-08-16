import { useCallback, type ReactNode } from 'react';
import { EButtonSize } from 'shared/consts/enum';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default';
  className?: string;
  size?: EButtonSize;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPreventDefault?: boolean;
}

export const Button = (props: IButtonProps) => {
  const {
    className,
    size = EButtonSize.MEDIUM,
    children,
    onClick,
    isPreventDefault = true,
    variant = 'default',
    ...otherProps
  } = props;

  const onClickHandle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isPreventDefault) e.preventDefault();
    if (!onClick) return;
    onClick(e);
  }, [isPreventDefault, onClick]);

  const mods = {
    [cls[size]]: true,
    [cls[variant]]: true
  };

  return (
    <button
      className={classNames(cls.Button, mods, [className])}
      {...otherProps}
      onClick={onClickHandle}
    >
      {children}
    </button>
  );
};

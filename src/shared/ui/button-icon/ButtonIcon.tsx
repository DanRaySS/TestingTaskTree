import { useCallback, type ReactNode } from 'react';
import { EButtonSize } from 'shared/consts/enum';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ButtonIcon.module.scss';

interface IButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default';
  className?: string;
  size?: EButtonSize;
  children: ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPreventDefault?: boolean;
}

export const ButtonIcon = (props: IButtonIconProps) => {
  const {
    className,
    size = EButtonSize.SMALL,
    children,
    style,
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
      className={classNames(cls.ButtonIcon, mods, [className])}
      style={style}
      {...otherProps}
      onClick={onClickHandle}
    >
      {children}
    </button>
  );
};

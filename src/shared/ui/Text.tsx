import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

interface ITextProps {
  className?: string;
}

export const Text = ({ className }: ITextProps) => {
  return (
    <div className={classNames(cls.Text, {}, [className])} />
  );
};

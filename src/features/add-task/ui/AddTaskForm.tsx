import { EButtonSize } from 'shared/consts/enum';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/button/Button';
import cls from './AddTaskForm.module.scss';

interface IAddTaskFormProps {
  className?: string;
  onSumbit: () => void;
  setTitle: (value: string) => void;
  title: string;
  setText: (value: string) => void;
  text: string;
}

export const AddTaskForm = (props: IAddTaskFormProps) => {
  const {
    className,
    onSumbit,
    setText,
    text,
    setTitle,
    title,
  } = props;

  return (
    <form
      className={classNames(cls.AddTaskForm, {}, [className])}
      onSubmit={onSumbit}
    >
      <input
        className={cls.Input}
        placeholder='Введите название...'
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={cls.TextArea}
        placeholder='Введите текст...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        size={EButtonSize.LARGE}
        style={{ marginLeft: 'auto' }}
        type='submit'
        variant='default'
        onClick={onSumbit}
      >
        Добавить
      </Button>
    </form>
  );
};

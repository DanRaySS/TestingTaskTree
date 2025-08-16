import { taskStore } from 'entities/task/model/taskStore';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { EButtonSize } from 'shared/consts/enum';
import { Button } from 'shared/ui/button/Button';
import cls from './TaskDetails.module.scss';

export const TaskDetails = observer(() => {
  const { id } = useParams<{ id: string }>();

  const task = useMemo(() => {
    if (!id) return null;
    return taskStore.findTask(id, taskStore.tasks) ?? null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, taskStore.tasks]);

  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task?.title ?? '');
  const [text, setText] = useState(task?.text ?? '');

  if (!task) {
    return (
      <div className={cls.ChooseTask}>
        Выберите задачу
      </div>
    );
  }

  const save = () => {
    taskStore.editTask(task.id, title, text);
    setEditMode(false);
  };

  const edit = () => {
    setTitle(task.title);
    setText(task.text);
    setEditMode(true);
  };

  return (
    <div className={cls.TaskDetails}>
      {editMode
        ? (
          <form onSubmit={save}>
            <input
              className={cls.Input}
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={cls.TextArea}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type='submit'
              onClick={save}
            >
              Сохранить
            </Button>
          </form>
        )
        : (
          <form onSubmit={edit}>
            <h2
              className={cls.Title}
              title={task.title}
            >
              {task.title}
            </h2>
            <p
              className={cls.Text}
              style={{ whiteSpace: 'pre-wrap', marginTop: '0.6rem' }}
              title={task.text}
            >
              {task.text}
            </p>
            <Button
              size={EButtonSize.LARGE}
              style={{ marginTop: '0.8rem' }}
              type='submit'
              onClick={edit}
            >
              Редактировать
            </Button>
          </form>
        )}
    </div>
  );
});

import { TaskNode } from 'entities/task';
import { taskStore } from 'entities/task/model/taskStore';
import { AddTaskForm } from 'features/add-task';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { TaskSearch } from 'widgets/task-search';
import cls from './TaskTree.module.scss';

export const TaskTree = observer(() => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  const addRootTask = () => {
    if (title.trim()) {
      taskStore.addTask(null, title, text);
      setTitle('');
      setText('');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tasksList = useMemo(() => taskStore.getFliteredTasks(query), [query, taskStore.tasks]);

  return (
    <>
      <TaskSearch onChange={setQuery} />

      <AddTaskForm
        className={cls.AddTaskForm}
        setText={setText}
        setTitle={setTitle}
        text={text}
        title={title}
        onSumbit={addRootTask}
      />

      <div className={cls.Tasks}>
        {tasksList.map((task) => (
          <TaskNode
            key={task.id}
            task={task}
          />
        ))}
        {tasksList.length === 0 && (
          <div className={cls.NoTasks}>
            Ничего не найдено
          </div>
        )}
      </div>
    </>
  );
});

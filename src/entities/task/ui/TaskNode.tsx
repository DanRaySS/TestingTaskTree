import {
  ArrowDownIcon,
  ArrowRightIcon,
  CheckIcon,
  PlusIcon,
  TrashIcon
} from '@radix-ui/react-icons';
import { AddTaskForm } from 'features/add-task';
import { getShorterIfOverflow } from 'helpers/getShorterIfOverflow';
import { observer } from 'mobx-react-lite';
import { Checkbox, Collapsible } from 'radix-ui';
import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonIcon } from 'shared/ui/button-icon/ButtonIcon';
import { taskStore } from '../model/taskStore';
import type { Task } from '../types/task';
import cls from './TaskNode.module.scss';

interface ITaskNodeProps {
  task: Task;
  level?: number;
}

export const TaskNode = observer((props: ITaskNodeProps) => {
  const { task, level = 0 } = props;

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const params = useParams();
  const isSelected = params.id === task.id;

  const handleAdd = () => {
    if (newTitle.trim()) {
      taskStore.addTask(task.id, newTitle, newText);
      setNewTitle('');
      setNewText('');
      setShowAddForm(false);
    }
  };

  return (
    <div
      style={{ marginLeft: `${level * 1}rem` }}
    >
      <Collapsible.Root
        open={!task.isCollapsed}
        onOpenChange={() => taskStore.toggleCollapse(task.id)}
      >
        <Collapsible.Trigger asChild>
          <button
            aria-label={task.isCollapsed ? 'Развернуть' : 'Свернуть'}
            className={cls.Arrow}
            style={{ marginRight: task.children.length > 0 ? '0.375rem' : level === 1 ? '1.3125rem' : 0 }}
          >
            {task.children.length > 0 && (task.isCollapsed ? <ArrowRightIcon /> : <ArrowDownIcon />)}
          </button>
        </Collapsible.Trigger>


        {/* Checkbox */}
        <Checkbox.Root
          checked={task.isCompleted}
          className={cls.Checkbox}
          style={{ marginRight: '0.5rem' }}
          onCheckedChange={(value) => taskStore.toggleTask(task.id, Boolean(value))}
        >
          <Checkbox.Indicator >
            <CheckIcon className={cls.CheckIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>

        <Link
          className={classNames(cls.Link, {}, [isSelected ? cls.Link_selected : undefined])}
          style={{ marginRight: '0.5rem' }}
          title={task.title}
          to={task.id}
        >
          {getShorterIfOverflow(task.title, 20)}
        </Link>

        {/* Actions */}
        <ButtonIcon
          className={cls.AddTaskIcon}
          style={{ marginRight: '0.5rem' }}
          title='Добавить подзадачу'
          onClick={() => setShowAddForm((v) => !v)}
        >
          <PlusIcon />
        </ButtonIcon>
        <ButtonIcon
          className={cls.DeleteTaskIcon}
          title='Удалить'
          onClick={() => taskStore.deleteTask(task.id)}
        >
          <TrashIcon />
        </ButtonIcon>

        {showAddForm && (
          <AddTaskForm
            setText={setNewText}
            setTitle={setNewTitle}
            text={newText}
            title={newTitle}
            onSumbit={handleAdd}
          />
        )}

        <Collapsible.Content>
          {task.children.map((child) => (
            <TaskNode
              key={child.id}
              level={level + 1}
              task={child}
            />
          ))}
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
});

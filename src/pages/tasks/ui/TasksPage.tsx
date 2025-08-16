import { Outlet } from 'react-router';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeToggle } from 'shared/ui/theme-toggle/ThemeToggle';
import { TaskTree } from 'widgets/task-tree/ui/TaskTree';
import cls from './TasksPage.module.scss';

interface ITasksPageProps {
  className?: string;
}

const TasksPage = ({ className }: ITasksPageProps) => {
  return (
    <div className={classNames(cls.TasksPage, {}, [className])}>
      <header className={classNames(cls.TasksPage__left)}>
        <div className={cls.HeaderContent}>
          <h1 className={cls.Title}>
            Тестовое задание (Frontend-разработчик)
          </h1>
          <h2>
            Мухортиков Даниил Александрович
          </h2>
          <ThemeToggle className={cls.ThemeToggle} />
        </div>
        <TaskTree />
      </header>
      <main className={classNames(cls.TasksPage__right)}>
        <Outlet />
      </main>
    </div>
  );
};

export default TasksPage;
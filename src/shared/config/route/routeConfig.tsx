import { NotFoundPage } from 'pages/not-found';
import { TasksPage } from 'pages/tasks';
import { Navigate, type RouteObject } from 'react-router';
import { TaskDetails } from 'widgets/task-details/ui/TaskDetails';

export enum AppRoutes {
  DEFAULT = 'default',
  TASKS = 'tasks',
  NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.DEFAULT]: '/',
  [AppRoutes.TASKS]: '/tasks',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.DEFAULT]: {
    path: RoutePath.default,
    element: (
      <Navigate
        replace
        to={RoutePath.tasks}
      />
    )
  },
  [AppRoutes.TASKS]: {
    path: RoutePath.tasks,
    element: <TasksPage />,
    children: [
      {
        path: ':id',
        element: <TaskDetails />
      }
    ]
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />
  },
};
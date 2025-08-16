export interface Task {
  id: string;
  title: string;
  text: string;
  isCompleted: boolean;
  isCollapsed: boolean;
  children: Task[];
}
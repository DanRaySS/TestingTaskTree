import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import { TASKS_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';
import type { Task } from '../types/task';

class TaskStore {
  tasks: Task[] = [];

  selectedTaskId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  addTask(parentId: string | null, title: string, text: string) {
    const newTask: Task = {
      id: nanoid(),
      title,
      text,
      isCompleted: false,
      isCollapsed: false,
      children: []
    };

    if (parentId) {
      const parent = this.findTask(parentId, this.tasks);
      parent?.children.push(newTask);
    } else {
      this.tasks.push(newTask);
    }
    this.saveToStorage();
  }

  editTask(id: string, title: string, text: string) {
    const task = this.findTask(id, this.tasks);
    if (task) {
      task.title = title;
      task.text = text;
      this.saveToStorage();
    }
  }

  deleteTask(id: string) {
    const removeRecursively = (tasks: Task[]): Task[] => tasks.filter(task => {
      if (task.id === id) return false;
      task.children = removeRecursively(task.children);
      return true;
    });

    this.tasks = removeRecursively(this.tasks);
    this.saveToStorage();
  }

  toggleTask(id: string, isCompleted: boolean) {
    const task = this.findTask(id, this.tasks);
    if (task) {
      this.setCompletionRecursive(task, isCompleted);
      this.updateParentCompletion(id);
      this.saveToStorage();
    }
  }

  setCompletionRecursive(task: Task, isCompleted: boolean) {
    task.isCompleted = isCompleted;
    task.children.forEach(child => this.setCompletionRecursive(child, isCompleted));
  }

  updateParentCompletion(childId: string) {
    const findParent = (tasks: Task[]): Task | null => {
      for (const task of tasks) {
        if (task.children.some(c => c.id === childId)) return task;
        const parent = findParent(task.children);
        if (parent) return parent;
      }
      return null;
    };

    const parent = findParent(this.tasks);
    if (parent) {
      parent.isCompleted = parent.children.every(c => c.isCompleted);
      this.updateParentCompletion(parent.id);
    }
  }

  toggleCollapse(id: string) {
    const task = this.findTask(id, this.tasks);
    if (task) {
      task.isCollapsed = !task.isCollapsed;
      this.saveToStorage();
    }
  }

  setSelectedTask(id: string) {
    this.selectedTaskId = id;
  }

  findTask(id: string, tasks: Task[]): Task | undefined {
    for (const task of tasks) {
      if (task.id === id) return task;
      const found = this.findTask(id, task.children);
      if (found) return found;
    }
  }

  getFliteredTasks(query: string): Task[] {
    const trimedLowerQuery = query.trim().toLowerCase();
    if (!trimedLowerQuery) return this.tasks;

    const filterRec = (tasksList: Task[]): Task[] => {
      const out: Task[] = [];
      for (const task of tasksList) {
        const childFiltered = filterRec(task.children);
        const match = task.title.toLowerCase().includes(trimedLowerQuery) ||
          task.text.toLowerCase().includes(trimedLowerQuery);
        if (match || childFiltered.length) {
          out.push({ ...task, children: childFiltered });
        }
      }
      return out;
    };
    return filterRec(this.tasks);
  }

  saveToStorage() {
    localStorage.setItem(TASKS_LOCALSTORAGE_KEY, JSON.stringify(this.tasks));
  }

  loadFromStorage() {
    const data = localStorage.getItem(TASKS_LOCALSTORAGE_KEY);
    if (data) this.tasks = JSON.parse(data);
  }
}

export const taskStore = new TaskStore();
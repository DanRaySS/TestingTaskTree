/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it } from 'vitest';
import type { Task } from '../types/task';
import { taskStore } from './taskStore';

const seed = (): Task[] => ([
  {
    id: '1',
    title: 'Выполнить рутину',
    text: 'Пройтись по главному',
    isCompleted: false,
    isCollapsed: false,
    children: [
      {
        id: '1-1', title: 'Почитать книгу', text: 'Продолжить читать с 250 страницы Анджея Сапковского "Ведьмак"',
        isCollapsed: false, isCompleted: false, children: []
      },
      {
        id: '1-2', title: 'Почистить зубы', text: 'Не забыть почистить вечером!', isCollapsed: false, isCompleted: false,
        children: [
          {
            id: '1-2-1', title: 'Утром', text: '~5 минут', isCollapsed: false, isCompleted: false, children: []
          },
          {
            id: '1-2-2', title: 'Днём', text: '~2 минуты', isCollapsed: false, isCompleted: false, children: []
          },
          {
            id: '1-2-3', title: 'Вечером', text: '~4 минуты', isCollapsed: false, isCompleted: false, children: []
          },
        ]
      },
    ]
  },
  {
    id: '2',
    title: 'Прокачаться как фронтенд-разработчик',
    text: 'Изучить новые технологии, сделать пет-проекты',
    isCompleted: false,
    isCollapsed: false,
    children: [],
  }
]);

describe('TaskStore', () => {
  let store: typeof taskStore;

  beforeEach(() => {
    store = taskStore;
    (store as any).tasks = seed();
  });

  it('toggleTask отмечает подзадачи рекурсивно', () => {
    store.toggleTask('1', true);
    const task = store.findTask('1', (store as any).tasks)!;
    expect(task.isCompleted).toBe(true);
    expect(task.children.every(c => c.isCompleted)).toBe(true);
  });

  it('toggleTask поднимает состояние к родителю, есои все дети выполнены', () => {
    store.toggleTask('1-1', true);
    store.toggleTask('1-2', true);
    const parentTask = store.findTask('1', (store as any).tasks)!;
    expect(parentTask.isCompleted).toBe(true);
  });

  it('deleteTask удаляет ветку', () => {
    store.deleteTask('1-2');
    const parentTask = store.findTask('1', (store as any).tasks)!;
    expect(parentTask.children.find(c => c.id === '1-2')).toBeUndefined();
    expect(store.findTask('1-2', (store as any).tasks)).toBeUndefined();
    expect(store.findTask('1-2-1', (store as any).tasks)).toBeUndefined();
    expect(store.findTask('1-2-2', (store as any).tasks)).toBeUndefined();
    expect(store.findTask('1-2-3', (store as any).tasks)).toBeUndefined();
  });

  it('editTask изменяет заголов и текст', () => {
    const newTitle = 'Прокачаться как бекенд-разработчик';
    const newText = 'Изучить Redis';
    store.editTask('2', newTitle, newText);
    const task = store.findTask('2', (store as any).tasks)!;
    expect(task.title).toBe(newTitle);
    expect(task.text).toBe(newText);
  });

  it('getFilteredTasks фильтрует по заголовку и тексту', () => {
    const task1 = store.getFliteredTasks('Выполнить');
    expect(task1.length).toBe(1);

    const task2 = store.getFliteredTasks('минут');
    expect(task2.length).toBe(1);
    expect(task2[0].children[0].children.length).toBe(3);
  });

  it('getFilteredTasks с пустым полем возвращает всё', () => {
    const task = store.getFliteredTasks('');
    expect(task.length).toBe(2);
  });
});
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AddTaskForm } from './AddTaskForm';

const meta: Meta<typeof AddTaskForm> = {
  title: 'shared/AddTaskForm',
  component: AddTaskForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddTaskForm>;

export const Default: Story = {
  render: () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      alert(`Сохранено в taskStore:\nНазвание: ${title}\nТекст: ${text}`);
    };

    return (
      <AddTaskForm
        setText={setText}
        setTitle={setTitle}
        text={text}
        title={title}
        onSumbit={handleSubmit}
      />
    );
  },
};

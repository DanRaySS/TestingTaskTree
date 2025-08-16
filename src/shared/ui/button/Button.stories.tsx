import type { Meta, StoryObj } from '@storybook/react-vite';
import { EButtonSize } from '../../consts/enum';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
  args: {
    children: 'Кнопка',
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(EButtonSize),
    },
    variant: {
      control: 'select',
      options: ['default'],
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: EButtonSize.SMALL,
    children: 'Маленькая',
  },
};

export const Medium: Story = {
  args: {
    size: EButtonSize.MEDIUM,
    children: 'Средняя',
  },
};

export const Large: Story = {
  args: {
    size: EButtonSize.LARGE,
    children: 'Большая',
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'custom-button',
    children: 'С кастомным классом',
  },
};

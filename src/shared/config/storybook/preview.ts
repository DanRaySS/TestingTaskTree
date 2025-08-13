import type { Preview } from '@storybook/react-vite';

import { fn } from 'storybook/test';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    tags: ['autodocs'],
    argTypes: {
      backgroundColor: { control: 'color', },
      color: { control: 'color', },
    },
    args: { onClick: fn() },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;
import { classNames } from 'shared/lib/classNames/classNames';
import { RouterProvider } from './providers/RouterProvider';
import { useTheme } from './providers/ThemeProvider';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <RouterProvider />
    </div>
  );
}

export default App;

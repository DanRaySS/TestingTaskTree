import { taskStore } from 'entities/task';
import { StoreContext, type StoreContextProps } from '../lib/StoreContext';

interface Props {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: Props) => {
  const store: StoreContextProps = {
    taskStore,
  };

  return (
    <StoreContext.Provider value={store} >
      {children}
    </StoreContext.Provider >
  );
};

export default StoreProvider;
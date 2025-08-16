import { taskStore } from 'entities/task';
import { createContext } from 'react';

export interface StoreContextProps {
  taskStore?: typeof taskStore;
}

export const StoreContext = createContext<StoreContextProps>({});
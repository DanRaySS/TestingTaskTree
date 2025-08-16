import { useContext } from 'react';
import { StoreContext } from './StoreContext';

export const useStore = () => {
  const { taskStore } = useContext(StoreContext);
  if (taskStore === undefined) {
    throw new Error('taskStore is not defined in StoreContext');
  }
  return { taskStore };
};
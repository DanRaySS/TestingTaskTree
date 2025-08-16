import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import cls from './TaskSearch.module.scss';

interface ITaskSearch {
  onChange: (query: string) => void;
}

export const TaskSearch = observer((props: ITaskSearch) => {
  const { onChange } = props;
  const [query, setQuery] = useState('');

  return (
    <div style={{ padding: '0.5rem', borderBottom: '0.0625rem solid #e2e2e2e2' }}>
      <input
        className={cls.TaskSearch}
        placeholder='Найти задачу или подзадачу...'
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
});
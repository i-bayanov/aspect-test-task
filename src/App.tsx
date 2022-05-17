import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

import Content from './Content';

import './App.css';

export default function App() {
  const content = useAppSelector((state: RootState) => state);

  return (
    <div className="App">
      <form>
        <label htmlFor='path'>Путь
          <input type={'text'} id='path' />
        </label>
        <label htmlFor='value'>Новое значение
          <input type={'text'} id='value' />
        </label>
        <button className='submit'>Применить</button>
      </form>
      <div className='content_wrapper'>
        {content.map((item, idx) => <Content key={idx} {...item} />)}
      </div>
    </div>
  );
}

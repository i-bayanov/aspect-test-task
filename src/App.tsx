import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

import Form from './components/Form';
import Content from './Content';

import './App.css';

export default function App() {
  const content = useAppSelector((state: RootState) => state);

  return (
    <div className="App">
      <Form />
      <div className='content_wrapper'>
        {content.map((item, idx) => <Content key={idx} {...item} />)}
      </div>
    </div>
  );
}

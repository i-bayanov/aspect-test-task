import { useAppSelector } from './store/hooks';
import { RootState } from './store/store';

import Content from './Content';

export default function App() {
  const content = useAppSelector((state: RootState) => state);

  return (
    <div className="App">
      {content.map((item, idx) => <Content key={idx} {...item}/>)}
    </div>
  );
}

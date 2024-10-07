import { List } from 'yton-ui';

function App() {
  const items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6' },
  ];
  return (
    <List items={items} bordered renderItem={(item) => <div className='p-2 rounded-sm'>{item.text}</div>} />
  );
}

export default App;

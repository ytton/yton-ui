import { List } from 'yton-ui';

function App() {
  const items = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita dolorem incidunt enim saepe repellendus, possimus ipsam laborum esse explicabo alias quos vel consectetur pariatur quas sint vero totam optio eligendi.' },
    { id: 3, text: 'Item 3 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita dolorem incidunt enim saepe repellendus, possimus ipsam laborum esse explicabo alias quos vel consectetur pariatur quas sint vero totam optio eligendi.' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
    { id: 6, text: 'Item 6' },
  ];
  return (
    <List columns={2} items={items} renderItem={(item) => <div className='p-2 bg-gray-200 rounded-sm'>{item.text}</div>} />
  );
}

export default App;

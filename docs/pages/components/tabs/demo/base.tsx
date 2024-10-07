import { Tabs } from 'yton-ui';

function App() {
  const items = [
    {
      key: '1',
      label: 'Tab 1',
      content: 'Content of Tab Pane 1'
    },
    {
      key: '2',
      label: 'Tab 2',
      disabled: true,
      content: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Tab 3',
      content: 'Content of Tab Pane 3'
    }
  ];
  return <Tabs items={items} defaultActiveKey='1' onChange={(key) => console.log(key)} />;
}

export default App;

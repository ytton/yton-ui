import { Button, Icon } from 'yton-ui';

function App() {
  return (
    <div className="space-x-4">
      <Button type="primary">button</Button>
      <Button>button</Button>
      <Button type="text">button</Button>
      <Button type="link">button</Button>
      <Button icon={<Icon icon="mdi:home"  className='text-base'/>} type="link">home</Button>
    </div>
  );
}

export default App;

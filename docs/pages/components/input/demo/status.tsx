import { Icon, Input } from 'yton-ui';

function App() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Input status="default" prefix={<Icon icon="mdi:clock-outline" />} defaultValue="My site" />
      <Input status="warning" prefix={<Icon icon="mdi:clock-outline" />} defaultValue="My site" />
      <Input status="error" prefix={<Icon icon="mdi:clock-outline" />} defaultValue="My site" />
    </div>
  );
}

export default App;

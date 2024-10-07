import { Icon, Input } from 'yton-ui';

function App() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Input prefix={<Icon icon="mdi:search-web" />} defaultValue="My site" />
      <Input prefix="https://" suffix=".com" defaultValue="My site" />
      <Input prefix="https://" suffix=".com" defaultValue="My site" />
      <Input addonBefore="https://" addonAfter=".com" defaultValue="My site" />
      <Input addonBefore="https://" suffix=".com" defaultValue="My site" />
      <Input addonAfter="元" defaultValue="30" />
    </div>
  );
}

export default App;

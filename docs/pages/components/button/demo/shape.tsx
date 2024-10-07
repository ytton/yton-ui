import { Icon } from '@iconify/react';
import { Button } from 'yton-ui';

function App() {
  return (
    <div className="space-x-4">
      <Button type="primary" shape="circle">
        button
      </Button>
      <Button type="primary" shape="pill">
        button
      </Button>
      <Button type="primary" shape="square">
        A
      </Button>
      <Button type="primary" shape="square" icon={<Icon icon="mdi:home" />} />
      <Button type="primary" danger shape="circle" icon={<Icon icon="mdi:delete" />} />
    </div>
  );
}

export default App;

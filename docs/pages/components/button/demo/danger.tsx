import { Button } from 'yton-ui';

function App() {
  return (
    <div className="space-x-4">
      <Button type="primary" danger>
        button
      </Button>
      <Button danger>button</Button>
      <Button type="text" danger>
        button
      </Button>
      <Button type="link" danger>
        button
      </Button>
    </div>
  );
}

export default App;

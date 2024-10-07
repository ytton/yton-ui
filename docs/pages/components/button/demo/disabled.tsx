import { Button } from 'yton-ui';

function App() {
  return (
    <div className="space-x-4">
      <Button type="primary" disabled>
        button
      </Button>
      <Button type="primary" danger disabled>
        button
      </Button>
      <Button danger disabled>
        button
      </Button>
      <Button type="text" danger disabled>
        button
      </Button>
      <Button type="link" danger disabled>
        button
      </Button>
    </div>
  );
}

export default App;

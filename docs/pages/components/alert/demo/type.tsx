import { Alert } from 'yton-ui';

function App() {
  return (
    <div className="space-y-2">
      <Alert message="Success Text" type="success" />
      <Alert message="Info Text" type="info" />
      <Alert message="Warning Text" type="warning" />
      <Alert message="Error Text" type="error" />
    </div>
  );
}

export default App;

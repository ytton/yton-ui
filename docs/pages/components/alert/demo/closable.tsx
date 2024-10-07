import { Alert } from 'yton-ui';

function App() {
  return (
    <div className="space-y-2">
      <Alert closable message="Success Text" type="success" />
      <Alert message="Success Text" type="success" />
      <Alert closable message="Error Text" description="Error Description Error Description Error Description" type="error" />
      <Alert closable message="Success Text" type="success" />
    </div>
  );
}

export default App;

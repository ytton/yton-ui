import { Alert } from 'yton-ui';

function App() {
  return (
    <div className="space-y-2">
      <Alert banner message="Success Text" type="success" />
      <Alert banner showIcon message="Info Text" type="info" />
      <Alert banner message="Warning Text" description="Will filtered text Will filtered text" type="warning" />
      <Alert banner showIcon closable message="Error Text" type="error" />
    </div>
  );
}

export default App;

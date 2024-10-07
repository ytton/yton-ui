import { Alert, Icon } from 'yton-ui';

function App() {
  return (
    <div className="space-y-4">
      <Alert showIcon message="Success Text" type="success" />
      <Alert showIcon message="Info Text" type="info" />
      <Alert showIcon message="Warning Text" type="warning" />
      <Alert showIcon message="Error Text" type="error" />
      <Alert showIcon message="Success Text" description="Success Description Success Description Success Description" type="success" />
      <Alert showIcon message="Info Text" description="Info Description Info Description Info Description" type="info" />
      <Alert showIcon message="Warning Text" description="Warning Description Warning Description Warning Description" type="warning" />
      <Alert showIcon message="Error Text" description="Error Description Error Description Error Description" type="error" />
      <Alert showIcon icon={<Icon icon="mdi-check-bookmark"/>} message="Success Text" type="success" />
      <Alert showIcon icon={<Icon icon="mdi-check-bookmark"/>} message="Success Text" description="Success Description Success Description Success Description" type="success" />
    </div>
  );
}

export default App;

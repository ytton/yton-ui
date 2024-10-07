import { Input } from 'yton-ui';

function App() {
  return <div className='flex flex-col gap-4'>
    <Input size='large' placeholder="Basic usage"/>
    <Input disabled size='medium' placeholder="Basic usage"/>
    <Input size='small' placeholder="Basic usage"/>
  </div>;
}

export default App;

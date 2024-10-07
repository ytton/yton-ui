import { Button, FileItem, Icon, Upload } from 'yton-ui';

function App() {
  const handleChange = (file: FileItem) => {
    console.log(JSON.parse(JSON.stringify(file)));
  };
  return (
    <Upload action="https://jsonplaceholder.typicode.com/posts/" onChange={handleChange}>
      <Button type="primary" icon={<Icon icon="mdi:upload-box-outline" />}>
        上传文件
      </Button>
    </Upload>
  );
}

export default App;

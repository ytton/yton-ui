import { useState } from 'react';
import { Rate } from 'yton-ui';
function App() {
  const [value, setValue] = useState(1);
  return (
    <>
      <input
        className="border w-[200px] mb-1 px-2 py-2"
        onChange={e => {
          const val = parseInt(e.target.value);
          if (val >= 1 && val <= 5) {
            setValue(val);
          }
        }}
        value={value}
        type="number"
        min={1}
        max={5}
      />
      <Rate value={value} count={5} onChange={setValue}/>
    </>
  );
}

export default App;

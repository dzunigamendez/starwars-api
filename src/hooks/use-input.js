import {useState} from 'react';

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = e => setValue(e.target.value);

  return [value, onChange];
}

export default useInput;

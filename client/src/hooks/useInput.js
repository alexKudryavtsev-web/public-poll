import { useState } from "react";

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange,
  };
}

export default useInput;

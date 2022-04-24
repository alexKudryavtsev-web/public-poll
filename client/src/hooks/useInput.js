import { useState } from "react";

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  function onChange(e) {
    setValue(e.target.value);
  }

  function clear() {
    setValue("");
  }

  return {
    value,
    onChange,
    clear,
  };
}

export default useInput;

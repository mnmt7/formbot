import { useState } from "react";

export default function useInput(initialValue, validationFn) {
  const [value, setValue] = useState(initialValue);
  const [shouldShowError, setShouldShowError] = useState(false);

  const isError = validationFn ? !validationFn(value) : false;

  const handleChange = (event) => {
    setShouldShowError(false);
    setValue(event.target.value);
  };

  const displayError = () => setShouldShowError(true);

  return { value, handleChange, isError, shouldShowError, displayError };
}

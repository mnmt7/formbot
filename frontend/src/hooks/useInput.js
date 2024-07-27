import { useRef, useState } from "react";

export default function useInput(initialValue, validationFn) {
  const [value, setValue] = useState(initialValue);
  const [fieldActive, setFieldActive] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  const isInvalidValue = validationFn ? !validationFn(value) : false;

  const handleChange = (event) => {
    setIsInitial(false);
    setValue(event.target.value);
    setFieldActive(true);
  };

  const showError = () => {
    setIsInitial(false);
    setFieldActive(false);
  };

  const error = !isInitial && !fieldActive && isInvalidValue;

  // console.log({
  //   isInitial,
  //   fieldActive,
  //   isInvalidValue,
  // });

  return { value, handleChange, error, showError };
}

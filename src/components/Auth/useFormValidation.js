import React, { useState } from "react";

function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);

  const handleChange = e => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return { handleChange, handleSubmit, values };
}

export default useFormValidation;

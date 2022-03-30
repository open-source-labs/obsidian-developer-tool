import React, { useState } from 'react';

export const useInput = () => {
  const [inputValue, setValue] = useState('');

  const onChange = (value) => {
    setValue(value);
  };

  return { inputValue, onChange };
};

import React, { useState } from 'react';

// React Hook for testing
export const useInput = () => {
  const [inputValue, setValue] = useState('');

  const onChange = (value) => {
    setValue(value);
  };

  return { inputValue, onChange };
};

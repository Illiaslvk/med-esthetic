import { useState } from 'react';

export const useAuthFormState = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  return [state, handleChange];
};

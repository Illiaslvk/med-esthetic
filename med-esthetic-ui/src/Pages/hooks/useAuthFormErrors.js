import { useState } from 'react';

export const useAuthFormErrors = () => {
  const [signupErrors, setSignupErrors] = useState({
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
  });

  const [loginErrors, setLoginErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const resetSignupErrors = () => {
    setSignupErrors({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
    });
  };

  const resetLoginErrors = () => {
    setLoginErrors({
      emailError: '',
      passwordError: '',
    });
  };

  return {
    signupErrors,
    setSignupErrors,
    resetSignupErrors,
    loginErrors,
    setLoginErrors,
    resetLoginErrors
  };
};

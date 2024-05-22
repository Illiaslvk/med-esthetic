import { useState } from 'react';

export const useAuthFormErrors = () => {
  const [signupErrors, setSignupErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
  });

  const [loginErrors, setLoginErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const resetSignupErrors = () => {
    setSignupErrors({
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
    });
  };

  const resetLoginErrors = () => {
    setLoginErrors({
      emailError: false,
      passwordError: false,
    });
  };

  return [signupErrors, setSignupErrors, resetSignupErrors, loginErrors, setLoginErrors, resetLoginErrors];
};

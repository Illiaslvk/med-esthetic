import React from "react"
import CustomInput from "./CustomInput"
import userIcon from "../../Components/Images/user.png"
import emailIcon from "../../Components/Images/email.png"
import passwordIcon from "../../Components/Images/password.png"

const AuthForm = ({ action, handleChange, state, errors }) => {
  return (
    <div className="inputs">
      {action === "Login" ? null : (
        <div className="name-inputs">
          <CustomInput
            type="text"
            placeholder="First Name"
            value={state.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={errors.firstNameError}
            errorMessage="First Name cannot be empty"
            icon={userIcon}
          />
          <CustomInput
            type="text"
            placeholder="Last Name"
            value={state.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={errors.lastNameError}
            errorMessage="Last Name cannot be empty"
            icon={userIcon}
          />
        </div>
      )}
      <CustomInput
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.emailError}
        errorMessage="Enter a valid email address"
        icon={emailIcon}
      />
      <CustomInput
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={errors.passwordError}
        errorMessage="Password cannot be empty"
        icon={passwordIcon}
      />
    </div>
  )
}

export default AuthForm

import React from "react"

const CustomInput = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  errorMessage,
  icon,
}) => (
  <div className={`input ${error ? "error" : ""}`}>
    <img src={icon} alt="" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={type === "password" ? "new-password" : undefined}
    />
    {error && <span className="error-span">{errorMessage}</span>}
  </div>
)

export default CustomInput

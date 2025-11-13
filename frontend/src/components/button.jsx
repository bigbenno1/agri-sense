import React from 'react';
// import './Button.css;'
const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  style = {},
}) => {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
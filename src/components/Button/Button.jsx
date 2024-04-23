import React from "react";

const Button = ({ type, value, onClick, className }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;

import React from "react";

const Button = ({ value, onClick, className }) => {
  return (
    <button
      className={`py-1 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;

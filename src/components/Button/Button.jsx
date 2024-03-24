import React from "react";

const Button = ({ value, onClick }) => {
  return (
    <button
      className="px-8 py-1 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;

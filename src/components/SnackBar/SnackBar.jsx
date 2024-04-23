import React from "react";
import { IoClose } from "react-icons/io5";

const SnackBar = ({ className, value, onClose }) => {
  return (
    <div
      className={`fixed bottom-[100px] right-[10px] transform:-translate-x-[10px] bg-gray-800 text-white px-4 py-5 rounded-lg flex items-center justify-between gap-5 border-b-[5px] border-t-[2px] border-l-[2px] border-r-[2px] border-[#0088FF] ${className}`}
    >
      <div>{value}</div>
      <div
        onClick={onClose}
        className="cursor-pointer border-2 hover:bg-white rounded-full p-1 transition-all duration-200 hover:text-gray-900"
      >
        <IoClose />
      </div>
    </div>
  );
};

export default SnackBar;

import React from "react";

const SearchInput = ({
  className,
  placeholder,
  type,
  name,
  id,
  value,
  onChange,
}) => {
  return (
    <input
      className={className}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;

import React from "react";

const Spinner = ({ className }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div
        className={`animate-spin rounded-full h-20 w-20 md:h-25 md:w-25 lg:h-32 lg:w-32 border-t-2 border-b-2 border-white ${className}`}
      >
        <style>{spinnerStyles}</style>
      </div>
    </div>
  );
};

export default Spinner;

// CSS for Spinner component
const spinnerStyles = `
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
`;

export { spinnerStyles };

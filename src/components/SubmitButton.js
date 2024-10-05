// src/components/SubmitButton.js
import React from 'react';

const SubmitButton = ({ onClick, children, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-blue-300 border-2 border-blue-600 font-semibold text-black px-16 py-4 mt-2 mb-8 items-center justify-center rounded-md shadow-lg shadow-black transition-transform transform hover:scale-105 hover:bg-blue-200 hover:border-blue-600 duration-300 w-auto ${className}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;

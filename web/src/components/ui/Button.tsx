// components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-primary-500 cursor-pointer hover:bg-primary-600 text-white text-base px-6 py-3 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
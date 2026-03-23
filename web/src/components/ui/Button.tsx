// components/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

const variants = {
  primary: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-white hover:bg-gray-100 border-2 border-[#E5E7EB]",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${variants[variant]} cursor-pointer text-base px-6 py-3 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
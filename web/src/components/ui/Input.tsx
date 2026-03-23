import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs text-black-300 font-medium">{label}</label>
      )}
      <input
        className={`
          w-full px-3 py-2 text-sm
          border rounded-md
          text-black-400 placeholder:text-black-200
          focus:outline-none focus:ring-1 focus:ring-primary-500
          transition-shadow
          ${error ? "border-red-400" : "border-gray-100"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
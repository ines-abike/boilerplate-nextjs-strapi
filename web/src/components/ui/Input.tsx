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
      {/* Foundation /BlackColor/blackcolor-50 */}
      <input
        className={`
          w-full px-4 py-3 text-sm
          border-2 rounded-xl 
          text-black-[#34160E]
          outline-none
          transition-shadow border-[#E6E6E6]
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
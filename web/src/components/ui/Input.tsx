interface InputProps {
  label?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
}

export default function Input({ label, className = "", placeholder, value, onChange, type , ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-xs text-black-300 font-medium">{label}</label>
      )}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className={`
          w-full px-3 py-2 text-sm
          border border-gray-100 rounded-md
          text-black-400 placeholder:text-black-200
          focus:outline-none focus:ring-1 focus:ring-primary-500
          transition-shadow
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
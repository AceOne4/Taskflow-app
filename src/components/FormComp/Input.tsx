import React, { ChangeEventHandler } from "react";

type InputProps = {
  type: string;
  label: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  defaultValue: string;
  name: string;
  // Add any additional props you want to support
};

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  id,
  required = false,
  placeholder,
  defaultValue,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-white mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={id}
        className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;

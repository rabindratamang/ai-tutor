import React from 'react';
import SelectField from './SelectField';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-black text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        className="text-black p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
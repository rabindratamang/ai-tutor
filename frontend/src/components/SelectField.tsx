import React from 'react';

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ value, onChange, options }) => {
  return (
    <div className="flex flex-col">
      <label className="text-black text-sm font-medium mb-1">Select Option</label>
      <select
        className="text-black p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

import React from "react";

const baseInputClass =
  "h-10 w-full rounded-sm border border-gray-200 bg-white px-3 text-xs text-[#263247] outline-none transition placeholder:text-gray-400 focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/10";

export function FormField({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder = "Enter here",
  type = "text",
  pattern,
  maxLength,
  minLength,
  autoComplete,
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[10px] font-semibold text-[#263247] sm:text-xs">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        minLength={minLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={baseInputClass}
      />
    </label>
  );
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[10px] font-semibold text-[#263247] sm:text-xs">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={baseInputClass}
      >
        <option value="">Select</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 4,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold text-[#263247] sm:text-xs">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder="Write your message..."
        className="w-full resize-y rounded-sm border border-gray-200 px-3 py-2.5 text-xs text-[#263247] outline-none transition placeholder:text-gray-400 focus:border-[#E87565] focus:ring-2 focus:ring-[#E87565]/10"
      />
    </label>
  );
}

"use client";
import React from "react";

export const FormInput = ({
  label,
  type = "text",
  placeholder,
  isSelect,
  className = "",
  value,
  onChange,
  readOnly = false,
  options = [],
  optionLabel = "majorName",  // default label
  optionValue = "uuid",       // default value
}) => {
  return (
    <div className={`form-group mb-4 ${className}`}>
      <label className="form-label fs-4">{label}</label>

      {isSelect ? (
        <select
          className="form-select p-2"
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option[optionValue]} value={option[optionValue]}>
              {option[optionLabel]}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="form-control p-2"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

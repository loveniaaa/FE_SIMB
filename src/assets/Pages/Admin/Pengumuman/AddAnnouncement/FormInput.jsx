"use client";
import React from "react";

function FormInput({
  label,
  placeholder,
  icon,
  multiline,
  height,
  type,
  name,
  value,
  onChange,
  min,
}) {
  return (
    <div className="mb-3">
      {label && <label className="form-label fw-semibold">{label}</label>}
      <div className="input-group">
        {multiline ? (
          <textarea
            className="form-control"
            placeholder={placeholder}
            style={{ height: height || "100px" }}
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <>
            <input
              type={type || "text"}
              className="form-control"
              placeholder={placeholder}
              name={name}
              min={min}
              value={value}
              onChange={onChange}
            />
            {icon && (
              <span className="input-group-text">
                <img src={icon} alt="" style={{ width: "16px" }} />
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FormInput;

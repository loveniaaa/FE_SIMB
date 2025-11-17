"use client";
import * as React from "react";

const InputDesign = React.forwardRef(
  (
    {
      placeholder = "Placeholder",
      value,
      onChange,
      type = "text",
      size = "",
      variant = "",
      isValid,
      isInvalid,
      className = "",
      ...props
    },
    ref,
  ) => {
    const getInputClasses = () => {
      const classes = ["form-control"];

      if (size) {
        classes.push(`form-control-${size}`);
      }

      if (variant) {
        classes.push(`form-control-${variant}`);
      }

      if (isValid) {
        classes.push("is-valid");
      }

      if (isInvalid) {
        classes.push("is-invalid");
      }

      if (className) {
        classes.push(className);
      }

      return classes.join(" ");
    };

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={getInputClasses()}
        style={{
          width: "655px",
          height: "35px",
          fontSize: "16px",
          fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
          color: "#040404",
        }}
        {...props}
      />
    );
  },
);

InputDesign.displayName = "InputDesign";

export default InputDesign;

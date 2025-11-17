"use client";
import React from "react";

const FileUploadField = ({ label, onChange }) => {
  return (
    <div className="mb-4">
      <label className="form-label fs-5 text-dark">{label}</label>
      <div className="input-group">
        
        <input
          type="file"
          className="form-control"
          id="inputGroupFile"
          aria-label="Upload"
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default FileUploadField;

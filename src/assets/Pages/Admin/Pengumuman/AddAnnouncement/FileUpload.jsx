import React from "react";

function FileUpload({ onFileChange }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      alert("Hanya file PDF, JPG, JPEG, PNG yang diperbolehkan.");
      return;
    }

    if (file.size > maxSize) {
      alert("Ukuran file maksimal 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // strip metadata
      onFileChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="input-group mt-3" style={{ maxWidth: "705px" }}>
      <label className="input-group-text bg-light text-muted border">
        Choose File
      </label>
      <input
        type="file"
        className="form-control"
        id="inputGroupFile"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  );
}

export default FileUpload;

import React from "react";

const DocumentUploadHeader = () => {
  return (
    <header className="d-flex justify-content-between align-items-center mb-5">
      <h1 className="fs-2 fw-semibold text-dark m-0">
        Formulir Pendaftaran Upload Dokumen
      </h1>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/e3977f02412e3db8f910002e785a5e54174d222b?placeholderIfAbsent=true"
        alt="Upload Document Icon"
        className="img-fluid"
        style={{ width: "90px", aspectRatio: "1" }}
      />
    </header>
  );
};

export default DocumentUploadHeader;

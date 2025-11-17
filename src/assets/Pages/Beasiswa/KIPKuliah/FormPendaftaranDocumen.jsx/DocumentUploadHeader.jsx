import React from "react";
import { KIPLogo } from "../../../../img";

const DocumentUploadHeader = () => {
  return (
    <header className="d-flex justify-content-between align-items-center mb-5">
      <h1 className="fs-2 fw-semibold text-dark m-0">
        Formulir Pendaftaran Upload Dokumen
      </h1>
      <img
        src={KIPLogo}
        alt="Upload Document Icon"
        className="img-fluid"
        style={{ width: "90px", aspectRatio: "1" }}
      />
    </header>
  );
};

export default DocumentUploadHeader;

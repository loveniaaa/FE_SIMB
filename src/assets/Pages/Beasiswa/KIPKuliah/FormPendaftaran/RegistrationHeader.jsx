import React from "react";
import { KIPLogo } from "../../../../img";

export const RegistrationHeader = () => {
    return (
      <header className="d-flex justify-content-between align-items-center w-100 mb-5">
        <h1 className="fs-1 fw-semibold m-0">Formulir Pendaftaran</h1>
        <img
          src={KIPLogo}
          className="img-fluid"
          alt="Registration logo"
          style={{ width: "90px" }}
        />
      </header>
    );
  };
  
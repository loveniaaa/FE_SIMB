"use client";
import React from "react";
import BackgroundImage from "./BackgroundImage";
import ResetForm from "./ResetForm";


function ForgotPassword() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Onest:wght@400;600;700&family=Roboto:wght@700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <main className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-white">
        <section className="position-relative w-100 h-100 d-flex justify-content-center align-items-center">
          <BackgroundImage />
          <div
            className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
              backdropFilter: "blur(72.35px)",
              backgroundColor: "rgba(222, 222, 222, 0.67)",
              padding: "241px 461px",
            }}
          >
            <ResetForm />
          </div>
        </section>
      </main>
      <style jsx>{`
        @media (max-width: 991px) {
          div {
            padding: 200px 300px !important;
          }
        }
        @media (max-width: 640px) {
          div {
            padding: 100px 100px !important;
          }
        }
      `}</style>
    </>
  );
}

export default ForgotPassword;

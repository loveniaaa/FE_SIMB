"use client";
import React from "react";
import { Link } from "react-router-dom";

function ResetForm() {

  return (
    <>
      <form
        className="bg-white rounded-3 p-3 d-flex flex-column align-items-center position-relative form-container"
      >
        <h1 className="fw-semibold mb-4 title">Email telah dikirim di Email anda</h1>
        <p className="description mb-3">
          Silahkan cek email anda untuk mendapatkan link reset password
        </p>
        
        <Link to="/login" type="submit" className="btn submit-button text-center">
          Back to login
        </Link>
      </form>

      <style jsx>{`
        .form-container {
          width: 800px;
          height: 330px;
          padding-top: 102px !important;
        }
        .title {
          font-family: "Onest", sans-serif;
          font-size: 25px;
          color: #000;
        }
        .description {
          font-family: "Onest", sans-serif;
          font-size: 16px;
          color: #000;
        }
        .email-input {
          width: 500px;
          height: 35px;
          color: #adb5bd;
          font-family: "Onest", sans-serif;
          border-color: #a19999;
        }
        .submit-button {
          width: 500px;
          height: 35px;
          border-radius: 25px;
          background-color: #bab7b7;
          color: #000;
          font-family: "Roboto", sans-serif;
          font-weight: 700;
          font-size: 16px;
          white-space: nowrap;
          padding: 0;
          text-align: center;
          transition: background-color 0.3s ease;
        }
        .submit-button:hover {
          background-color: #a7a4a4;
          color: #fff;
        }

        @media (max-width: 991px) {
          .form-container {
            width: 600px;
            height: 400px;
            padding-top: 80px !important;
          }
          .title {
            font-size: 20px;
          }
          .description {
            font-size: 14px;
          }
          .email-input {
            width: 400px;
            height: 30px;
          }
          .submit-button {
            width: 400px;
            height: 30px;
            font-size: 14px;
          }
        }

        @media (max-width: 640px) {
          .form-container {
            width: 300px;
            height: 300px;
            padding-top: 50px !important;
          }
          .title {
            font-size: 18px;
          }
          .description {
            font-size: 12px;
          }
          .email-input {
            width: 250px;
            height: 25px;
          }
          .submit-button {
            width: 250px;
            height: 25px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
}

export default ResetForm;

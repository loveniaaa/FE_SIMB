import React from "react";
import styles from "./signup.module.css";
import { LogoUK, ScholarshipLogo } from "../../img";
import { Link } from "react-router-dom";

const LoginComplete = () => {
    return (
        <>
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    <div className={`${styles.kiri} col-md-12 position-relative`}>
                        <div className={`${styles.glassBox} min-vh-100 d-flex flex-column align-items-center p-4 position-absolute w-100`}>
                            <img src={LogoUK} className="ms-4 mt-3" style={{ width: 250, height: 'auto' }} />

                            {/* Tambah wrapper baru di sini */}
                            <div className="d-flex justify-content-center align-items-center w-100 flex-grow-1">

                                    <div className={`${styles.card} d-flex flex-column justify-content-center align-items-center`}>
                                        <div>
                                            <h5 className="text-white fw-bolder fs-2 text-center">Akun anda telah berhasil di buat</h5>
                                            <p className="text-light fs-4 text-center">Silahkan Cek Email anda</p>
                                        </div>

                                        <Link to="/login" className={`${styles.button} btn btn-primary mt-4`}>Login</Link>
                                    </div>
                            </div>
                        </div>

                        <img src={ScholarshipLogo} className="justify-content-center align-items-center" style={{ width: "700px", height: "auto" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComplete;
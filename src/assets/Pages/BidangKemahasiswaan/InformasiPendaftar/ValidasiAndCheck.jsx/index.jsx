import React from "react";
import DocumentValidation from "./DocumentValidation";
import BidangKemahasiswaanLayout from "../../components/BidangKemahasiswaanLayout"
import { Link, useParams } from "react-router-dom";
import DocumentValidationBulk from "./DocumentValidationBulk";

const ValidasiAndCheck = () => {
    const { uploadedBy } = useParams();
    return(
        <BidangKemahasiswaanLayout>
            <main className="bg-white">
                <div className="container-fluid">
                <div className="row">
                    <div className="col">
                    <nav className="d-flex align-items-center gap-2 mt-4 fs-4 fw-bold">
                        <Link to={`/bidang/informasi-pendaftar/data-pendaftar/${uploadedBy}`}>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/6e56f22283ca426d8ccf6afbc1731b56/659fa5f3e981f264647a7f21ca78fa1154d428a4"
                                alt=""
                                className="breadcrumb-icon"
                                style={{ width: "25px" }}
                            />
                        </Link>
                        <Link to={"/bidang/informasi-pendaftar"}>
                            <span>Daftar Mahasiswa</span>
                        </ Link>
                        <span>/</span>
                        <Link to={`/bidang/informasi-pendaftar/data-pendaftar/${uploadedBy}`}><span>Data Pendaftar</span> </Link>
                        <span>/</span>
                        <span className="text-primary">Validasi Data Dokumen</span>
                    </nav>
                    {/* <div className="mt-4 ms-3">
                        <DocumentValidation />
                    </div> */}
                    <div className="mt-4 ms-3">
                        <DocumentValidationBulk />
                    </div>
                    </div>
                </div>
                </div>
            </main>
        </BidangKemahasiswaanLayout>
    )
}

export default ValidasiAndCheck;
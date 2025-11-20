import React from "react";
import BidangKemahasiswaanLayout from "../components/BidangKemahasiswaanLayout";
import { StudentList } from "./StudentList";

const InformasiPendaftar = () => {
    return (
        <BidangKemahasiswaanLayout>
            <StudentList />
        </BidangKemahasiswaanLayout>
    );
}

export default InformasiPendaftar;
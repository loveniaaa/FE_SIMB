import React from "react";
import BidangKemahasiswaanLayout from "../../components/BidangKemahasiswaanLayout";
import { StudentDetailsAndParentInformation } from "./Detail";


const DataPendaftar = () => {
    return (
        <BidangKemahasiswaanLayout>
            <main className="container-fluid">
                <StudentDetailsAndParentInformation />
            </main>
        </BidangKemahasiswaanLayout>
    )
}

export default DataPendaftar;
import React from "react";
import { Link } from "react-router-dom";
import "./dashboard-bidang-kemahasiswaan.css";
import BidangKemahasiswaanLayout from "../components/BidangKemahasiswaanLayout";
import RegistrantTable from "./RegistrantTable";
import SummaryCards from "./SummeryCard";

const DashboardBidangKemahasiswaan = () => {
    return (
        <BidangKemahasiswaanLayout>
            <SummaryCards />
            <RegistrantTable />
        </BidangKemahasiswaanLayout>
    )
}

export default DashboardBidangKemahasiswaan;
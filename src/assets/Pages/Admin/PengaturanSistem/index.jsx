import React from "react";
import AdminLayout from "../components/AdminLayout";
import PengaturanSistemContent from "./PengaturanSistem";

const PengaturanSistem = () => {
    return(
        <>
            <AdminLayout>
                <PengaturanSistemContent />
            </AdminLayout>
        </>
    )
}

export default PengaturanSistem;
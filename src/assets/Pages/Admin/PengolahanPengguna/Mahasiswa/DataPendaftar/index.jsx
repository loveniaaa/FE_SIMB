import React from "react";
import { StudentDetailsAndParentInformation } from "./Detail";
import AdminLayout from "../../../components/AdminLayout";


const AdminDataPendaftar = () => {
    return (
        <AdminLayout>
            <main className="container-fluid">
                <StudentDetailsAndParentInformation />
            </main>
        </AdminLayout>
    )
}

export default AdminDataPendaftar;
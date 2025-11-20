import React from "react";
import AdminLayout from "../../components/AdminLayout";
import StudentList from "./StudentList";

const Mahasiswa = () => {
    return (
        <AdminLayout>
            <StudentList />
        </AdminLayout>
    )
}

export default Mahasiswa;
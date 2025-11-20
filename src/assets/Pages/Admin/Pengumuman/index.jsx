import React from "react";

import AdminLayout from "../components/AdminLayout";
import { AnnouncementList } from "./AnnouncementList";


const Pengumuman = () => {
    return (
        <AdminLayout>
            <AnnouncementList />
        </AdminLayout>
    )
}

export default Pengumuman;
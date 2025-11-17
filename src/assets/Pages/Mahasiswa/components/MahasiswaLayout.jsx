"use client";
import React from "react";
import Sidebar from "./Sidebar";
import Header from "../../../components/Header";




const MahasiswaLayout = ({ children }) => {
  const headerHeight = 70;
  const sidebarWidth = 300;

  return (
    <div>
        <link href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" rel="stylesheet"></link>
      {/* Header: fixed */}

      {/* Sidebar: fixed */}
      <div
        className="position-fixed top-0 start-0 vh-100 border-end bg-white z-2"
        style={{ width: `${sidebarWidth}px`, paddingTop: `${headerHeight}px` }}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <main
        className="overflow-auto"
        style={{
          marginLeft: `${sidebarWidth}px`,         // Tetap perlu karena sidebar fixed
          paddingTop: `${headerHeight + 16}px`,    // Tetap perlu agar tidak ketumpuk header
          //height: "100vh",       // ← Ganti dengan lebar sidebar
          paddingLeft: 10,                          // ← Hapus padding kiri
          paddingRight: 10,                         // ← Hapus padding kanan
        }}
      >
        {children}
      </main>

    </div>
  );
};

export default MahasiswaLayout;

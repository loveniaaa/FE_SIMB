"use client";
import React from "react";
import ActionButton from "./ActionButton";

const UserCard = ({ user, onUpdate, onDelete, onDetail }) => {  // Menambahkan props untuk onUpdate dan onDelete
  return (
    <article className="bg-light rounded-3 p-3 mb-3 d-flex justify-content-between align-items-center flex-wrap">
      <div className="d-flex align-items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="rounded-circle"
          style={{ width: "40px", height: "40px", objectFit: "contain" }}
        />
        <div>
          <h3 className="fs-6 fw-medium mb-1">{user.name}</h3>
          <p className="text-secondary mb-0" style={{ fontSize: "12px" }}>
            {user.email}
          </p>
        </div>
      </div>
      <div className="d-flex gap-2">
        {/* Menambahkan handler onClick untuk update dan delete */}
        <ActionButton 
          label="Detail" 
          iconClass="bi-info-circle" 
          variant="info"
          onClick={() => onDetail(user)} 
        />
        <ActionButton 
          label="Update" 
          iconClass="bi-pencil" 
          variant="primary"
          onClick={() => onUpdate(user)}  // Menambahkan onUpdate
        />
        <ActionButton 
          label="Delete" 
          iconClass="bi-trash" 
          variant="danger"
          onClick={() => onDelete(user.uuid)}  // Menambahkan onDelete
        />
      </div>
    </article>
  );
};

export default UserCard;

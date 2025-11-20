import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const BeasiswaItem = ({ beasiswa, onUpdate, onDelete, onDetail }) => {
    return (
      <div className="d-flex justify-content-between align-items-center border rounded p-3 mb-2">
        <div className="d-flex align-items-center">
          <img src={beasiswa.logo} alt="logo" width="40" height="40" className="me-3" />
          <strong>{beasiswa.nama}</strong>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-success me-2">Status</span>
          <Button variant="info" size="sm" onClick={onDetail}>Detail</Button>
          <Button variant="warning" size="sm" onClick={onUpdate}>Update</Button>
          <Button variant="danger" size="sm" onClick={onDelete}>Delete</Button>
        </div>
      </div>
    );
};

export default BeasiswaItem;
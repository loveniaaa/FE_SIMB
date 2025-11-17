import React from "react";

const DeleteConfirmationModal = ({ show, onClose, onConfirm, title }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Konfirmasi Penghapusan</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Apakah Anda yakin ingin menghapus pengumuman "{title}"?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Batal
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

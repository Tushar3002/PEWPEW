import React from "react";

function DeleteConfirmationModal({
  show,
  onClose,
  onConfirm,
  isDeleting = false,
}) {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title ">Delete Confirmation</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isDeleting}
            />
          </div>

          <div className="modal-body">
            <p className="my-3 fw-bold">
              Are you sure you want to delete this data? This action cannot be
              undone.
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn main-btn border-btn"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn main-btn w-auto"
              onClick={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
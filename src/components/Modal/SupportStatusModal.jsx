import React from "react";

function SupportStatusModal({
  show,
  statusChange,
  adminDescription,
  setAdminDescription,
  onConfirm,
  onClose,
}) {
  if (!show || !statusChange) return null;

  const showAdminComment =
    statusChange.newStatusId === 3 || statusChange.newStatusId === 4;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Status Change</h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <p>
              Are you sure you want to change the status of this data?
            </p>

            {showAdminComment && (
              <div className="mt-3">
                <label className="form-label">
                  Admin Comment
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Add an admin comment (optional)"
                  value={adminDescription}
                  onChange={(e) => setAdminDescription(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn main-btn w-auto"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn main-btn w-auto"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportStatusModal;

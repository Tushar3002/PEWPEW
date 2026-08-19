function StatusConfirmationModal({
  show,
  onClose,
  onConfirm,
  isUpdatingStatus = false,
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
            <h5 className="modal-title">
              Confirm Status Change
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isUpdatingStatus}
            />
          </div>

          <div className="modal-body">
            <p className="my-3 fw-bold">
              Are you sure you want to change the status of the data?
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn main-btn border-btn"
              onClick={onClose}
              disabled={isUpdatingStatus}
            >
              Cancel
            </button>

            <button
              type="button"
              className="btn main-btn w-auto"
              onClick={onConfirm}
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? "Updating..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StatusConfirmationModal;
import React from "react";

function CreateChatModal({ onClose }) {
  return (
    <>
      <div
        className="modal show"
        id="create-chat"
        tabIndex={-1}
        aria-labelledby="create-chat"
        aria-hidden="false"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2
                className="modal-title page-title fw-bold"
                id="exampleModalLabel"
              >
                Create a chat
              </h2>
              <button type="button" className="btn-close" onClick={onClose} />
            </div>
            <div className="modal-body">
              <form>
                <fieldset className="row">
                  <div className="col-12 mt-3">
                    <div className="form-group">
                      <label className="fw-semibold">Select User Type</label>
                      <select className="form-select">
                        <option>----</option>
                        <option>Admin User</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="form-group">
                      <label className="fw-semibold">Admin User</label>
                      <select className="form-select">
                        <option>----</option>
                        <option>John Deo</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <div className="form-group">
                      <label className="fw-semibold">Message</label>
                      <textarea className="form-control"></textarea>
                    </div>
                  </div>
                  <div className="col-12 mt-3 mt-xxl-4">
                    <div className="d-flex flex-wrap justify-content-end gap-3">
                      <button className="btn main-btn border-btn">
                        Cancel
                      </button>
                      <button className="btn main-btn w-auto">Create</button>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default CreateChatModal;

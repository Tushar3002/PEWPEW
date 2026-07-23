import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getSupportTicketDatabyId } from "../../api/SupportList/supportList";

function SupportEditModal({ ticketId, show, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
  } = useForm({});

  useEffect(() => {
    if (show && ticketId) {
      getSupportData();
    }
  }, [show, ticketId]);

  const getSupportData = async () => {
    try {
    //   console.log("TicketId", ticketId);

      const res = await getSupportTicketDatabyId(ticketId);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = {};

  if (!show) return null;
  return (
    <div
      className="modal fade show d-block venue-edit-modal"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">{"Edit Ticket"}</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                {/* Username */}
                <div className="col-md-12">
                  <label className="form-label">
                    Select Username <span className="text-danger">*</span>
                  </label>

                  <input
                    className="form-control"
                    {...register("userName", {
                      required: "UserName is required",
                    })}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">
                    Issue Type <span className="text-danger">*</span>
                  </label>

                  <input
                    className="form-control"
                    {...register("issueType", {
                      required: "Issue Type is required",
                    })}
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>

                  <input
                    className="form-control"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">
                    Ticket Status <span className="text-danger">*</span>
                  </label>

                  <input
                    className="form-control"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">
                    Admin Comments <span className="text-danger">*</span>
                  </label>

                  <textarea
                  
                    className="form-control"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportEditModal;

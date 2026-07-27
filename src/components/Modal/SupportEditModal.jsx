import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  getSupportTicketDatabyId,
  statusUpdateSupportTicket,
} from "../../api/SupportList/supportList";
import { getSupportStatus } from "../../api/Common/commonApi";

const defaultValues = {
  userName: "",
  issueType: "",
  description: "",
  statusId: "",
  adminDescription: "",
};

function SupportEditModal({ ticketId, show, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const [statusOptions, setStatusOptions] = useState([]);
  const [originalStatusId, setOriginalStatusId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (show && ticketId) {
      getSupportData();
      getSupportStatusData();
    } else {
      reset(defaultValues);
      setOriginalStatusId(null);
    }
  }, [show, ticketId]);

  const getSupportData = async () => {
    try {
      const res = await getSupportTicketDatabyId(ticketId);
      const ticketData = res?.data?.data || res?.data || res;


      setOriginalStatusId(Number(ticketData?.statusId));

      reset({
        userName: ticketData?.userName || "",
        issueType: ticketData?.issueType || "",
        description: ticketData?.description || "",
        statusId: ticketData?.statusId?.toString() || "",
        adminDescription: ticketData?.adminDescription || "",
      });
    } catch (error) {
      console.log(error?.response);
    }
  };

  const getSupportStatusData = async () => {
    try {
      const res = await getSupportStatus();
      setStatusOptions(res?.data || res || []);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);

      await statusUpdateSupportTicket({
        ticketId,
        adminDescription: data.adminDescription,
        statusId: Number(data.statusId),
      });

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsSaving(false);
    }
  };

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
          <div className="modal-header">
            <h5 className="modal-title">Edit Ticket</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label">
                    Select Username <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    disabled
                    {...register("userName", {
                      required: "UserName is required",
                    })}
                  />
                  {errors.userName && (
                    <small className="text-danger">
                      {errors.userName.message}
                    </small>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="form-label">
                    Issue Type <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    disabled
                    {...register("issueType", {
                      required: "Issue Type is required",
                    })}
                  />
                  {errors.issueType && (
                    <small className="text-danger">
                      {errors.issueType.message}
                    </small>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    disabled
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <small className="text-danger">
                      {errors.description.message}
                    </small>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="form-label">
                    Ticket Status <span className="text-danger">*</span>
                  </label>

                  <select
                    className="form-select"
                    {...register("statusId", {
                      required: "Ticket Status is required",
                    })}
                  >
                    {statusOptions.map((option) => {
                      const isClosedStatus =
                        originalStatusId === 3 || originalStatusId === 4;

                      const shouldDisable =
                        isClosedStatus && (option.id === 1 || option.id === 2);

                      return (
                        <option
                          key={option.id}
                          value={option.id}
                          disabled={shouldDisable}
                        >
                          {option.description || option.name}
                        </option>
                      );
                    })}
                  </select>

                  {errors.statusId && (
                    <small className="text-danger">
                      {errors.statusId.message}
                    </small>
                  )}
                </div>

                <div className="col-md-12">
                  <label className="form-label">
                    Admin Comments <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    {...register("adminDescription", {
                      required: "Admin Comments are required",
                    })}
                  />
                  {errors.adminDescription && (
                    <small className="text-danger">
                      {errors.adminDescription.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportEditModal;

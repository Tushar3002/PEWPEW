import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBadgeApplicablefor } from "../../api/Common/commonApi";
import { createBadge, getBadgeById, updateBadge } from "../../api/ManageBadges/managebadges";

const BadgeModal = ({ show, onClose, badgeId, onSuccess }) => {
  const isEditable = Boolean(badgeId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      badgeName: "",
      applicableFor: "",
      checkIns: "",
      badgeImage: null,
    },
  });
  const [applicableForOptions, setApplicableForOptions] = useState([]);

  useEffect(() => {
    if (!show) return;
    getApplicableForOptions();

    if (isEditable) {
    fetchBadgeById(badgeId);
    } else {
      reset({
        badgeName: "",
        applicableFor: "",
        checkIns: "",
        badgeImage: null,
      });
    }
  }, [show, badgeId, isEditable, reset]);


  const getApplicableForOptions = async () => {
    try {
      const res = await getBadgeApplicablefor();
      setApplicableForOptions(res.data);
      console.log("applicable", res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchBadgeById = async (badgeId) => {
    try {
        const res = await getBadgeById(badgeId);
        console.log("Badge Id",res.data);
        reset({
            badgeName: res.data.name,
            applicableFor: res.data.applicableFor,
            checkIns: res.data.noOfCheckIns,
            badgeImage: null,
        })
        
    } catch (error) {
        console.log(error.response);
        
    }
  }
  

  const onSubmit = async (data) => {
    try {
      const body = {
        name: data.badgeName,
        applicableFor: data.applicableFor,
        noOfCheckIns: Number(data.checkIns),
        imageName:""
      };

      if (isEditable) {
        await updateBadge(badgeId, body);
      } else {
        await createBadge(body);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to save badge:", error);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditable ? "Edit Badge" : "Add Badge"}
            </h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              {/* Badge Name */}
              <div className="mb-3">
                <label className="form-label">
                  Badge Name<span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${
                    errors.badgeName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter badge name"
                  {...register("badgeName", {
                    required: "Badge Name is required.",
                  })}
                />

                {errors.badgeName && (
                  <div className="invalid-feedback">
                    {errors.badgeName.message}
                  </div>
                )}
              </div>

              {/* Badge Applicable For */}
              <div className="mb-3">
                <label className="form-label">
                  Badge Applicable For
                  <span className="text-danger">*</span>
                </label>

                <select
                  className={`form-select ${
                    errors.applicableFor ? "is-invalid" : ""
                  }`}
                  {...register("applicableFor", {
                    required: "Badge Applicable For is required.",
                  })}
                >
                    <option value="">Select Applicable For</option>
                  {applicableForOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>

                {errors.applicableFor && (
                  <div className="invalid-feedback">
                    {errors.applicableFor.message}
                  </div>
                )}
              </div>

              {/* Number Of Check-Ins */}
              <div className="mb-3">
                <label className="form-label">
                  No. Of Check-Ins<span className="text-danger">*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  className={`form-control ${
                    errors.checkIns ? "is-invalid" : ""
                  }`}
                  placeholder="Enter number of check-ins"
                  {...register("checkIns", {
                    required: "No. Of Check-Ins is required.",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "No. Of Check-Ins must be at least 1.",
                    },
                  })}
                />

                {errors.checkIns && (
                  <div className="invalid-feedback">
                    {errors.checkIns.message}
                  </div>
                )}
              </div>

              {/* Badge Image */}
              <div className="mb-3">
                <label className="form-label">
                  Badge Image<span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${
                    errors.badgeImage ? "is-invalid" : ""
                  }`}
                  {...register("badgeImage")}
                />

                {errors.badgeImage && (
                  <div className="invalid-feedback">
                    {errors.badgeImage.message}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : isEditable ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;

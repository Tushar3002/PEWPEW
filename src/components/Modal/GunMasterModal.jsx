import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addGuns, editGunById, getGunById } from "../../api/Gun/gunApi";
import { categoryDropDown } from "../../api/Gun/gunCategoryMaster";
import { getManufacturerDropdownData } from "../../api/Manufacturer/manufacturer";
import { getDropdownAmmunitions } from "../../Ammunition/ammunition";
import "../../assets/css/dropdown.css";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";

export const GunMasterModal = ({ show, onClose, id, onSuccess }) => {
  const isEditable = Boolean(id);

  const [categoryDropdown, setCategoryDropdown] = useState([]);
  const [manufacturerDropdown, setManufacturerDropdown] = useState([]);
  const [ammunitionDropdown, setAmmunitionDropdown] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      gunName: "",
      categoryId: "",
      manufacturerIds: [],
      ammunitionIds: [],
      barrelLength: "",
      details: "",
      approvalStatus: 1,
      imageNames: [],
    },
  });

  const getCategoryDropDown = async () => {
    try {
      const res = await categoryDropDown();
      setCategoryDropdown(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const getManufacturerDropDown = async () => {
    try {
      const res = await getManufacturerDropdownData();
      setManufacturerDropdown(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };
  const getAmmunitionDropDown = async () => {
    try {
      const res = await getDropdownAmmunitions();
      setAmmunitionDropdown(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    if (!show) return;
    getCategoryDropDown();
    getManufacturerDropDown();
    getAmmunitionDropDown();
    if (isEditable) {
      fetchDataById(id);
    } else {
      reset({
        gunName: "",
        categoryId: "",
        manufacturerIds: [],
        ammunitionIds: [],
        barrelLength: "",
        details: "",
        approvalStatus: 1,
        imageNames: [],
      });
    }
  }, [show, id, isEditable, reset]);

  const fetchDataById = async (id) => {
    try {
      const res = await getGunById(id);
      console.log(" Id", res.data);

      reset({
        gunName: res.data.gunName,
        categoryId: res.data.categoryId,
        manufacturerIds: res.data.manufacturerIds,
        ammunitionIds: res.data.ammunitionIds,
        barrelLength: res.data.barrelLength,
        details: res.data.details,
        approvalStatus: res.data.approvalStatus,
        imageNames: res.data.imageNames,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      const body = {
        gunName: data.gunName,
        categoryId: data.categoryId,
        manufacturerIds: data.manufacturerIds,
        ammunitionIds: data.ammunitionIds,
        barrelLength: data.barrelLength,
        details: data.details,
        approvalStatus: data.approvalStatus,
        imageNames: data.imageNames,
      };

      if (isEditable) {
        await editGunById(id, body);
      } else {
        await addGuns(body);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error.response?.data);
    }
  };

  if (!show) return null;
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditable ? "Edit Gun" : "Add Gun"}
            </h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="row mt-1">
                {/* Left Column */}
                <div className="col-md-6">
                  {/* Gun Name */}
                  <div className="mb-3">
                    <label className="form-label">
                      Gun Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.gunName ? "is-invalid" : ""}`}
                      placeholder="Enter gun name"
                      {...register("gunName", {
                        required: "Gun Name is required.",
                      })}
                    />
                    {errors.gunName && (
                      <div className="invalid-feedback">
                        {errors.gunName.message}
                      </div>
                    )}
                  </div>

                  {/* Manufacturer */}
                  <div className="mb-3">
                    <label className="form-label">
                      Manufacturer <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="manufacturerIds"
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          className="venue-gun-multiselect form-control"
                          data={manufacturerDropdown}
                          textField="value"
                          dataItemKey="key"
                          value={manufacturerDropdown.filter((man) =>
                            field.value?.includes(man.key),
                          )}
                          onChange={(e) => {
                            field.onChange(e.value.map((man) => man.key));
                          }}
                          placeholder="Select Manufacturer"
                        />
                      )}
                    />

                    {errors.manufacturerIds && (
                      <div className="invalid-feedback">
                        {errors.manufacturerIds.message}
                      </div>
                    )}
                  </div>

                  {/* Ammunition */}
                  <div className="mb-3">
                    <label className="form-label">Ammunition</label>

                    <Controller
                      name="ammunitionIds"
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          className="venue-gun-multiselect form-control"
                          data={ammunitionDropdown}
                          textField="value"
                          dataItemKey="key"
                          value={ammunitionDropdown.filter((amu) =>
                            field.value?.includes(amu.key),
                          )}
                          onChange={(e) => {
                            field.onChange(e.value.map((amu) => amu.key));
                          }}
                          placeholder="Select Ammunitions"
                        />
                      )}
                    />

                    {errors.ammunitionIds && (
                      <div className="invalid-feedback">
                        {errors.ammunitionIds.message}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mb-3">
                    <label className="form-label">Details</label>

                    <textarea
                      rows={4}
                      className="form-control"
                      placeholder="Enter details"
                      {...register("details")}
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  {/* Category */}
                  <div className="mb-3">
                    <label className="form-label">
                      Category <span className="text-danger">*</span>
                    </label>

                    <Controller
                      name="categoryId"
                      control={control}
                      rules={{
                        required: "Category is required",
                      }}
                      render={({ field }) => (
                        <DropDownList
                          data={categoryDropdown}
                          textField="value"
                          dataItemKey="key"
                          value={
                            categoryDropdown.find(
                              (category) => category.key === field.value,
                            ) || null
                          }
                          onChange={(e) => {
                            field.onChange(e.value?.key ?? "");
                          }}
                          defaultItem={{
                            id: "",
                            description: "Select Category",
                          }}
                          className={errors.categoryId ? "k-invalid" : ""}
                        />
                      )}
                    />

                    {errors.categoryId && (
                      <div className="text-danger small mt-1">
                        {errors.categoryId.message}
                      </div>
                    )}
                  </div>

                  {/* Barrel Length */}
                  <div className="mb-3">
                    <label className="form-label">Barrel Length</label>

                    <input
                      type="text"
                      className={`form-control `}
                      placeholder="In Inch, e.g. 7.5"
                      {...register("barrelLength",{
                        valueAsNumber: true,
                      })}
                    />

                    {errors.barrelLength && (
                      <div className="invalid-feedback">
                        {errors.barrelLength.message}
                      </div>
                    )}
                  </div>

                  {/* Approval Status */}
                  <div className="mb-3">
                    <label className="form-label">
                      Approval Status <span className="text-danger">*</span>
                    </label>

                    <select
                      className="form-select"
                      defaultValue={1}
                      {...register("approvalStatus")}
                      disabled
                    >
                      <option value={1}>Approve</option>
                      <option value={2}>Reject</option>
                      <option value={3}>Pending</option>
                    </select>
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label className="form-label">
                      Image <span className="text-danger">*</span>
                    </label>

                    <input
                      type="file"
                      className={`form-control ${
                        errors.imageNames ? "is-invalid" : ""
                      }`}
                      {...register("imageNames")}
                    />

                    {errors.imageNames && (
                      <div className="invalid-feedback">
                        {errors.imageNames.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn main-btn border-btn"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn main-btn w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

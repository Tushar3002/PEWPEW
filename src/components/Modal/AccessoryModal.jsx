import { Controller, useForm } from "react-hook-form";
import {
  addAccessories,
  editAccessories,
  getAccessoriesListById,
} from "../../api/Accessory/accessories";
import { getGunDropDownAll } from "../../api/Gun/gunApi";
import { useEffect, useState } from "react";

import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { categoryDropDown } from "../../api/Gun/gunCategoryMaster";

export const AccessoryModal = ({ show, onClose, id, onSuccess }) => {
  const isEditable = Boolean(id);

  const [categoriesData, setCategoriesData] = useState([]);
  const [gunData, setGunData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      accessoryName: "",
      gunIds: [],
      description: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    if (!show) return;
    getCategoryDropDown();
    getGunDropDown();
    if (isEditable) {
      fetchDataById(id);
    } else {
      reset({
        accessoryName: "",
        gunIds: [],
        description: "",
        categoryId: "",
      });
    }
  }, [show, id, isEditable, reset]);

  const fetchDataById = async (id) => {
    try {
      const res = await getAccessoriesListById(id);
      console.log(" Id", res.data);

      reset({
        accessoryName: res.data.accessoryName,
        gunIds: res.data.guids,
        description: res.data.description,
        categoryId: res.data.categoryId,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCategoryDropDown = async () => {
    try {
      const res = await categoryDropDown(2);
      setCategoriesData(res.data);
      console.log("Category", res);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const getGunDropDown = async () => {
    try {
      const res = await getGunDropDownAll();
      setGunData(res.data);
      console.log("Guns", res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const onSubmit = async (data) => {
    try {
      const body = {
        accessoryName: data.accessoryName,
        gunIds: data.gunIds,
        description: data.description,
        categoryId: data.categoryId,
        id: isEditable && id ? id : null,
      };

      console.log("Badge body:", body);

      if (isEditable) {
        await editAccessories(id,body);
      } else {
        await addAccessories(body);
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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEditable ? "Edit Accessory" : "Add Accessory"}
            </h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              {/* Badge Name */}
              <div className="mb-3">
                <label className="form-label">
                  Accessory <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${errors.accessoryName ? "is-invalid" : ""}`}
                  {...register("accessoryName", {
                    required: "Accessory name is required.",
                  })}
                />

                {errors.accessoryName && (
                  <div className="invalid-feedback">
                    {errors.accessoryName.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>

                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <DropDownList
                      data={categoriesData}
                      textField="value"
                      dataItemKey="key"
                      value={
                        categoriesData.find((cat) => cat.key === field.value) ||
                        null
                      }
                      onChange={(e) => {
                        field.onChange(e.value?.key ?? "");
                      }}
                    //   defaultItem={{
                    //     key: "",
                    //     value: "Select Category",
                    //   }}
                    />
                  )}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Guns <span className="text-danger">*</span>
                </label>

                <Controller
                  name="gunIds"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      className="venue-gun-multiselect form-control"
                      data={gunData}
                      textField="gunName"
                      dataItemKey="gunId"
                      value={gunData.filter((gun) =>
                        field.value?.includes(gun.gunId),
                      )}
                      onChange={(e) => {
                        field.onChange(e.value.map((gun) => gun.gunId));
                      }}
                      placeholder="Select Guns"
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>

                <textarea
                  rows={4}
                  className={`form-control`}
                  {...register("description")}
                />
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
                {isSubmitting ? "Saving..." : isEditable ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import { Controller, useForm } from "react-hook-form";
import {
  addProhibitedWords,
  getProhibitedWordsById,
  updateProhibitedWords,
} from "../../api/ProhibitedWords/prohibitedwords";
import { useEffect, useState } from "react";
import {
  addAmmunition,
  getAmmunitionById,
  updateAmmunition,
} from "../../api/Ammunition/ammunition";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import { addGunCategory, categoryDropDown, editGunCategory, getGunCategoryById } from "../../api/Gun/gunCategoryMaster";
import { getManufacturerDropdownData } from "../../api/Manufacturer/manufacturer";

export const CategoryMasterModel = ({ show, id, onClose, onSuccess }) => {
  const isEditable = Boolean(id);

  const [categoriesData, setCategoriesData] = useState([]);
  const [manufacturerData, setManufacturerData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      categoryName: "",
      applicableFor: "",
      description: "",
      parentCategoryId: "",
    },
  });

  useEffect(() => {
    if (!show) return;
    getCategoryDropDown();

    if (isEditable) {
      fetchDataById(id);
    } else {
      reset({
        categoryName: "",
        applicableFor: "",
        description: "",
        parentCategoryId: "",
      });
    }
  }, [show, id, isEditable, reset]);

  const fetchDataById = async (id) => {
    try {
      const res = await getGunCategoryById(id);
      console.log(" Id", res.data);

      reset({
        categoryName: res.data.categoryName,
        applicableFor: res.data.applicableFor,
        description: res.data.description,
        parentCategoryId: res.data.parentCategoryId,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const getCategoryDropDown = async () => {
    try {
      const res = await categoryDropDown();
      setCategoriesData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  

  const onSubmit = async (data) => {
    try {
      const body = {
        categoryName: data.categoryName,
        applicableFor: data.applicableFor,
        description: data.description,
        parentCategoryId: data.parentCategoryId,
        // id: isEditable && id ? id : null,
      };

      console.log("Badge body:", body);

      if (isEditable) {
        await editGunCategory(id,body);
      } else {
        await addGunCategory(body);
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
              {isEditable ? "Edit Category" : "Add Category"}
            </h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              {/* Badge Name */}
              <div className="mb-3">
                <label className="form-label">
                  Categories <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("categoryName", {
                    required: "Category name is required.",
                  })}
                />

                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Categories</label>
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      className="venue-gun-multiselect form-control"
                      data={categoriesData}
                      textField="value"
                      dataItemKey="key"
                      value={categoriesData.filter((cat) =>
                        field.value?.includes(cat.key),
                      )}
                      onChange={(e) => {
                        field.onChange(e.value.map((cat) => cat.key));
                      }}
                      placeholder="Select Manufacturer"
                    />
                  )}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Manufacturer <span className="text-danger">*</span>
                </label>

                <Controller
                  name="manufacturerId"
                  control={control}
                  rules={{
                    required: "Manufacturer is required",
                  }}
                  render={({ field }) => (
                    <DropDownList
                      data={manufacturerData}
                      textField="value"
                      dataItemKey="key"
                      value={
                        manufacturerData.find(
                          (man) => man.key === field.value,
                        ) || null
                      }
                      onChange={(e) => {
                        field.onChange(e.value?.key ?? "");
                      }}
                      defaultItem={{
                        key: "",
                        value: "Select Category",
                      }}
                      className={errors.manufacturerId ? "k-invalid" : ""}
                    />
                  )}
                />

                {errors.manufacturerId && (
                  <div className="text-danger small mt-1">
                    {errors.manufacturerId.message}
                  </div>
                )}
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

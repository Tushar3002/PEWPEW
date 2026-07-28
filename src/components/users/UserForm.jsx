import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Calendar,
  CalendarCell,
} from "@progress/kendo-react-dateinputs";
import defaultProfilePic from "../../assets/images/user-img.png";
import { useForm, Controller } from "react-hook-form";
import { initialUserForm } from "../../constants/userForm";

function UserForm({
  genders = [],
  roles = [],
  countryCodeData = [],
  onSubmit,
  preview,
  defaultValues,
  handleImageChange,

  onRoleChange,
}) {
  const [imagePreview, setImagePreview] = useState(
    preview || defaultProfilePic,
  );
  const today = new Date();
today.setHours(0, 0, 0, 0);

const DisabledFutureCell = (props) => {
  const cellDate = new Date(props.value);
  cellDate.setHours(0, 0, 0, 0);

  return (
    <CalendarCell
      {...props}
      isDisabled={cellDate > today}
    />
  );
};

const BirthdayCalendar = (props) => {
  return (
    <Calendar
      {...props}
      cell={DisabledFutureCell}
    />
  );
};
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { ...initialUserForm },
  });

  const resolveCountryCodeValue = (value) => {
    if (!value || !countryCodeData.length) return "";

    const matchedCountry = countryCodeData.find(
      (country) =>
        String(country.countryId) === String(value) ||
        String(country.phoneInternationalCode) === String(value) ||
        String(country.countryCode) === String(value),
    );

    return matchedCountry ? matchedCountry.countryId : "";
  };

  useEffect(() => {
    const nextValues = {
      ...initialUserForm,
      ...defaultValues,
      countryCode: resolveCountryCodeValue(defaultValues?.countryCode),
    };

    reset(nextValues);

    if (defaultValues?.profileImage) {
      setImagePreview(defaultValues.profileImage);
    } else if (!preview) {
      setImagePreview(defaultProfilePic);
    }
  }, [defaultValues, preview, reset, countryCodeData]);

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setValue("profileImage", file);
    setImagePreview(URL.createObjectURL(file));

    if (handleImageChange) {
      handleImageChange(event);
    }
  };

  return (
    <div className="container-fluid">
      <div className="tabbar-section">
        <div className="row">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <i className="demo-icon icon-down-arrow"></i>
                </li>
                <li className="breadcrumb-item">
                  <a href="javascript:void(0);">
                    <h2>Add/Edit Users</h2>
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form className="mt-3 mt-xxl-4" onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="row">
                <div className="col-12">
                  <div className="field d-flex align-items-center gap-3">
                    <div
                      className="position-relative"
                      style={{
                        width: "100px",
                        height: "100px",
                        minWidth: "100px",
                      }}
                    >
                      <div className="rounded-circle overflow-hidden w-100 h-100">
                        <img
                          src={imagePreview || defaultProfilePic}
                          alt="Profile"
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      <label
                        htmlFor="profileImage"
                        className="edit-btn-small"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="demo-icon icon-edit-1 p-1 "></i>
                      </label>

                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleProfileImageChange}
                      />
                    </div>

                    <div>
                      <h5 className="mb-2">Profile Photo</h5>

                      <label
                        htmlFor="profileImage"
                        className="btn btn-outline-primary"
                        style={{ cursor: "pointer" }}
                      >
                        Upload Profile Photo
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <h3 className="fw-bold mt-4">Personal Information</h3>
                  <hr className="mb-2" />
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="firstName" className="fw-semibold">
                      First Name <span className="danger-color">*</span>
                    </label>
                    <input
                      id="firstName"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      {...register("firstName", {
                        setValueAs: (value) => value?.trim(),
                        required: "First Name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 32,
                          message: "Maximum 32 characters",
                        },
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.firstName?.message}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="lastName" className="fw-semibold">
                      Last Name <span className="danger-color">*</span>
                    </label>
                    <input
                      id="lastName"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      {...register("lastName", {
                        setValueAs: (value) => value?.trim(),
                        required: "Last Name is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 32,
                          message: "Maximum 32 characters",
                        },
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.lastName?.message}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="birthDay" className="fw-semibold">
                      Birthday
                    </label>
                    <Controller
                      name="birthDay"
                      control={control}
                      rules={{ required: "Birthday is required" }}
                      render={({ field }) => (
                        <DatePicker
                          value={field.value ? new Date(field.value) : null}
                          max={new Date()}
                          onChange={(e) => {
                            field.onChange(
                              e.value
                                ? e.value.toISOString().split("T")[0]
                                : "",
                            );
                          }}
                          className={`form-control ${errors.birthDay ? "is-invalid" : ""}`}
                        />
                      )}
                    />
                    {errors.birthDay && (
                      <div className="invalid-feedback d-block">
                        {errors.birthDay.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="gender" className="fw-semibold">
                      Gender
                    </label>
                    <select
                      id="gender"
                      className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                      {...register("gender", {
                        required: "Select One Gender",
                      })}
                    >
                      {genders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.description}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.gender?.message}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="userName" className="fw-semibold">
                      User Name <span className="danger-color">*</span>
                    </label>
                    <input
                      id="userName"
                      className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                      {...register("userName", {
                        required: "Username is required",
                        minLength: {
                          value: 2,
                          message: "Minimum 2 characters",
                        },
                        maxLength: {
                          value: 16,
                          message: "Maximum 16 characters",
                        },
                        pattern: {
                          value: /^[A-Za-z0-9]+$/,
                          message:
                            "Only letters and numbers are allowed. No spaces or special characters.",
                        },
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.userName?.message}
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <h3 className="fw-bold mt-4">Address Details</h3>
                  <hr className="mb-2" />
                </div>

                <div className="col-sm-6 col-xl-8 mt-3">
                  <div className="form-group">
                    <label htmlFor="address" className="fw-semibold">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={4}
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      {...register("address", {
                        setValueAs: (value) => value?.trim(),
                        required: "Address is required",
                        minLength: {
                          value: 16,
                          message: "Address is too Short",
                        },
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.address?.message}
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-2">
                  <h3 className="fw-bold mt-4">
                    Contact and Additional Details
                  </h3>
                  <hr className="mb-2" />
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label className="fw-semibold">
                      Contact Number <span className="danger-color">*</span>
                    </label>

                    <div className="d-flex align-items-center gap-2">
                      <Controller
                        name="countryCode"
                        control={control}
                        rules={{ required: "Country Code is required" }}
                        render={({ field }) => (
                          <select
                            className={`form-select ${errors.countryCode ? "is-invalid" : ""}`}
                            style={{
                              width: "90px",
                              minWidth: "90px",
                              maxWidth: "90px",
                            }}
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const selectedCountry = countryCodeData.find(
                                (country) =>
                                  String(country.countryId) === e.target.value,
                              );

                              if (!selectedCountry) {
                                field.onChange("");
                                setValue("countryCodeName", "");
                                return;
                              }

                              field.onChange(selectedCountry.countryId);
                              setValue(
                                "countryCodeName",
                                selectedCountry.countryCode ||
                                  selectedCountry.phoneInternationalCode,
                              );
                            }}
                          >
                            <option value="">+1</option>
                            {countryCodeData.map((country) => (
                              <option
                                key={country.countryId}
                                value={country.countryId}
                              >
                                {country.phoneInternationalCode}{" "}
                                {country.countryName}
                              </option>
                            ))}
                          </select>
                        )}
                      />

                      {/* {errors.countryCode && (
                        <div className="invalid-feedback d-block">{errors.countryCode.message}</div>
                      )} */}

                      <input
                        id="contactNumber"
                        className={`form-control ${errors.contactNumber ? "is-invalid" : ""}`}
                        {...register("contactNumber", {
                          required: "Contact Number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter 10 digits",
                          },
                        })}
                      />
                      <div className="invalid-feedback">
                        {errors.contactNumber?.message}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="email" className="fw-semibold">
                      Email <span className="danger-color">*</span>
                    </label>
                    <div className="field-icon">
                      <input
                        id="email"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        {...register("email", {
                          setValueAs: (value) => value?.trim(),
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid Email",
                          },
                        })}
                      />
                      <div className="invalid-feedback">
                        {errors.email?.message}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="role" className="fw-semibold">
                      Role
                    </label>
                    <select
                      id="role"
                      className={`form-select ${errors.role ? "is-invalid" : ""}`}
                      {...register("role", {
                        required: "Role is required",
                        onChange: (e) => {
                          onRoleChange(e.target.value);
                        },
                      })}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.key} value={role.key}>
                          {role.value}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.role?.message}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label className="fw-semibold d-block mb-2">
                      Able to communicate with{" "}
                      <span className="danger-color">*</span>
                    </label>

                    <Controller
                      name="commincateWith"
                      control={control}
                      defaultValue={[]}
                      rules={{
                        validate: (value) =>
                          (Array.isArray(value) ? value.length : 0) > 0 ||
                          "Select at least one communication type",
                      }}
                      render={({ field }) => {
                        const selectedValues = Array.isArray(field.value)
                          ? field.value
                          : [];

                        return (
                          <>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="endUsers"
                                value="1"
                                checked={selectedValues.includes("1")}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const nextValues = checked
                                    ? [...selectedValues, "1"]
                                    : selectedValues.filter(
                                        (value) => value !== "1",
                                      );

                                  field.onChange(nextValues);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="endUsers"
                              >
                                End User
                              </label>
                            </div>

                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="internalUsers"
                                value="2"
                                checked={selectedValues.includes("2")}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  const nextValues = checked
                                    ? [...selectedValues, "2"]
                                    : selectedValues.filter(
                                        (value) => value !== "2",
                                      );

                                  field.onChange(nextValues);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="internalUsers"
                              >
                                Internal User
                              </label>
                            </div>

                            {errors.commincateWith && (
                              <div className="text-danger mt-1">
                                {errors.commincateWith.message}
                              </div>
                            )}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="col-12 mt-3 mt-xxl-4">
                  <div className="d-flex flex-wrap justify-content-end gap-3">
                    <button type="button" className="btn main-btn border-btn">
                      Cancel
                    </button>
                    <button type="submit" className="btn main-btn w-auto">
                      Save
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;

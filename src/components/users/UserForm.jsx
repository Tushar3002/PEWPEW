import React from "react";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import defaultProfilePic from "../../assets/images/user-img.png";

function UserForm({
  form,

  genders,
  roles,
  countryCodeData,
  handleSubmit,
  preview,

  handleImageChange,
  handleChange,

  handleCountryChange,
  handleCommunicateChange,
}) {
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
            <form className="mt-3 mt-xxl-4" onSubmit={handleSubmit}>
              <fieldset className="row">
                <div className="col-12">
                  <div className="field d-flex align-items-center gap-3">
                    <div className="user-image-edit position-relative">
                      <img
                        src={preview || defaultProfilePic}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />

                      <label
                        htmlFor="profileImage"
                        className="edit-btn-small"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="demo-icon icon-edit-1"></i>
                      </label>

                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
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
                    <label htmlFor="first-name" className="fw-semibold">
                      First Name <span className="danger-color">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="last-name" className="fw-semibold">
                      Last Name <span className="danger-color">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="birthday" className="fw-semibold">
                      Birthday
                    </label>
                    <DatePicker
                      value={form.birthDay ? new Date(form.birthDay) : null}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          birthDay: e.value
                            ? e.value.toISOString().split("T")[0]
                            : "",
                        }))
                      }
                    />
                    -
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="gender" className="fw-semibold">
                      Gender
                    </label>

                    <select
                      id="gender"
                      name="gender"
                      className="form-select"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>

                      {genders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.description}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="userName" className="fw-semibold">
                      User Name <span className="danger-color">*</span>
                    </label>
                    <input
                      type="text"
                      name="userName"
                      className="form-control"
                      value={form.userName}
                      onChange={handleChange}
                      required
                    />
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
                      name="address"
                      className="form-control"
                      rows={4}
                      value={form.address}
                      onChange={handleChange}
                    />
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
                      <select
                        className="form-select"
                        style={{
                          width: "90px",
                          minWidth: "90px",
                          maxWidth: "90px",
                        }}
                        onChange={handleCountryChange}
                        defaultValue=""
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

                      <input
                        type="text"
                        className="form-control flex-grow-1"
                        name="contactNumber"
                        value={form.contactNumber}
                        onChange={handleChange}
                        maxLength={10}
                        placeholder="Enter Contact Number"
                      />
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
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                      <i className="demo-icon icon-eye-line"></i>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="role" className="fw-semibold">
                      Role
                    </label>
                    <select
                      name="role"
                      className="form-select"
                      onChange={handleChange}
                      value={form.role}
                    >
                      <option value="">Select Role</option>
                      {roles.map((r) => (
                        <option key={r.key} value={r.key}>
                          {r.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label className="fw-semibold d-block mb-2">
                      Able to communicate with{" "}
                      <span className="danger-color">*</span>
                    </label>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="endUsers"
                        value={"1"}
                        checked={form.commincateWith.includes("1")}
                        onChange={handleCommunicateChange}
                      />
                      <label className="form-check-label" htmlFor="endUsers">
                        End User
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="internalUsers"
                        value={"2"}
                        checked={form.commincateWith.includes("2")}
                        onChange={handleCommunicateChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="internalUsers"
                      >
                        Internal User
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3 mt-xxl-4">
                  <div className="d-flex flex-wrap justify-content-end gap-3">
                    <button className="btn main-btn border-btn">Cancel</button>
                    <button className="btn main-btn w-auto">Save</button>
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

import React, { useState } from "react";

function ManageUserAdd() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    countryCode: "",
    countryCodeName: "",
    gender: "",
    role: "",
    commincateWith: "",
    profileImage: "",
    birthDay: "",
    address: "",
    userName: "",
    // isProfileUpdate: true,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
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
                    <h2>Add Users</h2>
                  </a>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form className="mt-3 mt-xxl-4">
              <fieldset className="row">
                <div className="col-12">
                  <div className="field d-flex align-items-center gap-3">
                    <div className="user-image-edit">
                      <img src="images/user-img.png" className="img-fluid" />
                      <button className="edit-btn-small">
                        <i className="demo-icon icon-edit-1"></i>
                      </button>
                    </div>
                    <h3 className="mb-0">
                      <button className="text-btn fw-semibold text-start">
                        Upload a Profile Photo
                      </button>
                    </h3>
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
                    <input
                      type="date"
                      id="date"
                      name="birthday"
                      className="form-control"
                      value={form.birthDay}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-xl-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="gender" className="fw-semibold">
                      Gender
                    </label>
                    <select
                      className="form-select"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
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
                <div className="col-sm-8 col-xl-8 mt-3">
                  <div className="form-group">
                    <label htmlFor="address" className="fw-semibold">
                      Address
                    </label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows={4}
                      value={form.description}
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
                    <label htmlFor="contact-no" className="fw-semibold">
                      Contact Number <span className="danger-color">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact-no"
                      className="form-control"
                      id="contactNo"
                      maxLength={10}
                    />
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
                    <select className="form-select">
                      <option>----</option>
                      <option>Select</option>
                      <option>Admin</option>
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
                        name="endUsers"
                        checked={form.endUsers}
                        onChange={handleChange}
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
                        name="internalUsers"
                        checked={form.internalUsers}
                        onChange={handleChange}
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

export default ManageUserAdd;

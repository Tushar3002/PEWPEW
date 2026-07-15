import React, { useEffect, useState } from "react";

import profileImage from "../../../assets/images/user-img.png";
import badge1 from "../../../assets/images/badge-1.svg";
import badge2 from "../../../assets/images/badge-2.svg";
import badge3 from "../../../assets/images/badge-3.svg";
import badge4 from "../../../assets/images/badge-4.svg";
import { getEndUserById } from "../../../api/EndUsers/endUserViewApi";
import { useParams } from "react-router-dom";
import UploadGunsTable from "./UploadGunsTable";

function ManageEndUserView() {
  const [endUser, setEndUser] = useState({});
  const { id } = useParams();

  const formatDisplayValue = (value) => {
    if (!value) return "";

    if (Array.isArray(value)) {
      return value
        .map((item) =>
          typeof item === "string"
            ? item
            : item?.name || item?.title || item?.value || "",
        )
        .filter(Boolean)
        .join(", ");
    }

    return value;
  };

  const formatDateValue = (value) => {
    if (!value) return "";
    return typeof value === "string" ? value.split("T")[0] : value;
  };

  const fetchEndUser = async (userId) => {
    try {
      const res = await getEndUserById(userId);
      setEndUser(res.data || {});
    } catch (error) {
      console.log(error?.response);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEndUser(id);
    }
  }, [id]);

  // const fullName =
  //   endUser?.fullName ||
  //   `${endUser?.firstName || ""} ${endUser?.lastName || ""}`.trim();
  const profileImageSrc =
    endUser?.profileImageUrl || endUser?.profileImage || profileImage;

  return (
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
                  <h2>View End Users</h2>
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 col-lg-4 mt-3 mt-xxl-4">
          <div className="border-contents">
            <div className="row align-items-end gap-1">
              <div className="col">
                <div className="user-image-edit small-profile">
                  <img src={profileImageSrc} className="img-fluid" alt="User" />
                </div>
                <p className="fw-semibold dark-color mt-2 mb-0 d-flex align-items-center gap-1 text-nowrap">
                  {endUser?.userName || "N/A"}
                  {endUser?.isVerify ? (
                    <i className="demo-icon icon-verified"></i>
                  ) : null}
                </p>
                <p className="fw-medium mb-0 text-nowrap">
                  Check-Ins {endUser?.checkIns ?? 0}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className="separater-list ps-0 d-flex flex-wrap mt-3">
                  <li>
                    <p className="dark-color fw-semibold large mb-0">
                      {endUser?.postsCount ?? 0}
                    </p>
                    <p className="mb-0">Post</p>
                  </li>
                  <li>
                    <p className="dark-color fw-semibold large mb-0">
                      {endUser?.followersCount ?? 0}
                    </p>
                    <p className="mb-0">Followers</p>
                  </li>
                  <li>
                    <p className="dark-color fw-semibold large mb-0">
                      {endUser?.followingCount ?? 0}
                    </p>
                    <p className="mb-0">Following</p>
                  </li>
                </ul>
                <p className="mt-3">
                  <span className="dark-color fw-semibold">Home Ranges:</span>{" "}
                  {formatDisplayValue(endUser?.userHomeRanges) || "N/A"}
                </p>
                <p className="mt-3">
                  <span className="dark-color fw-semibold">Favorite Pew:</span>{" "}
                  {formatDisplayValue(endUser?.favouritePew) || "N/A"}
                </p>
                <p className="mt-3">
                  <span className="dark-color fw-semibold">
                    About/Description:
                  </span>
                  <br /> {endUser?.bio || "No description available"}
                </p>
              </div>
              <div className="col-12">
                <ul className="d-flex justify-content-between align-items-center">
                  <li>
                    <p className="large dark-color fw-semibold">
                      Badges Earned
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-8 mt-3 mt-xxl-4">
          <form action="#">
            <fieldset className="row">
              <div className="col-12">
                <h3 className="fw-bold">User Details</h3>
                <hr className="mb-2" />
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label htmlFor="first-name" className="fw-semibold">
                    First Name <span className="danger-color">*</span>
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    className="form-control"
                    value={endUser?.firstName || ""}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label htmlFor="last-name" className="fw-semibold">
                    Last Name <span className="danger-color">*</span>
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    className="form-control"
                    value={endUser?.lastName || ""}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label htmlFor="birthday" className="fw-semibold" disabled>
                    Birthday
                  </label>
                  <input
                    type="text"
                    id="date"
                    className="form-control"
                    value={formatDateValue(endUser?.birthDate || "")}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label htmlFor="gender" className="fw-semibold">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    value={endUser?.gender || ""}
                    readOnly
                    disabled
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label htmlFor="email" className="fw-semibold">
                    Email <span className="danger-color">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={endUser?.email || ""}
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label htmlFor="contact-no" className="fw-semibold">
                    Contact Number <span className="danger-color">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact-no"
                    className="form-control"
                    value={
                      endUser?.contectNumber || endUser?.contactNumber || ""
                    }
                    readOnly
                    disabled
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div className="tabbar-section mt-4 mt-xxl-5">
        <div className="row">
          <div className="col-12">
            {/* <!-- Tab Nav (desktop only) --> */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-one-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-one-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="nav-one-tab-pane"
                  aria-selected="true"
                >
                  Upload Gun
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-two-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-two-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="nav-two-tab-pane"
                  aria-selected="false"
                >
                  Venues
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="nav-three-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-three-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="nav-three-tab-pane"
                  aria-selected="true"
                >
                  Events
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="nav-four-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-four-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="nav-four-tab-pane"
                  aria-selected="false"
                >
                  Activities
                </button>
              </li>
            </ul>
            {/* <!-- Shared Content: Tab + Accordion --> */}
            <div className="tab-content accordion" id="myTabContent">
              <div
                className="tab-pane fade accordion-item"
                id="nav-one-tab-pane"
                // role="tabpanel"
                // aria-labelledby="nav-one-tab"
                // tabindex="0"
              >
                <h2 className="accordion-header d-lg-none" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Upload Gun
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show d-lg-block"
                  aria-labelledby="headingOne"
                  data-bs-parent="#myTabContent"
                >
                  <UploadGunsTable userId={id} />
                  {/* <thead className="table-dark">
                    <tr>
                      <th>Action</th>
                      <th>Host Name</th>
                      <th>Event Name</th>
                      <th>Date & Time</th>
                      <th>Address</th>
                    </tr>
                  </thead> */}
                </div>
              </div>
              <div
                className="tab-pane fade accordion-item"
                id="nav-two-tab-pane"
                // role="tabpanel"
                // aria-labelledby="nav-two-tab"
                // tabindex="0"
              >
                <h2 className="accordion-header d-lg-none" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Venues
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse d-lg-block"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#myTabContent"
                ></div>
              </div>
              <div
                className="tab-pane fade show active accordion-item"
                id="nav-three-tab-pane"
                // role="tabpanel"
                // aria-labelledby="nav-three-tab"
                // tabindex="0"
              >
                <h2 className="accordion-header d-lg-none" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Events
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse d-lg-block"
                  aria-labelledby="headingThree"
                  data-bs-parent="#myTabContent"
                ></div>
              </div>
              <div
                className="tab-pane fade accordion-item"
                id="nav-four-tab-pane"
                // role="tabpanel"
                // aria-labelledby="nav-four-tab"
                // tabindex="0"
              >
                <h2 className="accordion-header d-lg-none" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Activities
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse d-lg-block"
                  aria-labelledby="headingFour"
                  data-bs-parent="#myTabContent"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEndUserView;

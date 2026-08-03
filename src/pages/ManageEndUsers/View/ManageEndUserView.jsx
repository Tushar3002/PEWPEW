import React, { useEffect, useState } from "react";

import profileImage from "../../../assets/images/profile-img.png";
// import badge1 from "../../../assets/images/badge-1.svg";
// import badge2 from "../../../assets/images/badge-2.svg";
// import badge3 from "../../../assets/images/badge-3.svg";
// import badge4 from "../../../assets/images/badge-4.svg";
import { getEndUserById } from "../../../api/EndUsers/endUserViewApi";
import { useParams } from "react-router-dom";
import UploadGunsTable from "./UploadGunsTable";
import VenuesTable from "./VenuesTable";
import EventsTable from "./EventsTable";
import ActivitiesTables from "./ActivitiesTables";
import Breadcrumbs from "../../../components/BreadCrumbs/Breadcrumbs";

function ManageEndUserView() {
  const [endUser, setEndUser] = useState({});
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("upload");
  const tabs = [
    { id: "upload", label: "Upload Gun" },
    { id: "venues", label: "Venues" },
    { id: "events", label: "Events" },
    { id: "activities", label: "Activities" },
  ];

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
          <Breadcrumbs
            items={[
              {
                id: "manage-end-users",
                text: "Manage End Users",
                path: "/manage-end-users",
              },
              {
                id: "view-end-user",
                text: "View End User",
              },
            ]}
          />
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
              <div className="col-sm-6 mt-3">
                <div className="form-group">
                  <label className="fw-semibold">Upload Documents</label>

                  <div className="form-control d-flex flex-column gap-1">
                    {endUser?.userDocument?.length > 0 ? (
                      endUser.userDocument.map((document, index) => (
                        <a
                          key={index}
                          href={document}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Document {index + 1}
                        </a>
                      ))
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="form-group">
                  <label className="fw-semibold d-block mb-2">
                    Setting <span className="danger-color">*</span>
                  </label>

                  <div className="d-flex align-items-center gap-2">
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={Boolean(endUser?.isVerify)}
                        readOnly
                      />
                    </div>

                    <span>Follower request confirmation</span>
                  </div>
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
            <ul className="nav nav-tabs">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            {/* <!-- Shared Content: Tab + Accordion --> */}
            <div className="tab-content mt-4">
              {activeTab === "upload" && (
                <div className="tab-pane fade show active">
                  <UploadGunsTable userId={id} />
                </div>
              )}

              {activeTab === "venues" && (
                <div className="tab-pane fade show active">
                  <VenuesTable userId={id} />
                </div>
              )}

              {activeTab === "events" && (
                <div className="tab-pane fade show active">
                  <EventsTable userId={id} />
                </div>
              )}

              {activeTab === "activities" && (
                <div className="tab-pane fade show active">
                  <ActivitiesTables userId={id} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEndUserView;

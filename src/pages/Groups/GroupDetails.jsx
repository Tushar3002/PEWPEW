import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroupDataById } from "../../api/Group/group";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";

function GroupDetails() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchGroupDetailsById();
  }, []);
  const fetchGroupDetailsById = async () => {
    try {
      const res = await getGroupDataById(id);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="tabbar-section">
      <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Breadcrumbs
            items={[
              {
                id: "groups",
                text: "Groups",
                path: "/groups",
              },
              {
                id: "group-details",
                text: "Group Details",
              },
            ]}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 ">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src={data.groupImageFullPath}
              alt={data.groupName || "Group"}
              className="rounded-circle mb-3"
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
              }}
            />

            <h2 className="fw-bold mb-2">{data.groupName}</h2>

            <div className="d-flex align-items-center gap-2 text-muted">
              <Link to="members">
                <span>{data.memberCount || 0} Members</span>

                <span>•</span>

                <span>{data.isPublic ? "Public" : "Private"}</span>
              </Link>
            </div>
          </div>

          <h5 className="fw-bold mb-3">About this Group</h5>

          <h5 className="fw-bold mb-3 ">Details</h5>

          <div className="d-flex align-items-center py-3 border-bottom border-top">
            <span className="text-muted" style={{ width: "150px" }}>
              Members
            </span>

            {data.memberCount > 0 ? (
              <Link to="members" className="fw-semibold">
                {data.memberCount}
              </Link>
            ) : (
              <span className="fw-semibold">{data.memberCount}</span>
            )}
          </div>

          <div className="d-flex align-items-center py-3 border-bottom">
            <span className="text-muted" style={{ width: "150px" }}>
              Reports
            </span>

            {data.totalReports > 0 ? (
              <Link to="members" className="fw-semibold">
                {data.totalReports}
              </Link>
            ) : (
              <span className="fw-semibold">{data.totalReports}</span>
            )}
          </div>

          <div className="d-flex align-items-center py-3">
            <span className="text-muted" style={{ width: "150px" }}>
              Activities
            </span>

            {data.totalActivity > 0 ? (
              <Link to={`/groups/activity/${id}`} className="fw-semibold">
                {data.totalActivity}
              </Link>
            ) : (
              <span className="fw-semibold">{data.totalActivity}</span>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default GroupDetails;

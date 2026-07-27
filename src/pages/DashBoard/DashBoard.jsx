import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import StatsCard from "../../components/StatsCard";

import usersIcon from "../../assets/images/icons/users.svg";
import locationIcon from "../../assets/images/icons/location.svg";
import gunIcon from "../../assets/images/icons/gun.svg";
import bulletsIcon from "../../assets/images/icons/bullets.svg";
import TableCard from "../../components/TableComponent";
import { getDashBoardData } from "../../api/DashBoard/dashboardApi";
import { getCommonDashBoardFilters } from "../../api/Common/commonApi";
import { useAuth } from "../../context/AuthContext";
import { Grid, GridCell, GridColumn } from "@progress/kendo-react-grid";
import { DateCell } from "../../components/GridCells/DateCell";
import StatusCell from "../../components/GridCells/StatusCell";
import { updateActivitiesStatus } from "../../api/EndUsers/endUserViewApi";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const [data, setData] = useState({});
  const [filterDropDown, setFilterDropDown] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const total = data?.totals || {};
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    fetchDashboardData(selectedFilter);
    fetchDashboardFilters();
  }, [selectedFilter]);

  const fetchDashboardData = async (filterId = 0) => {
    try {
      const res = await getDashBoardData(filterId);
      console.log("Dashboard Data", res);
      // console.log("User Data",user);

      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDashboardFilters = async () => {
    try {
      const res = await getCommonDashBoardFilters(selectedFilter);
      console.log(res.data);
      setFilterDropDown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFilterChange = (e) => {
    const filterId = Number(e.target.value);

    setSelectedFilter(filterId);
  };

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    const isSuccess = await updateActivitiesStatus(id, nextValue);
    await fetchDashboardData(selectedFilter);
    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  const ActionCell = (props) => {
    return (
      <td className="text-center align-middle p-1">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() => navigate(`/activity/view/${props.dataItem.postId}`)}
          >
            <i className="fa fa-eye"></i>
          </button>

          <StatusCell
            {...props}
            idField="postId"
            onToggle={handleStatusToggle}
          />
        </div>
      </td>
    );
  };

  return (
    <>
      <div className="page-heading">
        <div className="row align-items-center gap-3 mb-3 mb-xxl-4">
          <div className="col-12 col-md">
            <h2 className="page-title">
              Welcome to Dashboard, {user?.firstName} {user?.lastName}!
            </h2>
          </div>

          <div className="col-12 col-md-auto">
            <select
              className="form-select w-100"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              {filterDropDown.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="cards-section">
        <div className="row g-3 g-xxl-4">
          <StatsCard
            value={total.totalUsers}
            title="Total No. of Users"
            icon={usersIcon}
          />

          <StatsCard
            value={total.totalVenues}
            title="Total No. of Venues"
            icon={locationIcon}
          />

          <StatsCard
            value={total.totalGuns}
            title="Total No. of Guns"
            icon={gunIcon}
          />

          <StatsCard
            value={total.totalAmmunitions}
            title="Total No. of Ammunitions"
            icon={bulletsIcon}
          />
        </div>
      </div>

      <div className="card-section">
        <div className="row">
          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Liked Posts</h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
              <Grid data={data?.topLikedPosts}>
                <GridColumn
                  title="Action"
                  cells={{ data: ActionCell }}
                  width={"180px"}
                />
                <GridColumn title="Username" field="userName" width={"280px"} />
                <GridColumn
                  title="Uploaded Date"
                  field="createdOn"
                  cells={{ data: DateCell }}
                />
                <GridColumn title="Likes" field="totalLike" />
              </Grid>
            </div>
          </div>

          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Reported Users</h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
              <Grid data={data?.topReportingUsers}>
                <GridColumn title="Action" cells={{ data: ActionCell }} />
                <GridColumn title="Username" field="userName" />
                <GridColumn title="Reports" field="totalCount" />
              </Grid>
            </div>
          </div>
          <div className="col-xl-12 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Reported Posts</h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
              <Grid data={data?.topReportedPosts}>
                <GridColumn title="Action" cells={{ data: ActionCell }} />
                <GridColumn title="Posted By" field="userName" />
                <GridColumn title="Total Reports" field="totalCount" />
                <GridColumn
                  title="Uploaded Date"
                  field="createdOn"
                  cells={{ data: DateCell }}
                />
                <GridColumn title="Likes" field="totalLike" />
                <GridColumn title="Comments" field="totalComment" />
                <GridColumn title="Shares" field="totalShare" />
              </Grid>
            </div>

            {/* <div className="row mt-3">
              <div className="col-12"></div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

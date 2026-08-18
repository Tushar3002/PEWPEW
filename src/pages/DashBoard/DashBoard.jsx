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
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DateCell } from "../../components/GridCells/DateCell";
import StatusCell from "../../components/GridCells/StatusCell";
import { updateActivitiesStatus } from "../../api/EndUsers/endUserViewApi";
import { Link, useNavigate } from "react-router-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
const topLikedPostsColumns = [
  { field: "action", minWidth: 120 },
  { field: "userName", minWidth: 180 },
  { field: "createdOn", minWidth: 140 },
  { field: "totalLike", minWidth: 100 },
];

const topReportingUsersColumns = [
  { field: "action", minWidth: 120 },
  { field: "userName", minWidth: 180 },
  { field: "totalCount", minWidth: 120 },
];

const topReportedPostsColumns = [
  { field: "action", minWidth: 120 },
  { field: "userName", minWidth: 180 },
  { field: "totalCount", minWidth: 120 },
  { field: "createdOn", minWidth: 140 },
  { field: "totalLike", minWidth: 100 },
  { field: "totalComment", minWidth: 110 },
  { field: "totalShare", minWidth: 100 },
];

function DashBoard() {
  const [data, setData] = useState({});
  const [filterDropDown, setFilterDropDown] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [customFrom, setCustomFrom] = useState(new Date(today));
  const [customTo, setCustomTo] = useState(new Date(today));
  const total = data?.totals || {};
  const navigate = useNavigate();
  const { user } = useAuth();

  const topLikedGrid = useResponsiveGridWidths(topLikedPostsColumns);
  const topReportedUserGrid = useResponsiveGridWidths(topReportingUsersColumns);
  const topReportedPostGrid = useResponsiveGridWidths(topReportedPostsColumns);

  const formatDateForApi = (date) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (selectedFilter === 9) {
      if (customFrom && customTo) {
        fetchDashboardData(
          9,
          formatDateForApi(customFrom),
          formatDateForApi(customTo),
        );
      }
      fetchDashboardFilters(9);
      return;
    }

    fetchDashboardData(selectedFilter);
    fetchDashboardFilters(selectedFilter);
  }, [selectedFilter, customFrom, customTo]);

  const fetchDashboardData = async (
    filterId = 0,
    customFromDate = "",
    customToDate = "",
  ) => {
    try {
      const res = await getDashBoardData(
        filterId,
        customFromDate,
        customToDate,
      );
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDashboardFilters = async (filterId = 0) => {
    try {
      const res = await getCommonDashBoardFilters(filterId);
      setFilterDropDown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFilterChange = (e) => {
    const filterId = Number(e.target.value);

    setSelectedFilter(filterId);

    if (filterId === 9) {
      const defaultDate = new Date();
      defaultDate.setHours(0, 0, 0, 0);
      setCustomFrom(new Date(defaultDate));
      setCustomTo(new Date(defaultDate));
      return;
    }

    setCustomFrom(null);
    setCustomTo(null);
  };

  const handleCustomDateChange = (value, field) => {
    if (field === "from") {
      setCustomFrom(value);
      return;
    }

    setCustomTo(value);
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
      <div className="tabbar-section">
        <div className="row align-items-center gap-3 mb-3 mb-xxl-4">
          

          <div className="col-12 col-md">
            <h2 className="page-title">
              Welcome to Dashboard, {user?.firstName} {user?.lastName}!
            </h2>
          </div>

          <div className="col-12 col-md-auto">
            <DropDownList
              size="large"
              data={filterDropDown}
              textField="description"
              dataItemKey="id"
              value={
                filterDropDown.find((item) => item.id === selectedFilter) ||
                null
              }
              onChange={(e) =>
                handleFilterChange({
                  target: { value: e.value?.id ?? "" },
                })
              }
              style={{ width: "250px" }}
            />
          </div>
        </div>

        {selectedFilter === 9 && (
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <h6 className="fw-bold mb-0 fs-5">Select Date Range : </h6>

            <label className="form-label mb-0 ms-3 fs-6">From Date:</label>
            <div style={{ width: "200px" }}>
              <DatePicker
                className="form-control"
                value={customFrom}
                onChange={(e) => handleCustomDateChange(e.value, "from")}
                format="yyyy-MM-dd"
                max={new Date(today)}
                placeholder={formatDateForApi(new Date(today))}
              />
            </div>

            <label className="form-label mb-0 fs-6">To Date:</label>
            <div style={{ width: "200px" }}>
              <DatePicker
                className="form-control"
                value={customTo}
                onChange={(e) => handleCustomDateChange(e.value, "to")}
                format="yyyy-MM-dd"
                min={customFrom || undefined}
                max={new Date(today)}
                placeholder={formatDateForApi(new Date(today))}
              />
            </div>
          </div>
        )}
      </div>

      <div className="cards-section mt-3">
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
        <div className="row gx-4">
          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Liked Posts</h3>
              </div>

              <div className="col-auto">
                <Link
                  to="/activity"
                  state={{
                    sort: [
                      {
                        field: "totalLike",
                        dir: "desc",
                      },
                    ],
                  }}
                  className="basic-links"
                >
                  View All
                </Link>
              </div>
              <div ref={topLikedGrid.gridRef} className="mt-3">
                <Grid data={data?.topLikedPosts}>
                  <GridColumn
                    title="Action"
                    cells={{ data: ActionCell }}
                    width={topLikedGrid.getWidth("action")}
                  />
                  <GridColumn
                    title="Username"
                    field="userName"
                    width={topLikedGrid.getWidth("userName")}
                  />
                  <GridColumn
                    title="Uploaded Date"
                    field="createdOn"
                    cells={{ data: DateCell }}
                    width={topLikedGrid.getWidth("createdOn")}
                  />
                  <GridColumn
                    title="Likes"
                    field="totalLike"
                    width={topLikedGrid.getWidth("totalLike")}
                  />
                </Grid>
              </div>
            </div>
          </div>

          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Reported Users</h3>
              </div>

              <div className="col-auto">
                <Link
                  to="/reported-users"
                  state={{
                    sort: [
                      {
                        field: "reportCount",
                        dir: "desc",
                      },
                    ],
                  }}
                  className="basic-links"
                >
                  View All
                </Link>
              </div>
              <div ref={topReportedUserGrid.gridRef} className="mt-3">
                <Grid data={data?.topReportingUsers}>
                  <GridColumn
                    title="Action"
                    cells={{ data: ActionCell }}
                    width={topReportedUserGrid.getWidth("action")}
                  />
                  <GridColumn
                    title="Username"
                    field="userName"
                    width={topReportedUserGrid.getWidth("userName")}
                  />
                  <GridColumn
                    title="Reports"
                    field="totalCount"
                    width={topReportedUserGrid.getWidth("totalCount")}
                  />
                </Grid>
              </div>
            </div>
          </div>
          <div className="col-xl-12 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Reported Posts</h3>
              </div>

              <div className="col-auto">
                <Link
                  to="/activity"
                  state={{
                    sort: [
                      {
                        field: "totalReport",
                        dir: "desc",
                      },
                    ],
                  }}
                  className="basic-links"
                >
                  View All
                </Link>
              </div>
              <div ref={topReportedPostGrid.gridRef} className="mt-3">
                <Grid data={data?.topReportedPosts}>
                  <GridColumn
                    title="Action"
                    cells={{ data: ActionCell }}
                    width={topReportedPostGrid.getWidth("action")}
                  />
                  <GridColumn
                    title="Posted By"
                    field="userName"
                    width={topReportedPostGrid.getWidth("userName")}
                  />
                  <GridColumn
                    title="Total Reports"
                    field="totalCount"
                    width={topReportedPostGrid.getWidth("totalCount")}
                  />
                  <GridColumn
                    title="Uploaded Date"
                    field="createdOn"
                    cells={{ data: DateCell }}
                    width={topReportedPostGrid.getWidth("createdOn")}
                  />
                  <GridColumn
                    title="Likes"
                    field="totalLike"
                    width={topReportedPostGrid.getWidth("totalLike")}
                  />
                  <GridColumn
                    title="Comments"
                    field="totalComment"
                    width={topReportedPostGrid.getWidth("totalComment")}
                  />
                  <GridColumn
                    title="Shares"
                    field="totalShare"
                    width={topReportedPostGrid.getWidth("totalShare")}
                  />
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

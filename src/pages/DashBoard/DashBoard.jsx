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

function DashBoard() {
  const [data, setData] = useState({});
  const [filterDropDown, setFilterDropDown] = useState([]);
  const [filter,setFilter]=useState('')
  const total = data?.totals || {};
  useEffect(() => {
    fetchDashboardData();
    fetchDashboardFilters();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await getDashBoardData();
      console.log("Dashboard Data", res);
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchDashboardFilters = async () => {
    try {
      const res = await getCommonDashBoardFilters(filter);
      console.log(res.data);
      setFilterDropDown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="page-heading">
        <div className="row align-items-center gap-3 mb-3 mb-xxl-4">
          <div className="col-12 col-md">
            <h2 className="page-title">Welcome to Dashboard, John!</h2>
          </div>

          <div className="col-12 col-md-auto">
            <select className="form-select w-100">
              {filterDropDown.map((data)=>(
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
            </div>
          </div>
          <div className="col-xl-12 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">
                  Recently Prohibited Words Used by Users
                </h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

import React, { useEffect, useState } from "react";
import { getCommonDashBoardFilters } from "../../api/Common/commonApi";
import { getLeadByGuns, getLeadByVenues } from "../../api/Discover/discover";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import StatusCell from "../../components/GridCells/StatusCell";
import { useNavigate } from "react-router-dom";
import { TextCell } from "../../components/GridCells/TextCell";

const leaderboardOptions = [
  { value: 5, type: "gun", label: "Top 5 Gun Reviewers/Check-Ins" },
  { value: 20, type: "gun", label: "Top 20 Gun Reviewers/Check-Ins" },
  { value: 50, type: "gun", label: "Top 50 Gun Reviewers/Check-Ins" },
  { value: 100, type: "gun", label: "Top 100 Gun Reviewers/Check-Ins" },

  { value: 5, type: "venue", label: "Top 5 Venue Reviewers/Check-Ins" },
  { value: 20, type: "venue", label: "Top 20 Venue Reviewers/Check-Ins" },
  { value: 50, type: "venue", label: "Top 50 Venue Reviewers/Check-Ins" },
  { value: 100, type: "venue", label: "Top 100 Venue Reviewers/Check-Ins" },
];

function LeaderBoard() {
  const [data, setData] = useState({});
  const [filterDropDown, setFilterDropDown] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [leaderboardType, setLeaderboardType] = useState("gun");
  const [topData, setTopData] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardFilters();
  }, []);

  useEffect(() => {
    if (selectedFilter === 9) return;
    console.log("Top data", topData);

    getLeaderboardData(selectedFilter, topData, leaderboardType);
  }, [selectedFilter, topData, leaderboardType]);

  const fetchDashboardFilters = async () => {
    try {
      const res = await getCommonDashBoardFilters();
      setFilterDropDown(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getLeaderboardData = async (request, takRanking, type) => {
    try {
      const res =
        type === "gun"
          ? await getLeadByGuns(request, takRanking)
          : await getLeadByVenues(request, takRanking);

      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFilterChange = (e) => {
    const filterId = Number(e.target.value);

    setSelectedFilter(filterId);
  };

  const handleLeaderboardChange = (e) => {
    const selected = leaderboardOptions[e.target.selectedIndex];

    setLeaderboardType(selected.type);
    setTopData(selected.value);
  };

  const ActionCell = (props) => {
    return (
      <td className="text-center align-middle p-1">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() =>
              navigate(`/manage-end-users/view/${props.dataItem.userId}`)
            }
          >
            <i className="fa fa-eye"></i>
          </button>
        </div>
      </td>
    );
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "leaderboard",
              text: "LeaderBoard",
            },
          ]}
        />
        <div className="col-12 col-lg-auto">
          <div className="d-flex gap-2">
            <select
              className="form-select"
              value={selectedFilter}
              onChange={handleFilterChange}
            >
              {filterDropDown
                .filter((item) => item.id !== 9)
                .map((data) => (
                  <option key={data.id} value={data.id}>
                    {data.description}
                  </option>
                ))}
            </select>

            <select className="form-select" onChange={handleLeaderboardChange}>
              {leaderboardOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row w-100">
          <div className="col-12 mt-3 mt-xxl-4 w-100 ">
            <div
              className="table-responsive w-100"
              style={{ overflow: "visible" }}
            >
              <Tooltip
                anchorElement="target"
                position="top"
                openDelay={100}
                className="grid-tooltip"
              >
                <Grid
                  style={{ width: "100%", overflow: "visible" }}
                  data={data}
                >
                  <GridColumn title="Actions" cells={{ data: ActionCell }} />
                  <GridColumn title="Rank" field="rank" />
                  <GridColumn title="Username" field="userName" cells={{data:TextCell}}/>
                  <GridColumn title="Followers" field="totalMember" cells={{data:TextCell}}/>
                  <GridColumn title="Gun Check-Ins" field="totalCheckins" />
                </Grid>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;

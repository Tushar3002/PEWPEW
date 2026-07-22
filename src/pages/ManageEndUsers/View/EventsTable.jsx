import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import { eventListByUser } from "../../../api/EndUsers/endUserViewApi";
import "../css/EventsTable.css";
import { DetailsCell } from "../../../components/GridCells/DetailsCell";
import { TextCell } from "../../../components/GridCells/TextCell";
import { useNavigate } from "react-router-dom";

const eventTabs = [
  {
    key: "upcoming",
    label: "Upcoming Events",
    isUpcomingEvent: true,
    statusId: null,
  },
  {
    key: "passed",
    label: "Passed Events",
    isUpcomingEvent: false,
    statusId: null,
  },
  {
    key: "requests",
    label: "Events Requests",
    isUpcomingEvent: null,
    statusId: 3,
  },
];

function EventsTable({ userId }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const selectedTab = eventTabs.find((tab) => tab.key === activeTab);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) return;
    fetchEvent();
  }, [page, activeTab]);

  const fetchEvent = async () => {
    console.log("UserID", userId);

    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      search: "",
      isUpcomingEvent: selectedTab.isUpcomingEvent,
      statusId: selectedTab.statusId,
      userId,
    };
    try {
      const res = await eventListByUser(body);
      setData(res.data.data);

      setTotal(res.data.totalRecord);
      console.log("Event Data", res.data.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);

    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
  };

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() => navigate(`/events/view/${props.dataItem.eventId}`)}
          >
            <i className="fa fa-eye"></i>
          </button>

          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => handleDelete(props.dataItem.venueId)}
          >
            <i className="icon-delete-1"></i>
          </button>
        </div>
      </td>
    );
  };

  const DateTimeCell = (props) => {
    const { dataItem, tdProps } = props;

    const eventDate = dataItem.eventDate
      ? new Date(`${dataItem.eventDate}Z`)
      : null;

    const startTime = dataItem.startTime
      ? new Date(`${dataItem.startTime}Z`)
      : null;

    const endTime = dataItem.endTime ? new Date(`${dataItem.endTime}Z`) : null;

    const formattedDate = eventDate?.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const formattedStartTime = startTime?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const formattedEndTime = endTime?.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <td {...tdProps}>
        <div>{formattedDate || "-"}</div>

        <div>
          {formattedStartTime || "-"} - {formattedEndTime || "-"}
        </div>

        <div>This Event has ended</div>
      </td>
    );
  };

  const StatusDropdownCell = (props) => {
    const value = props.dataItem?.[props.field] ?? "-";

    return (
      <td {...props.tdProps}>
        <select className="form-select" value={value} disabled>
          <option value={value}>{value}</option>
        </select>
      </td>
    );
  };

  return (
    <div className="tabbar-section">
      <ul className="nav inner-tab-custom mt-3 d-sm-inline-flex d-block">
        {eventTabs.map((tab) => (
          <li key={tab.key} className="nav-item" role="presentation">
            <button
              type="button"
              role="tab"
              className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div className="table-responsive" style={{ overflow: "visible" }}>
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
                data={data}
                pageable={{
                  buttonCount: 5,
                  pageSizes: [5, 10, 20],
                  info: true,
                  previousNext: true,
                }}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
              >
                <GridColumn
                  width={"100px"}
                  title="Action"
                  cells={{ data: ActionCell }}
                />
                <GridColumn title="Host Name/Venue Name" field="venueName" />
                <GridColumn title="Event Name" field="eventName" />
                <GridColumn
                  title="Date & Time"
                  width="250px"
                  cells={{
                    data: DateTimeCell,
                  }}
                />
                <GridColumn
                  width={"300px"}
                  title="Address"
                  field="address"
                  cells={{ data: DetailsCell }}
                />
                <GridColumn title="Created By" field="created" />
                <GridColumn
                  title="Status"
                  field="approvalStatusName"
                  cells={{ data: StatusDropdownCell }}
                />
              </Grid>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsTable;

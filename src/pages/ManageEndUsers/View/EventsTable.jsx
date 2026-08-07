import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import { eventListByUser } from "../../../api/EndUsers/endUserViewApi";
import "../css/EventsTable.css";
import { DetailsCell } from "../../../components/GridCells/DetailsCell";
import { TextCell } from "../../../components/GridCells/TextCell";
import { useNavigate } from "react-router-dom";
import DateTimeCell from "../../../components/GridCells/DateTimeCell";
import CustomPager from "../../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";

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

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "venueName", minWidth: 220 },
  { field: "eventName", minWidth: 220 },
  { field: "dateTime", minWidth: 220 },
  { field: "address", minWidth: 260 },
  { field: "created", minWidth: 140 },
  { field: "approvalStatusName", minWidth: 180 },
];

function EventsTable({ userId, venueId }) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const selectedTab = eventTabs.find((tab) => tab.key === activeTab);
  const navigate = useNavigate();

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);
  useEffect(() => {
    if (!userId && !venueId) return;

    fetchEvent();
  }, [page, activeTab, userId, venueId]);

  const fetchEvent = async () => {
    console.log("UserID", userId);

    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      search: "",
      isUpcomingEvent: selectedTab.isUpcomingEvent,
      statusId: selectedTab.statusId,

      ...(userId && { userId }),
      ...(venueId && { venueId }),
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
    console.log("Tab Keys ", tabkey);

    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
  };

  const ActionCell = (props) => {
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
          <div className="table-responsive" style={{ overflow: "visible" }} ref={gridRef}>
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
                data={data}
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
              >
                <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  cells={{ data: ActionCell }}
                />

                <GridColumn
                  title="Host Name/Venue Name"
                  field="venueName"
                  width={getWidth("venueName")}
                />

                <GridColumn
                  title="Event Name"
                  field="eventName"
                  width={getWidth("eventName")}
                />

                <GridColumn
                  title="Date & Time"
                  width={getWidth("dateTime")}
                  cells={{
                    data: (props) => (
                      <DateTimeCell
                        {...props}
                        showEndedMessage={activeTab === "passed"}
                      />
                    ),
                  }}
                />

                <GridColumn
                  title="Address"
                  field="address"
                  width={getWidth("address")}
                  cells={{ data: DetailsCell }}
                />

                <GridColumn
                  title="Created By"
                  field="created"
                  width={getWidth("created")}
                />

                <GridColumn
                  title="Status"
                  field="approvalStatusName"
                  width={getWidth("approvalStatusName")}
                  cells={{ data: StatusDropdownCell }}
                />
              </Grid>
              <CustomPager
                skip={page.skip}
                take={page.take}
                total={total}
                pageSizes={[5, 10, 20, 50, 100, 500]}
                buttonCount={4}
                previousNext
                firstLast
                info
                onPageChange={(e) => setPage(e.page)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsTable;

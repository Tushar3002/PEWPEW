import React, { useEffect, useState } from "react";
import "../ManageEndUsers/css/EventsTable.css";
import { deleteEvents, getAllEventList } from "../../api/Events/eventApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { DetailsCell } from "../../components/GridCells/DetailsCell";
import DateTimeCell from "../../components/GridCells/DateTimeCell";
import { useNavigate } from "react-router-dom";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const eventTabs = [
  {
    key: "upcoming",
    label: "Upcoming Events",
    isUpcomingEvents: true,
    isAdminRequest: "null",
  },
  {
    key: "passed",
    label: "Passed Events",
    isUpcomingEvents: false,
    isAdminRequest: "null",
  },
  {
    key: "requests",
    label: "Admin-added venues' Events requests",
    isUpcomingEvents: "null",
    isAdminRequest: true,
  },
];

function Events() {
  const [eventData, setEventData] = useState({});

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState([]);

  //   const { id } = useParams();
  const [activeTab, setActiveTab] = useState("upcoming");
  const selectedTab = eventTabs.find((tab) => tab.key === activeTab);

  const navigate = useNavigate();

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);

      setPage((prev) => ({
        ...prev,
        skip: 0,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    getEvents();
  }, [page, sort, search, activeTab]);

  const getEvents = async () => {
    const body = {
      Page: page.skip / page.take + 1,
      PageSize: page.take,
      Sorts: sort.map((s) => ({
        field: s.field,
        direction: s.dir === "asc" ? 0 : 1,
      })),
      CustomSearch: search,
    };
    console.log("Upcoming:", selectedTab.isUpcomingEvents);
    console.log("Admin:", selectedTab.isAdminRequest);
    try {
      const res = await getAllEventList(
        body,
        selectedTab.isUpcomingEvents,
        selectedTab.isAdminRequest,
      );
      console.log(res.data);
      setEventData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    console.log("Tab Key", selectedTab);

    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
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
            onClick={() => openDeleteModal(props.dataItem.eventId)}
          >
            <i className="icon-delete-1"></i>
          </button>
        </div>
      </td>
    );
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteEvents(deleteId);

      closeDeleteModal();
      await getEvents();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="row">
      <div className="row align-items-center gap-3">
        <h3>Events</h3>
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
            role="search"
            noValidate
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button
              className="btn btn-outline-primary search-toggle"
              type="button"
            >
              <i className="demo-icon icon-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="col-12">
        <ul className="nav nav-tabs">
          {eventTabs.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                type="button"
                className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <div className="col-12 mt-3 mt-xxl-4">
            <div className="table-responsive" style={{ overflow: "visible" }}>
              <Tooltip
                anchorElement="target"
                position="top"
                openDelay={100}
                className="grid-tooltip"
              >
                <Grid
                  data={eventData}
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
                      data: (props) => (
                        <DateTimeCell
                          {...props}
                          showEndedMessage={activeTab === "passed"}
                        />
                      ),
                    }}
                  />
                  <GridColumn
                    width={"300px"}
                    title="Address"
                    field="address"
                    cells={{ data: DetailsCell }}
                  />
                  <GridColumn title="Created By" field="userName" />
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
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default Events;

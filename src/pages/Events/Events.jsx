import React, { useEffect, useState } from "react";
import "../ManageEndUsers/css/EventsTable.css";
import { deleteEvents, getAllEventList } from "../../api/Events/eventApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { DetailsCell } from "../../components/GridCells/DetailsCell";
import DateTimeCell from "../../components/GridCells/DateTimeCell";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { TextCell } from "../../components/GridCells/TextCell";
import { getMenuPermission } from "../../utils/permission";
import { ActionCell } from "../../components/GridCells/ActionCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";
import { encryptUrlParam } from "../../utils/crypto";

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
    key: "adminAdded",
    label: "Admin-added venues' Events requests",
    isUpcomingEvents: "null",
    isAdminRequest: true,
  },
];

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "venueName", minWidth: 220 },
  { field: "eventName", minWidth: 220 },
  { field: "dateTime", minWidth: 220 },
  { field: "address", minWidth: 260 },
  { field: "userName", minWidth: 140 },
  { field: "approvalStatusName", minWidth: 220 },
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
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "upcoming";

  const selectedTab = eventTabs.find((tab) => tab.key === activeTab);

  const navigate = useNavigate();

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const eventsPermission = getMenuPermission("Event");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== searchInput) {
        setSearch(searchInput);
      }

      setPage((prev) => {
        if (prev.skip === 0) return prev;

        return {
          ...prev,
          skip: 0,
        };
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    getEvents();
  }, [page, sort, search, activeTab]);

  useEffect(() => {
    if (!searchParams.get("tab")) {
      setSearchParams({ tab: "upcoming" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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
    setSearchParams({ tab: tabKey });

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
        <Breadcrumbs
          items={[
            {
              id: "events",
              text: "Events",
            },
          ]}
        />
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
            role="search"
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
        <ul className="nav nav-tabs mt-3">
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
            <div
              className="table-responsive"
              style={{ overflow: "visible" }}
              ref={gridRef}
            >
              <Tooltip
                anchorElement="target"
                position="top"
                openDelay={100}
                className="grid-tooltip"
              >
                <Grid
                  data={eventData}
                  pageable={false}
                  skip={page.skip}
                  take={page.take}
                  total={total}
                  sortable
                  sort={sort}
                  onSortChange={(e) => setSort(e.sort)}
                >
                  <GridColumn
                    width={getWidth("action")}
                    title="Action"
                    sortable={false}
                    cells={{
                      data: (props) => (
                        <ActionCell
                          {...props}
                          permission={eventsPermission}
                          idField="eventId"
                          onView={(id) =>
                            navigate(`/events/view/${encryptUrlParam(id)}`)
                          }
                          onDelete={openDeleteModal}
                        />
                      ),
                    }}
                  />
                  <GridColumn
                    title="Host Name/Venue Name"
                    field="venueName"
                    width={getWidth("venueName")}
                    cells={{ data: TextCell }}
                  />

                  <GridColumn
                    title="Event Name"
                    field="eventName"
                    width={getWidth("eventName")}
                    cells={{ data: TextCell }}
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
                    field="userName"
                    width={getWidth("userName")}
                    cells={{ data: TextCell }}
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

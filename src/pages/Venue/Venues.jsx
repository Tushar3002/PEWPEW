import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteVenue, getVenueList } from "../../api/Venue/venueApi";
import { TextCell } from "../../components/GridCells/TextCell";
import WebsiteCell from "../../components/GridCells/WebsiteCell";
import StatusCell from "../../components/GridCells/StatusCell";
import {
  getVenueGunDetails,
  updateVenueStatus,
} from "../../api/EndUsers/endUserViewApi";
import VenueModal from "../../components/Modal/VenueModal";
import { DateCell } from "../../components/GridCells/DateCell";
import { getVenueApprovalStatus } from "../../api/Common/commonApi";
import GunModal from "../../components/Modal/GunModal";
import { GunCountCell } from "../../components/GridCells/GunCountCell";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { PhoneCell } from "../../components/GridCells/PhoneCell";

import { getMenuPermission } from "../../utils/permission";
import { ActionCell } from "../../components/GridCells/ActionCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";
import { encryptUrlParam } from "../../utils/crypto";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import FilterHeaderCell from "../../components/GridCells/FilterHeaderCell";
import { useAuth } from "../../context/AuthContext";
import useStatusConfirmation from "../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../components/Modal/StatusConfirmationModal";
import { hasAction } from "../../utils/hasAction";

const responsiveColumns = [
  { field: "action", minWidth: 140 },
  { field: "venueOwnerUserName", minWidth: 180 },
  { field: "venueName", minWidth: 180 },
  { field: "description", minWidth: 230 },
  { field: "website", minWidth: 180 },
  { field: "phone", minWidth: 140 },
  { field: "address", minWidth: 260 },
  { field: "totalGun", minWidth: 160 },
  { field: "avgRate", minWidth: 170 },
  { field: "noOfChackin", minWidth: 160 },
  { field: "noOfEvent", minWidth: 170 },
  { field: "userName", minWidth: 140 },
  { field: "createdOn", minWidth: 140 },
  { field: "approvalStatus", minWidth: 240 },
  { field: "status", minWidth: 150 },
];

function Venues() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [showVenueModal, setShowVenueModal] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const [filters, setFilters] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);

  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showGunModal, setShowGunModal] = useState(false);
  const [gunData, setGunData] = useState([]);

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const navigate = useNavigate();

  // const {user}=useAuth()

  const onView = true;

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const {
    showStatusModal,
    statusId,
    currentStatus,
    isUpdatingStatus,
    setIsUpdatingStatus,
    openStatusModal,
    closeStatusModal,
  } = useStatusConfirmation();

  useEffect(() => {
    venueData();
    approvalStatusData();
  }, [page, sort, search, filters]);
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
  const venuePermission = getMenuPermission("Venue");

  // console.log(venuePermission);
  const venueData = async () => {
    // console.log("venueData CALLED");
    try {
      const body = {
        page: page.skip / page.take + 1,
        pageSize: page.take,

        sorts: sort.map((s) => ({
          field: s.field,
          direction: s.dir === "asc" ? 0 : 1,
        })),

        customSearch: search,

        Filters: filters,
      };
      // console.log("Venye User",user);

      const res = await getVenueList(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error);
    }
  };

  const approvalStatusData = async () => {
    try {
      const res = await getVenueApprovalStatus();
      console.log(res.data);
      setApprovals(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const StatusDropdownCell = (props) => {
    const currentStatus = props.dataItem?.[props.field] ?? "";

    return (
      <td {...props.tdProps}>
        <select
          className="form-select"
          value={currentStatus}
          disabled={props.dataItem.isCreateAdmin}
          onChange={(e) => {
            const selectedStatus = approvals.find(
              (approval) => approval.description === e.target.value,
            );

            console.log("Selected approval:", selectedStatus);
          }}
        >
          {approvals.map((approval) => (
            <option key={approval.id} value={approval.description}>
              {approval.description}
            </option>
          ))}
        </select>
      </td>
    );
  };

  const handleGunClick = async (venueId) => {
    try {
      const res = await getVenueGunDetails(venueId);
      // console.log(res);
      // console.log("Venue",venueId);

      setGunData(res.data);
      setShowGunModal(true);
    } catch (error) {
      console.error(error?.response);
    }
  };

  const editUserCell = (props) => {
    const userId = props.dataItem.userId;
    const userName = props.dataItem.venueOwnerUserName;
    return (
      <td {...props.tdProps}>
        <button
          title={userName}
          type="button"
          className="btn btn-link p-0"
          onClick={() =>
            navigate(`/manage-users/edit/${encryptUrlParam(userId)}`)
          }
        >
          {userName}
        </button>
      </td>
    );
  };

  const updateStatusToggle = async (venueId, isActive) => {
    try {
      const res = await updateVenueStatus(venueId, isActive);
      venueData();
      return res;
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleStatusToggle = async () => {
    if (!statusId) return;

    const nextValue = !currentStatus;

    try {
      setIsUpdatingStatus(true);

      const isSuccess = await updateStatusToggle(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await venueData();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteVenue(deleteId);

      closeDeleteModal();
      await venueData();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditVenue = (venueId) => {
    console.log("Handle Edit", venueId);

    setSelectedVenueId(venueId);
    setShowVenueModal(true);
  };
  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "venues",
              text: "Venues",
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

        <div className="col-12 col-lg">
          <div className="btn-list d-flex justify-content-lg-end flex-wrap gap-2 gap-md-3 text-end">
            {/* <a href="#" className="btn main-btn border-btn danger-btn">
          Delete
        </a>

        <a href="#" className="btn main-btn border-btn blue-btn">
          Import
        </a> */}

            {/* <a href="#" className="btn main-btn border-btn sky-btn">
              Export
            </a> */}

            {venuePermission.canCreate && (
              <button
                type="button"
                className="btn main-btn border-btn blue-btn"
                onClick={() => {
                  setSelectedVenueId(null);
                  setShowVenueModal(true);
                }}
              >
                Add Venue
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="row">
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
                style={{ width: "100%", overflow: "visible" }}
                data={data}
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                {hasAction(venuePermission, onView) && (
                  <GridColumn
                    width={getWidth("action")}
                    title="Action"
                    sortable={false}
                    cells={{
                      data: (props) => (
                        <ActionCell
                          {...props}
                          permission={venuePermission}
                          idField="venueId"
                          onView={(id) =>
                            navigate(`/venues/view/${encryptUrlParam(id)}`)
                          }
                          onEdit={handleEditVenue}
                          onDelete={openDeleteModal}
                        />
                      ),
                    }}
                  />
                )}
                <GridColumn
                  title="Owner Name"
                  field="venueOwnerUserName"
                  cells={{
                    data: editUserCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                        filterType="text"
                      />
                    ),
                  }}
                  width={getWidth("venueOwnerUserName")}
                />
                <GridColumn
                  width={getWidth("venueName")}
                  title="Venue Name"
                  field="venueName"
                  cells={{
                    data: TextCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                        filterType="text"
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("description")}
                  title="Description"
                  field="description"
                  cells={{
                    data: TextCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("website")}
                  title="Website"
                  field="website"
                  cells={{
                    data: WebsiteCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("phone")}
                  title="Phone"
                  cells={{
                    data: PhoneCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("address")}
                  title="Address"
                  field="address"
                  cells={{
                    data: TextCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("totalGun")}
                  title="No. of Gun"
                  field="totalGun"
                  cells={{
                    data: (props) => (
                      <GunCountCell
                        {...props}
                        onClick={handleGunClick}
                        idField="venueId"
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("avgRate")}
                  title="Avg Venue Ratings"
                  field="avgRate"
                />
                <GridColumn
                  width={getWidth("noOfChackin")}
                  title="No. of Check-Ins"
                  field="noOfChackin"
                />
                <GridColumn
                  width={getWidth("noOfEvent")}
                  title="No. of Event Created "
                  field="noOfEvent"
                />
                <GridColumn
                  width={getWidth("userName")}
                  title="Created By"
                  field="userName"
                  cells={{
                    data: TextCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        setFilters={setFilters}
                        filters={filters}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("createdOn")}
                  title="Created On"
                  field="createdOn"
                  cells={{
                    data: DateCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        filters={filters}
                        setFilters={setFilters}
                        filterType="date"
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("approvalStatus")}
                  title="Approval Status"
                  field="approvalStatus"
                  cells={{
                    data: StatusDropdownCell,
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        filters={filters}
                        setFilters={setFilters}
                        filterType="select"
                        filterOptions={[
                          { label: "Approved", value: "1" },
                          { label: "Rejected", value: "2" },
                          { label: "Pending", value: "3" },
                        ]}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={getWidth("status")}
                  title="Status"
                  field="isActive"
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="venueId"
                        onToggle={openStatusModal}
                      />
                    ),
                    headerCell: (props) => (
                      <FilterHeaderCell
                        {...props}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        filters={filters}
                        setFilters={setFilters}
                        filterType="status"
                      />
                    ),
                  }}
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
      <GunModal
        show={showGunModal}
        onClose={() => setShowGunModal(false)}
        data={gunData}
      />
      <VenueModal
        show={showVenueModal}
        onClose={() => {
          setShowVenueModal(false);
          setSelectedVenueId(null);
        }}
        venueId={selectedVenueId}
        onSuccess={venueData}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <StatusConfirmationModal
        show={showStatusModal}
        onClose={closeStatusModal}
        onConfirm={handleStatusToggle}
        isUpdatingStatus={isUpdatingStatus}
      />
    </div>
  );
}

export default Venues;

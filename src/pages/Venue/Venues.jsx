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

  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showGunModal, setShowGunModal] = useState(false);
  const [gunData, setGunData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    venueData();
    approvalStatusData();
  }, [page, sort, search]);
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
      };
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

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() => navigate(`/venue/view/${props.dataItem.venueId}`)}
          >
            <i className="fa fa-eye"></i>
          </button>
          <button
            type="button"
            className="edit-btn"
            title="Edit"
            onClick={() => handleEditVenue(props.dataItem.venueId)}
          >
            <i className="icon-edit-1"></i>
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

  const GunCountCell = (props) => {
    const count = props.dataItem.totalGun;
    const venueId = props.dataItem.venueId;

    return (
      <td {...props.tdProps}>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => handleGunClick(venueId)}
        >
          {count}
        </button>
      </td>
    );
  };

  const editUserCell = (props) => {
    const userId = props.dataItem.userId;
    const userName = props.dataItem.venueOwnerUserName;
    return (
      <td {...props.tdProps}>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate(`/manage-users/edit/${userId}`)}
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

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    const isSuccess = await updateStatusToggle(id, nextValue);

    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (venueId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?",
    );

    if (!confirmed) return;

    try {
      const res = await deleteVenue(venueId);

      await venueData();
    } catch (error) {
      console.log("DELETE CATCH:", error);
      console.log("Response:", error?.response);
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
        <h3>Venues</h3>
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
          </div>
        </div>
      </div>

      <div className="row w-100">
        <div className="col-12 mt-3 mt-xxl-4 w-100 ">
          <div
            className="table-responsive w-100"
            style={{ overflow: "visible" }}
          >
            <Grid
              style={{ width: "100%", overflow: "visible" }}
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
              sortable
              sort={sort}
              onSortChange={(e) => setSort(e.sort)}
            >
              <GridColumn
                width={"125px"}
                title="Action"
                cells={{ data: ActionCell }}
              />
              <GridColumn
                width={"150px"}
                title="Owner Name"
                field="venueOwnerUserName"
                cells={{ data: editUserCell }}
              />
              <GridColumn
                width={"180px"}
                title="Venue Name"
                field="venueName"
              />
              <GridColumn
                width={"220px"}
                title="Description"
                field="description"
                cells={{ data: TextCell }}
              />
              <GridColumn
                width={"190px"}
                title="Website"
                field="website"
                cells={{ data: WebsiteCell }}
              />
              <GridColumn width={"120px"} title="Phone" field="phone" />
              <GridColumn
                width={"260px"}
                title="Address"
                field="address"
                cells={{ data: TextCell }}
              />
              <GridColumn
                width={"160px"}
                title="No. of Gun"
                field="totalGun"
                cells={{ data: GunCountCell }}
              />
              <GridColumn
                width={"160px"}
                title="Avg Venue Ratings"
                field="avgRate"
              />
              <GridColumn
                width={"160px"}
                title="No. of Check-Ins"
                field="noOfChackin"
              />
              <GridColumn
                width={"160px"}
                title="No. of Event Created "
                field="noOfEvent"
              />
              <GridColumn width={"160px"} title="Created By" field="userName" />
              <GridColumn
                width={"160px"}
                title="Created On"
                field="createdOn"
                cells={{ data: DateCell }}
              />
              <GridColumn
                width={"220px"}
                title="Approval Status"
                field="approvalStatusName"
                cells={{ data: StatusDropdownCell }}
              />
              <GridColumn
                width={"160px"}
                title="Status"
                cells={{
                  data: (props) => (
                    <StatusCell
                      {...props}
                      idField="venueId"
                      onToggle={handleStatusToggle}
                    />
                  ),
                }}
              />
            </Grid>
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
    </div>
  );
}

export default Venues;

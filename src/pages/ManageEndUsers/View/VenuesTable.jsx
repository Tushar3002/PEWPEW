import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import {
  
  getVenueGunDetails,
  updateVenueStatus,
  venueListByUser,
} from "../../../api/EndUsers/endUserViewApi";
import GunModal from "../../../components/Modal/GunModal";
import { useNavigate } from "react-router-dom";
import { DetailsCell } from "../../../components/GridCells/DetailsCell";
import VenueEditModal from "../../../components/Modal/VenueModal";
import WebsiteCell from "../../../components/GridCells/WebsiteCell";
import { deleteVenue } from "../../../api/Venue/venueApi";

function VenuesTable({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [showGunModal, setShowGunModal] = useState(false);
  const [gunData, setGunData] = useState([]);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchVenue();
  }, [page, userId]);

  const fetchVenue = async () => {
    console.log("UserID", userId);

    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      search: search,
      isMyVenue: true,
      userId,
    };
    try {
      const res = await venueListByUser(body);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
      console.log("Venue Data", res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleGunClick = async (venueId) => {
    try {
      const res = await getVenueGunDetails(venueId);
      console.log(res.data);
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
            onClick={() => handleEdit(props.dataItem.venueId)}
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

  const updateStatusData = async (venueId, isActive) => {
    try {
      const res = await updateVenueStatus(venueId, isActive);
      fetchVenue();
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

    const isSuccess = await updateStatusData(id, nextValue);
    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  const StatusCell = (props) => (
    <td className="text-center align-middle">
      <div className="form-check form-switch d-inline-flex align-items-center m-0">
        <input
          className="form-check-input"
          type="checkbox"
          checked={Boolean(props.dataItem.isActive)}
          onChange={() =>
            handleStatusToggle(
              props.dataItem.venueId,
              Boolean(props.dataItem.isActive),
            )
          }
        />
      </div>
    </td>
  );

  const ImageCell = (props) => {
    const image = props.dataItem.attachmentFullPath;

    return (
      <td className="text-center">
        {image ? (
          <img
            src={image}
            alt="Gun"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          "-"
        )}
      </td>
    );
  };

  const DateCell = (props) => {
    const date = props.dataItem.createdOn;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-GB")
      : "-";

    return (
      <td {...props.tdProps}>
        <span title={formattedDate}>{formattedDate}</span>
      </td>
    );
  };

  const ApprovalStatusCell = (props) => {
    const status = props.dataItem.approvalStatus;

    let text = "Pending";

    if (status === 1) text = "Accepted";
    if (status === 2) text = "Rejected";

    return <td>{text}</td>;
  };

  const TextCell = (props) => {
    const value = props.dataItem[props.field] ?? "";

    return (
      <td {...props.tdProps}>
        <span
          title={value}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "100%" }}
        >
          {value}
        </span>
      </td>
    );
  };
  

  const handleDelete = async (id) => {
    try {
      await deleteVenue(id);
      fetchVenue();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (venueId) => {
    setSelectedVenueId(venueId);
    setShowEditModal(true);
  };
  return (
    <div className="tabbar-section">
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
                  title="Action"
                  width={"150px"}
                  headerClassName="text-center"
                  cells={{
                    data: ActionCell,
                  }}
                />
                <GridColumn
                  // width={"180px"}
                  field="venueName"
                  title="Venue Name"
                  // columnMenu={ColumnMenu}
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="description"
                  title="Description Name"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="website"
                  title="Website"
                  cells={{ data: WebsiteCell }}
                />
                <GridColumn
                  field="phone"
                  title="Phone"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="address"
                  title="Address"
                  width={"300px"}
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="totalGun"
                  title="No. of Gun"
                  cells={{ data: GunCountCell }}
                />
                <GridColumn
                  field="avgRate"
                  title="Avg Venue Ratings"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="noOfChackin"
                  title="No. of Check-Ins"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="noOfEvent"
                  title="No. of Event Created"
                  cells={{ data: TextCell }}
                />

                <GridColumn title="Created On" cells={{ data: DateCell }} />
                <GridColumn
                  title="Approval Status"
                  cells={{ data: ApprovalStatusCell }}
                />

                <GridColumn
                  title="Status"
                  cells={{
                    data: StatusCell,
                  }}
                />
              </Grid>
            </Tooltip>
          </div>
        </div>
      </div>
      <GunModal
        show={showGunModal}
        onClose={() => setShowGunModal(false)}
        data={gunData}
      />
      <VenueEditModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedVenueId(null);
        }}
        venueId={selectedVenueId}
      />
    </div>
  );
}

export default VenuesTable;

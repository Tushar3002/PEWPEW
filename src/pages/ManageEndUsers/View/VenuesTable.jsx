import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import {
  updateVenueStatus,
  venueListByUser,
} from "../../../api/EndUsers/endUserViewApi";

function VenuesTable({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [search, setSearch] = useState("");

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

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => handleDelete(props.dataItem.gunId)}
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
  const DetailsCell = (props) => {
    const value = props.dataItem[props.field] || "";

    return (
      <td>
        <span
          title={value}
          style={{
            display: "block",
            width: "100px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </span>
      </td>
    );
  };
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
  const WebsiteCell = (props) => {
    const url = props.dataItem.website;

    if (!url) {
      return <td {...props.tdProps}>-</td>;
    }

    // Add https:// if missing
    const href =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    return (
      <td {...props.tdProps}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={url}
          style={{
            color: "#0d6efd", // Bootstrap primary blue
            textDecoration: "underline",
          }}
        >
          {url}
        </a>
      </td>
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteGunUser(id);
      fetchUploadGun();
    } catch (error) {
      console.log(error.response);
    }
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
                  cells={{ data: DetailsCell }}
                />
                <GridColumn
                  field="totalGun"
                  title="No. of Gun"
                  cells={{ data: TextCell }}
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
    </div>
  );
}

export default VenuesTable;

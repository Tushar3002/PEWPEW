import React, { useEffect, useState } from "react";
import {
  getSupportList,
  statusUpdateSupportTicket,
} from "../../api/SupportList/supportList";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { TextCell } from "../../components/GridCells/TextCell";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { getSupportStatus } from "../../api/Common/commonApi";
import SupportEditModal from "../../components/Modal/SupportEditModal";

function SupportTicket() {
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const [status, setStatus] = useState([]);

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
    getSupportTickets();
    getSupportTicketStatus();
  }, [page, sort, search]);
  const getSupportTickets = async () => {
    const body = {
      page: page.skip / page.take + 1,
      pageSize: page.take,
      customSearch: search,

      sorts: sort.map((s) => ({
        field: s.field,
        direction: s.dir === "asc" ? 0 : 1,
      })),
    };

    try {
      const res = await getSupportList(body);
      // console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSupportTicketStatus = async () => {
    try {
      const res = await getSupportStatus();
      // console.log(res.data);
      setStatus(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateSupportTicketStatus = async () => {
    const body = {
      adminDescription,
      statusId,
      ticketId,
    };
    try {
      const res = await statusUpdateSupportTicket(body);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEditTicket = (ticketId) => {
    // console.log("Handle Edit", ticketId);
    

    setSelectedTicketId(ticketId);
    setShowTicketModal(true);
    // console.log("Handle Edit", selectedTicketId);
  };

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="edit-btn"
            title="Edit"
            onClick={() => handleEditTicket(props.dataItem.id)}
          >
            <i className="icon-edit-1"></i>
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
          onChange={(e) => {
            const selectedStatus = status.find(
              (approval) => approval.description === e.target.value,
            );

            console.log("Selected approval:", selectedStatus);
          }}
        >
          {status.map((approval) => (
            <option key={approval.id} value={approval.description}>
              {approval.description}
            </option>
          ))}
        </select>
      </td>
    );
  };
  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <h3>Support Tickets</h3>
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
                  title="Username"
                  field="userName"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  title="Email/Phone"
                  field="emailePhone"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  title="Issue Type"
                  field="issueType"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  title="Description"
                  field="description"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  title="Admin Comments"
                  field="adminDescription"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  width={"250px"}
                  title="Ticket Status"
                  field="status"
                  cells={{ data: StatusDropdownCell }}
                />
              </Grid>
            </Tooltip>
          </div>
        </div>
      </div>
      <SupportEditModal 
        ticketId={selectedTicketId}
        show={showTicketModal}
        onClose={() => {
          setShowTicketModal(false);
          setSelectedTicketId(null);
        }}

        onSuccess={getSupportTickets}
      />
    </div>
  );
}

export default SupportTicket;

import React, { useEffect, useState } from "react";
import {
  deleteSupportTicket,
  getSupportList,
  statusUpdateSupportTicket,
} from "../../api/SupportList/supportList";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { TextCell } from "../../components/GridCells/TextCell";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { getSupportStatus } from "../../api/Common/commonApi";
import SupportEditModal from "../../components/Modal/SupportEditModal";
import SupportStatusModal from "../../components/Modal/SupportStatusModal";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";

const responsiveColumns = [
  { field: "action", minWidth:110 },
  { field: "userName", minWidth: 180 },
  { field: "emailePhone", minWidth: 220 },
  { field: "issueType", minWidth: 180 },
  { field: "description", minWidth: 250 },
  { field: "adminDescription", minWidth: 250 },
  { field: "status", minWidth: 180 },
];

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

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [statusChange, setStatusChange] = useState(null);

  const [adminDescription, setAdminDescription] = useState("");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();
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
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getSupportTicketStatus = async () => {
    try {
      const res = await getSupportStatus();
      console.log(res.data);
      setStatus(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateSupportTicketStatus = async () => {
    if (!statusChange) return;

    const body = {
      ticketId: statusChange.ticketId,
      statusId: statusChange.newStatusId,
      adminDescription: adminDescription.trim(),
    };

    try {
      const res = await statusUpdateSupportTicket(body);

      console.log(res.data);

      setShowStatusModal(false);
      setStatusChange(null);
      setAdminDescription("");

      await getSupportTickets();
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

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteSupportTicket(deleteId);

      closeDeleteModal();
      await getSupportTickets();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };

  // const handleDeleteClick = (ticketId) => {
  //   setDeleteId(ticketId);
  //   setShowDeleteModal(true);
  // };

  const ActionCell = (props) => {
    const statusId = props.dataItem.statusId;

    const canDelete = statusId === 3 || statusId === 4;

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content align-items-center gap-2">
          <button
            type="button"
            className="edit-btn"
            title="Edit"
            onClick={() => handleEditTicket(props.dataItem.id)}
          >
            <i className="icon-edit-1"></i>
          </button>

          {canDelete && (
            <button
              type="button"
              className="delete-btn"
              title="Delete"
              onClick={() => openDeleteModal(props.dataItem.id)}
            >
              <i className="demo-icon icon-delete-1"></i>
            </button>
          )}
        </div>
      </td>
    );
  };

  const StatusDropdownCell = (props) => {
    const ticket = props.dataItem;
    const currentStatusId = ticket.statusId;

    const isClosedStatus = currentStatusId === 3 || currentStatusId === 4;

    const handleStatusChange = (e) => {
      const newStatusId = Number(e.target.value);

      if (newStatusId === currentStatusId) return;

      const selectedStatus = status.find((item) => item.id === newStatusId);

      if (!selectedStatus) return;

      setStatusChange({
        ticketId: ticket.id,
        newStatusId: selectedStatus.id,
      });

      setAdminDescription(ticket.adminDescription || "");
      setShowStatusModal(true);
    };

    return (
      <td {...props.tdProps}>
        <select
          title={status.find((s) => s.id === currentStatusId)?.description}
          className="form-select"
          value={currentStatusId}
          onChange={handleStatusChange}
        >
          {status.map((item) => {
            const shouldDisable =
              isClosedStatus && (item.id === 1 || item.id === 2);

            return (
              <option key={item.id} value={item.id} disabled={shouldDisable}>
                {item.description}
              </option>
            );
          })}
        </select>
      </td>
    );
  };
  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "support-tickets",
              text: "Support Tickets",
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

      <div className="row w-100">
        <div className="col-12 mt-3 mt-xxl-4 w-100 ">
          <div
            className="table-responsive w-100"
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
                onPageChange={(e) => setPage(e.page)}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  cells={{ data: ActionCell }}
                />

                <GridColumn
                  title="Username"
                  field="userName"
                  width={getWidth("userName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Email/Phone"
                  field="emailePhone"
                  width={getWidth("emailePhone")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Issue Type"
                  field="issueType"
                  width={getWidth("issueType")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Description"
                  field="description"
                  width={getWidth("description")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Admin Comments"
                  field="adminDescription"
                  width={getWidth("adminDescription")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Ticket Status"
                  field="status"
                  width={getWidth("status")}
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
      <SupportEditModal
        ticketId={selectedTicketId}
        show={showTicketModal}
        onClose={() => {
          setShowTicketModal(false);
          setSelectedTicketId(null);
        }}
        onSuccess={getSupportTickets}
      />

      <SupportStatusModal
        show={showStatusModal}
        statusChange={statusChange}
        adminDescription={adminDescription}
        setAdminDescription={setAdminDescription}
        onConfirm={updateSupportTicketStatus}
        onClose={() => {
          setShowStatusModal(false);
          setStatusChange(null);
          setAdminDescription("");
        }}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default SupportTicket;

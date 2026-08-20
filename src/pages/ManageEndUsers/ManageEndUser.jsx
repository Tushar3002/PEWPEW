import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Grid, GridColumn } from "@progress/kendo-react-grid";

import {
  deleteEndUser,
  getEndUsers,
  updateEndUserStatus,
  updateVerification,
} from "../../api/EndUsers/endUserApi";
import StatusCell from "../../components/GridCells/StatusCell";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { TextCell } from "../../components/GridCells/TextCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";
import { encryptUrlParam } from "../../utils/crypto";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import useStatusConfirmation from "../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../components/Modal/StatusConfirmationModal";
import { getMenuPermission } from "../../utils/permission";

const responsiveColumns = [
  { field: "checkbox", minWidth: 60 },
  { field: "action", minWidth: 210 },
  { field: "firstName", minWidth: 180 },
  { field: "lastName", minWidth: 180 },
  { field: "userName", minWidth: 180 },
  { field: "contactNumber", minWidth: 160 },
  { field: "email", minWidth: 260 },
  { field: "status", minWidth: 90 },
];

function ManageEndUser() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [selectedUserIds, setSelectedUserIds] = useState([]);

  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const [sort, setSort] = useState([]);
  // const [filter, setFilter] = useState({
  //   logic: "and",
  //   filters: [],
  // });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const enduserPermission = getMenuPermission('EndUser')

  const navigate = useNavigate();

  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [currentVerification, setCurrentVerification] = useState(false);
  const [isUpdatingVerification, setIsUpdatingVerification] = useState(false);

  const openVerificationModal = (id, currentValue) => {
    setVerificationId(id);
    setCurrentVerification(currentValue);
    setShowVerificationModal(true);
  };

  const closeVerificationModal = () => {
    setShowVerificationModal(false);
    setVerificationId(null);
    setCurrentVerification(false);
  };

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
    fetchUsers();
  }, [page, sort, search]);
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

  const fetchUsers = async () => {
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

      const res = await getEndUsers(body);
      console.log("DAT", res.data.data);

      setUsers(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      // const userIds = Array.isArray(deleteId) ? deleteId : [deleteId];

      await deleteEndUser(deleteId);

      closeDeleteModal();
      await fetchUsers();

      setSelectedUserIds([]);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsDeleting(false);
    }
  };

  const updateVerificationData = async (id, isVerify) => {
    try {
      await updateVerification(id, isVerify);
      fetchUsers();
      return true;
    } catch (error) {
      console.log(error.response);
    }
  };

  const toggleUserSelection = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const CheckboxCell = (props) => {
    const rowId = props.dataItem.userId ?? props.dataItem.id;
    const isSelected = selectedUserIds.includes(rowId);

    return (
      <td className="text-center align-middle">
        <label className="custom-checkbox m-0">
          <input
            type="checkbox"
            className="child-checkbox"
            checked={isSelected}
            onChange={() => toggleUserSelection(rowId)}
          />
          <span className="checkmark"></span>
        </label>
      </td>
    );
  };

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);
    return (
      <td className="text-center align-middle">
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() =>
              navigate(
                `/manage-end-users/view/${encryptUrlParam(props.dataItem.id)}`,
              )
            }
          >
            <i className="fa fa-eye"></i>
          </button>

          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => openDeleteModal(props.dataItem.id)}
          >
            <i className="icon-delete-1"></i>
          </button>

          <button
            type="button"
            onClick={() =>
              openVerificationModal(
                props.dataItem.id,
                Boolean(props.dataItem.isVerify),
              )
            }
            className={`custom-toggle ${isVerified ? "enabled" : "disabled"}`}
          >
            <span className="custom-toggle-circle" />

            <span className="custom-toggle-text">
              {isVerified ? "Enabled" : "Verified"}
            </span>
          </button>
        </div>
      </td>
    );
  };
  const handleStatusToggle = async () => {
    if (!statusId) return;

    const nextValue = !currentStatus;

    try {
      setIsUpdatingStatus(true);

      const isSuccess = await updateEndUserStatus(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await fetchUsers();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleVerificationToggle = async () => {
    if (!verificationId) return;

    const nextValue = !currentVerification;

    try {
      setIsUpdatingVerification(true);

      const isSuccess = await updateVerificationData(verificationId, nextValue);

      if (!isSuccess) {
        alert("Failed to update verification.");
        return;
      }

      closeVerificationModal();

      await fetchUsers();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsUpdatingVerification(false);
    }
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "manage-end-users",
              text: "Manage End Users",
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
            {selectedUserIds.length > 0 ? (
              <button
                type="button"
                className="btn main-btn border-btn danger-btn"
                onClick={() => openDeleteModal(selectedUserIds)}
              >
                Delete
              </button>
            ) : null}

            {/* <a href="#" className="btn main-btn border-btn blue-btn">
              Import
            </a> */}

            {/* <a href="#" className="btn main-btn border-btn sky-btn">
              Export
            </a> */}
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
                data={users}
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                {enduserPermission?.canDelete &&<GridColumn
                  width={getWidth("checkbox")}
                  headerClassName="text-center"
                  cells={{
                    data: CheckboxCell,
                  }}
                />}

                <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  headerClassName="text-center"
                  cells={{
                    data: ActionCell,
                  }}
                />

                <GridColumn
                  field="firstName"
                  title="First Name"
                  width={getWidth("firstName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="lastName"
                  title="Last Name"
                  width={getWidth("lastName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="userName"
                  title="User Name"
                  width={getWidth("userName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="contactNumber"
                  title="Phone"
                  width={getWidth("contactNumber")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="email"
                  title="Email"
                  width={getWidth("email")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Status"
                  width={getWidth("status")}
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="id"
                        onToggle={openStatusModal}
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

      <StatusConfirmationModal
        show={showVerificationModal}
        onClose={closeVerificationModal}
        onConfirm={handleVerificationToggle}
        isToggle={isUpdatingVerification}
      />
    </div>
  );
}

export default ManageEndUser;

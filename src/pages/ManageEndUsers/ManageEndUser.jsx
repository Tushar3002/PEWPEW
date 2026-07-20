import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../components/columnMenu";
import {
  deleteEndUser,
  getEndUsers,
  updateEndUserStatus,
  updateVerification,
} from "../../api/EndUsers/endUserApi";

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

  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
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
  const handleDelete = async (ids) => {
    const userIds = Array.isArray(ids) ? ids : [ids];

    if (!userIds.length) return;

    try {
      await deleteEndUser(userIds);
      fetchUsers();
      setSelectedUserIds([]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateStatusData = async (id, isActive) => {
    try {
      await updateEndUserStatus(id, isActive);
      fetchUsers();
      return true;
    } catch (error) {
      console.log(error?.response);
      return false;
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
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() =>
              navigate(`/manage-end-users/view/${props.dataItem.id}`)
            }
          >
            <i className="fa fa-eye"></i>
          </button>

          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => handleDelete(props.dataItem.id)}
          >
            <i className="icon-delete-1"></i>
          </button>

          <button
            type="button"
            onClick={() =>
              handleVerificationToggle(
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
  const handleToggle = async ({ currentValue, updateFn, confirmMessage }) => {
    const nextValue = !currentValue;

    const message =
      typeof confirmMessage === "function"
        ? confirmMessage(nextValue)
        : confirmMessage;

    if (message) {
      const confirmed = window.confirm(message);

      if (!confirmed) return;
    }

    const isSuccess = await updateFn(nextValue);

    if (!isSuccess) {
      alert("Failed to update.");
    }
  };

  const handleStatusToggle = (id, currentValue) =>
    handleToggle({
      currentValue,
      updateFn: (nextValue) => updateStatusData(id, nextValue),
      confirmMessage: (nextValue) =>
        `Are you sure you want to ${
          nextValue ? "activate" : "deactivate"
        } this user?`,
    });

  const handleVerificationToggle = (id, currentValue) =>
    handleToggle({
      currentValue,
      updateFn: (nextValue) => updateVerificationData(id, nextValue),
      confirmMessage: "Do you want the user Verified",
    });
  const StatusCell = (props) => (
    <td className="text-center align-middle">
      <div className="form-check form-switch d-inline-flex align-items-center m-0">
        <input
          className="form-check-input"
          type="checkbox"
          checked={Boolean(props.dataItem.isActive)}
          onChange={() =>
            handleStatusToggle(
              props.dataItem.id,
              Boolean(props.dataItem.isActive),
            )
          }
        />
      </div>
    </td>
  );

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <h3>Manage User</h3>
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

        <div className="col-12 col-lg">
          <div className="btn-list d-flex justify-content-lg-end flex-wrap gap-2 gap-md-3 text-end">
            {selectedUserIds.length > 0 ? (
              <button
                type="button"
                className="btn main-btn border-btn danger-btn"
                onClick={() => handleDelete(selectedUserIds)}
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
          <div className="table-responsive" style={{ overflow: "visible" }}>
            <Grid
              //   style={{ width: "100%", overflow: "visible" }}
              // style={{ height: "600px" }}
              data={users}
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
              {/* Checkbox */}
              <GridColumn
                width="60px"
                headerClassName="text-center"
                cells={{
                  data: CheckboxCell,
                }}
              />

              <GridColumn
                title="Action"
                width="300px"
                headerClassName="text-center"
                cells={{
                  data: ActionCell,
                }}
              />
              <GridColumn
                width={"210px"}
                field="firstName"
                title="First Name"
                // columnMenu={ColumnMenu}
              />
              <GridColumn width={"210px"} field="lastName" title="Last Name" />
              <GridColumn width={"210px"} field="userName" title="User Name" />

              <GridColumn width={"210px"} field="contactNumber" title="Phone" />
              <GridColumn width={"350px"} field="email" title="Email" />

              <GridColumn
                width={"240px"}
                title="Status"
                cells={{
                  data: StatusCell,
                }}
              />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEndUser;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers, updateStatus } from "../../api/userApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../components/columnMenu";

function ManageUser() {
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

  const updateStatusData = async (id, isActive) => {
    try {
      await updateStatus(id, isActive);
      fetchUsers();
      return true;
    } catch (error) {
      console.log(error?.response);
      return false;
    }
  };

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

      const res = await getUsers(body);
      console.log(res.data.data);

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
      await deleteUser(userIds);
      fetchUsers();
      setSelectedUserIds([]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const toggleUserSelection = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // const handleFilterChange = (e) => {
  //   setFilter(e.filter);

  //   setPage((prev) => ({
  //     ...prev,
  //     skip: 0,
  //   }));
  // };
  // const filterOperators = {
  //   text: [
  //     {
  //       text: "Contains",
  //       operator: "contains",
  //     },
  //   ],
  // };

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
  const ActionCell = (props) => (
    <td className="text-center align-middle">
      <div className="d-flex justify-content-center gap-2">
        <button
          type="button"
          className="edit-btn"
          title="Edit"
          onClick={() => navigate(`/manage-users/edit/${props.dataItem.id}`)}
        >
          <i className="demo-icon icon-edit-1"></i>
        </button>

        <button
          type="button"
          className="delete-btn"
          title="Delete"
          onClick={() => handleDelete(props.dataItem.id)}
        >
          <i className="demo-icon icon-delete-1"></i>
        </button>
      </div>
    </td>
  );
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

            <a href="#" className="btn main-btn border-btn sky-btn">
              Export
            </a>

            <Link
              to={"/manage-users/add"}
              className="btn main-btn border-btn blue-btn"
            >
              Add Users
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div className="table-responsive" style={{ overflow: "visible" }}>
            <Grid
              // style={{ width: "100%", overflow: "visible" }}
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
                width="150px"
                headerClassName="text-center"
                cells={{
                  data: ActionCell,
                }}
              />
              <GridColumn
                width={"180px"}
                field="firstName"
                title="First Name"
                // columnMenu={ColumnMenu}
              />
              <GridColumn width={"180px"} field="lastName" title="Last Name" />
              <GridColumn width={"180px"} field="userName" title="User Name" />
              <GridColumn width={"150px"} field="roleName" title="Role" />
              <GridColumn width={"170px"} field="contactNumber" title="Phone" />
              <GridColumn width={"300px"} field="email" title="Email" />

              <GridColumn
                width={"220px"}
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

export default ManageUser;

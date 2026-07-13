import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../api/userApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../components/columnMenu";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusMap, setStatusMap] = useState({});

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

      const res = await getUsers(body);
      console.log(res.data.data);

      setUsers(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res=await deleteUser([id])
      fetchUsers()
      console.log(id);
      
    } catch (error) {
      console.log(error.response);
    }
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

  const CheckboxCell = () => (
    <td className="text-center align-middle">
      <label className="custom-checkbox m-0">
        <input type="checkbox" className="child-checkbox" />
        <span className="checkmark"></span>
      </label>
    </td>
  );
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

        <button type="button" className="delete-btn" title="Delete" onClick={()=>handleDelete(props.dataItem.id)}>
          <i className="demo-icon icon-delete-1"></i>
        </button>
      </div>
    </td>
  );
  const handleStatusToggle = (id, currentValue) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: !currentValue,
    }));
  };

  const StatusCell = (props) => {
    const rowId = props.dataItem.id;
    const isActive = statusMap[rowId] ?? props.dataItem.isActive;

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div
            className={`tag ${isActive ? "success-tag" : "basic-tag"} d-inline-block`}
          >
            {isActive ? "Active" : "Inactive"}
          </div>

          <div className="form-check form-switch d-inline-flex align-items-center m-0">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={Boolean(isActive)}
              onChange={() => handleStatusToggle(rowId, Boolean(isActive))}
              aria-label={`Toggle status for ${props.dataItem.userName || "user"}`}
            />
          </div>
        </div>
      </td>
    );
  };
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
            {/* <a href="#" className="btn main-btn border-btn danger-btn">
          Delete
        </a>

        <a href="#" className="btn main-btn border-btn blue-btn">
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
          <div className="table-responsive">
            <Grid
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
                width="110px"
                headerClassName="text-center"
                cells={{
                  data: ActionCell,
                }}
              />
              <GridColumn
                width={"150px"}
                field="firstName"
                title="First Name"
                // columnMenu={ColumnMenu}
              />
              <GridColumn width={"150px"} field="lastName" title="Last Name" />
              <GridColumn width={"150px"} field="userName" title="User Name" />
              <GridColumn width={"120px"} field="roleName" title="Role" />
              <GridColumn width={"150px"} field="contactNumber" title="Phone" />
              <GridColumn width={"300px"} field="email" title="Email" />

              <GridColumn
                width={"120px"}
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

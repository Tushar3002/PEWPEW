import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../../api/userApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  useEffect(() => {
    fetchUsers();
  }, [page]);
  const fetchUsers = async () => {
    try {
      const res = await getUsers({
        page: page.skip / page.take + 1,
        pageSize: page.take,
      });
      console.log(res.data);

      setUsers(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
            role="search"
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
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
              style={{ height: "600px" }}
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
            >
              {/* Checkbox */}
              <GridColumn
                title=""
                width="70px"
                cell={(props) => (
                  <td>
                    <label className="custom-checkbox">
                      <input type="checkbox" className="child-checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                )}
              />

              {/* Action */}
              <GridColumn
                title="Action"
                width="120px"
                cell={(props) => (
                  <td>
                    <span className="d-flex gap-2 align-items-center">
                      <Link
                        className="small-square-btn edit-btn"
                        to={`/manage-users/edit/${props.dataItem.id}`}
                      >
                        <i className="demo-icon icon-edit-1"></i>
                      </Link>

                      <button
                        type="button"
                        className="small-square-btn danger-btn border-0"
                      >
                        <i className="demo-icon icon-delete-1"></i>
                      </button>
                    </span>
                  </td>
                )}
              />

              {/* User Details */}
              <GridColumn field="firstName" title="First Name" />
              <GridColumn field="lastName" title="Last Name" />
              <GridColumn field="roleName" title="Role" />
              <GridColumn field="contactNumber" title="Phone" />
              <GridColumn field="email" title="Email" />

              {/* Status */}
              <GridColumn
                title="Status"
                width="120px"
                cell={(props) => (
                  <td>
                    <div
                      className={`tag ${
                        props.dataItem.isActive ? "success-tag" : "basic-tag"
                      }`}
                    >
                      {props.dataItem.isActive ? "Active" : "Inactive"}
                    </div>
                  </td>
                )}
              />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;

import React from 'react'
import { Link } from 'react-router-dom'

function ManageUser() {
  return (
    <div className="tabbar-section">
  <div className="row align-items-center gap-3">
    <div className="col-12 col-lg-auto">
      <form className="d-md-flex searchbar align-items-center" role="search">
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
        <a href="#" className="btn main-btn border-btn danger-btn">
          Delete
        </a>

        <a href="#" className="btn main-btn border-btn blue-btn">
          Import
        </a>

        <a href="#" className="btn main-btn border-btn sky-btn">
          Export
        </a>

        <a href="#" className="btn main-btn border-btn blue-btn">
          Add Users
        </a>
      </div>
    </div>
  </div>

  <div className="row">
    <div className="col-12 mt-3 mt-xxl-4">
      <div className="table-responsive">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>
                <label className="custom-checkbox">
                  <input type="checkbox" id="parentCheckbox" />
                  <span className="checkmark"></span>
                </label>
              </th>

              <th>Action</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <label className="custom-checkbox">
                  <input type="checkbox" className="child-checkbox" />
                  <span className="checkmark"></span>
                </label>
              </td>

              <td>
                <span className="d-flex gap-2 align-items-center">
                  <Link
                    className="small-square-btn edit-btn"
                    to={'/manage-users-edit'}
                  >
                    <i className="demo-icon icon-edit-1"></i>
                  </Link>

                  <a className="small-square-btn danger-btn" href="#">
                    <i className="demo-icon icon-delete-1"></i>
                  </a>
                </span>
              </td>

              <td>Tom</td>
              <td>Curran</td>
              <td>Admin</td>
              <td>+18478799831</td>
              <td>kem.s@gmail.com</td>

              <td>
                <div className="tag basic-tag">Inactive</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default ManageUser
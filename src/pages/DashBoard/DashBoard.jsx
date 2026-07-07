import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import StatsCard from "../../components/StatsCard";

import usersIcon from "../../assets/images/icons/users.svg";
import locationIcon from "../../assets/images/icons/location.svg";
import gunIcon from "../../assets/images/icons/gun.svg";
import bulletsIcon from "../../assets/images/icons/bullets.svg";
import TableCard from "../../components/TableComponent";

function DashBoard() {
  return (
    <>
      <div className="page-heading">
        <div className="row align-items-center gap-3 mb-3 mb-xxl-4">
          <div className="col-12 col-md">
            <h2 className="page-title">Welcome to Dashboard, John!</h2>
          </div>

          <div className="col-12 col-md-auto">
            <select className="form-select w-100">
              <option>Last 24 Hours</option>
              <option>Last 36 Hours</option>
              <option>Last 48 Hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className="cards-section">
        <div className="row g-3 g-xxl-4">
          <StatsCard value="380" title="Total No. of Users" icon={usersIcon} />

          <StatsCard
            value="389"
            title="Total No. of Venues"
            icon={locationIcon}
          />

          <StatsCard value="410" title="Total No. of Guns" icon={gunIcon} />

          <StatsCard
            value="2,712"
            title="Total No. of Ammunitions"
            icon={bulletsIcon}
          />
        </div>
      </div>

      <div className="card-section">
        <div className="row">
          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Liked Posts</h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th className="no-wrap-text">Action</th>
                        <th className="no-wrap-text">User Name/Group Name</th>
                        <th className="no-wrap-text">Uploaded Date</th>
                        <th>Likes</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a className="basic-links me-1" href="#">
                              <i className="demo-icon icon-eye-line"></i>
                            </a>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>

                        <td>Andrew Abbott</td>
                        <td>07/24/2025</td>
                        <td>1287</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a className="basic-links me-1" href="#">
                              <i className="demo-icon icon-eye-line"></i>
                            </a>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>

                        <td>Lionel Messi</td>
                        <td>07/24/205</td>
                        <td>11890</td>
                      </tr>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a className="basic-links me-1" href="#">
                              <i className="demo-icon icon-eye-line"></i>
                            </a>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>

                        <td>Lionel Messi</td>
                        <td>07/24/205</td>
                        <td>11890</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Reported Users</h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th className="no-wrap-text">Action</th>
                        <th className="no-wrap-text">Name</th>
                        <th className="no-wrap-text">Total Reports</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </td>

                        <td>Andrew Abbott</td>

                        <td>
                          <a
                            className="basic-links"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#total-reports"
                          >
                            05
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </td>

                        <td>Kem Lo</td>

                        <td>
                          <a
                            className="basic-links"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#total-reports"
                          >
                            05
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </td>

                        <td>Lionel Messi</td>

                        <td>
                          <a
                            className="basic-links"
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#total-reports"
                          >
                            05
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">
                  Recently Prohibited Words Used by Users
                </h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th className="no-wrap-text">User Name</th>
                        <th className="no-wrap-text">
                          No. of Prohibited Words Used
                        </th>
                        <th className="no-wrap-text">Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Andrew Abbott</td>

                        <td>
                          <a className="basic-links" href="#">
                            05
                          </a>
                        </td>

                        <td>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td>Kem Lo</td>

                        <td>
                          <a className="basic-links" href="#">
                            05
                          </a>
                        </td>

                        <td>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td>Lionel Messi</td>

                        <td>
                          <a className="basic-links" href="#">
                            05
                          </a>
                        </td>

                        <td>
                          <select className="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col">
                <h3 className="fw-bold theme-color">Most Liked Posts</h3>
              </div>

              <div className="col-auto">
                <a className="basic-links" href="#">
                  View All
                </a>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th className="no-wrap-text">Action</th>
                        <th className="no-wrap-text">Posted By</th>
                        <th className="no-wrap-text">Total Reports</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a className="basic-links me-1" href="#">
                              <i className="demo-icon icon-eye-line"></i>
                            </a>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>

                        <td>Andrew Abbott</td>

                        <td>
                          <a href="#" className="basic-links">
                            1287
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a className="basic-links me-1" href="#">
                              <i className="demo-icon icon-eye-line"></i>
                            </a>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle2"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle2"
                              ></label>
                            </div>
                          </span>
                        </td>

                        <td>CJ Abrams</td>

                        <td>
                          <a href="#" className="basic-links">
                            890
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a className="basic-links me-1" href="#">
                              <i className="demo-icon icon-eye-line"></i>
                            </a>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle3"
                                defaultChecked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle3"
                              ></label>
                            </div>
                          </span>
                        </td>

                        <td>Lionel Messi</td>

                        <td>
                          <a href="#" className="basic-links">
                            11890
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;

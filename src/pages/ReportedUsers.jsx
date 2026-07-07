import React from "react";

function ReportedUsers() {
  return (
    <>
      <div class="page-heading">
        <div class="row align-items-center gap-3">
          <div class="col-12 col-md">
            <h2 class="page-title">Reported Users</h2>
          </div>
        </div>
      </div>
      <div class="card-section">
        <div class="row">
          <div class="col-xl-12 mt-3 mt-xxl-4">
            <div class="row">
              <div class="col-12">
                <div class="table-responsive">
                  <table class="table">
                    <thead class="table-dark">
                      <tr>
                        <th>User Name</th>
                        <th>Email/Phone Number</th>
                        <th>Reported By</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Andrew Abbott</td>
                        <td>Johndoe@gmail.com</td>
                        <td>
                          <a class="basic-links" href="javascript:void(0);">
                            05
                          </a>
                        </td>
                        <td>
                          <select class="form-select">
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
        </div>
      </div>
    </>
  );
}

export default ReportedUsers;

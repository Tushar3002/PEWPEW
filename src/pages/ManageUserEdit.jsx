import React from 'react'

function ManageUserEdit() {
  return (

               <div className="container-fluid">
                  <div className="tabbar-section">
                     <div className="row">
                        <div className="col-12">
                           <nav aria-label="breadcrumb">
                              <ol className="breadcrumb m-0">
                                 <li className="breadcrumb-item">
                                    <i className="demo-icon icon-down-arrow"></i>
                                 </li>
                                 <li className="breadcrumb-item">
                                    <a href="javascript:void(0);">
                                       <h2>Add/Edit Users</h2>
                                    </a>
                                 </li>
                              </ol>
                           </nav>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-12">
                           <form className="mt-3 mt-xxl-4">
                              <fieldset className="row">
                                 <div className="col-12">
                                    <div className="field d-flex align-items-center gap-3">
                                       <div className="user-image-edit">
                                          <img src="images/user-img.png" className="img-fluid" />
                                          <button className="edit-btn-small"><i className="demo-icon icon-edit-1"></i></button>
                                       </div>
                                       <h3 className="mb-0"><button className="text-btn fw-semibold text-start">Upload a Profile Photo</button></h3>
                                    </div>
                                 </div>
                                 <div className="col-12 mt-2">
                                    <h3 className="fw-bold mt-4">Personal Information</h3>
                                    <hr className="mb-2"/>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="first-name" className="fw-semibold">First Name <span className="danger-color">*</span></label>
                                       <input type="text" name="first-name" className="form-control" required/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="last-name" className="fw-semibold">Last Name <span className="danger-color">*</span></label>
                                       <input type="text" name="last-name" className="form-control" required/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="birthday" className="fw-semibold">Birthday</label>
                                       <input type="date" id="date" name="birthday" className="form-control"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="gender" className="fw-semibold">Gender</label>
                                       <select className="form-select">
                                          <option>Male</option>
                                          <option>Female</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col-12 mt-2">
                                    <h3 className="fw-bold mt-4">Address Details</h3>
                                    <hr className="mb-2"/>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="address" className="fw-semibold">Street Address</label>
                                       <input type="text" name="address" className="form-control"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="city" className="fw-semibold">City</label>
                                       <input type="text" name="city" className="form-control"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="state" className="fw-semibold">State/Province</label>
                                       <select className="form-select">
                                          <option>----</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="postal-code" className="fw-semibold">Postal Code</label>
                                       <input type="text" name="postal-code" className="form-control"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="state" className="fw-semibold">Country</label>
                                       <select className="form-select">
                                          <option>----</option>
                                          <option>Canada</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col-12 mt-2">
                                    <h3 className="fw-bold mt-4">Contact and Additional Details</h3>
                                    <hr className="mb-2"/>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="contact-no" className="fw-semibold">Contact Number <span className="danger-color">*</span></label>
                                       <input type="text" name="contact-no" className="form-control" id="contactNo" maxlength="10"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="email" className="fw-semibold">Email <span className="danger-color">*</span></label>
                                       <div className="field-icon">
                                          <input type="email" name="email" className="form-control" id="email" />
                                          <i className="demo-icon icon-eye-line"></i>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="password" className="fw-semibold">Password <span className="danger-color">*</span></label>
                                       <div className="field-icon">
                                          <input type="password" name="password" className="form-control" id="password" />
                                          <button className="txt-pass">Change</button>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 col-xl-4 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="role" className="fw-semibold">Role</label>
                                       <select className="form-select">
                                          <option>----</option>
                                          <option>Select</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col-12 mt-2">
                                    <h3 className="fw-bold mt-4">Listing</h3>
                                    <hr className="mb-2"/>
                                 </div>
                                 <div className="col-12 mt-3 mt-xxl-4">
                                    <div className="table-responsive">
                                       <table className="table">
                                          <thead className="table-dark">
                                             <tr>
                                                <th>Accesses Privileges</th>
                                                <th>Read</th>
                                                <th>Create</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                             </tr>
                                          </thead>
                                          <tbody>
                                             <tr>
                                                <td>Dashboard</td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>User Management</td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>Roles and Permission</td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>Gun Master</td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>Manage Prohibited Wors</td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" checked/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                             </tr>
                                             <tr>
                                                <td>Support Ticket</td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox"/>
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                                <td>
                                                   <label className="custom-checkbox">
                                                   <input type="checkbox" className="child-checkbox" />
                                                   <span className="checkmark"></span>
                                                   </label>
                                                </td>
                                             </tr>
                                          </tbody>
                                       </table>
                                    </div>
                                 </div>
                                 <div className="col-12 mt-3 mt-xxl-4">
                                    <div className="d-flex flex-wrap justify-content-end gap-3">
                                       <button className="btn main-btn border-btn">Cancel</button>
                                       <button className="btn main-btn w-auto">Save</button>
                                    </div>
                                 </div>
                              </fieldset>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>

  )
}

export default ManageUserEdit
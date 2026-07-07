import React from 'react'

import profileImage from '../assets/images/user-img.png'
import badge1 from '../assets/images/badge-1.svg'
import badge2 from '../assets/images/badge-2.svg'
import badge3 from '../assets/images/badge-3.svg'
import badge4 from '../assets/images/badge-4.svg'

function ManageEndUser() {
  return (
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
                                       <h2>View End Users</h2>
                                    </a>
                                 </li>
                              </ol>
                           </nav>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-md-5 col-lg-4 mt-3 mt-xxl-4">
                           <div className="border-contents">
                              <div className="row align-items-end gap-1">
                                 <div className="col">
                                    <div className="user-image-edit small-profile">
                                       <img src={profileImage} className="img-fluid"/>
                                    </div>
                                    <p className="fw-semibold dark-color mt-2 mb-0 d-flex align-items-center gap-1 text-nowrap">John Doe <i className="demo-icon icon-verified"></i></p>
                                    <p className="fw-medium mb-0 text-nowrap">Check-Ins 02</p>
                                 </div>
                                 <div className="col-auto">
                                    <p className="fw-medium mb-0">Private Account</p>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-12">
                                    <ul className="separater-list ps-0 d-flex flex-wrap mt-3">
                                       <li>
                                          <p className="dark-color fw-semibold large mb-0">76</p>
                                          <p className="mb-0">Post</p>
                                       </li>
                                       <li>
                                          <p className="dark-color fw-semibold large mb-0">20.6k</p>
                                          <p className="mb-0">Followers</p>
                                       </li>
                                       <li>
                                          <p className="dark-color fw-semibold large mb-0">30</p>
                                          <p className="mb-0">Following</p>
                                       </li>
                                    </ul>
                                    <p className="mt-3"><span className="dark-color fw-semibold">Home Ranges:</span> Lorem ipsum dolor sit ametcon sit ametcon</p>
                                    <p className="mt-3"><span className="dark-color fw-semibold">Favorite Pew:</span> Blackout 300</p>
                                    <p className="mt-3"><span className="dark-color fw-semibold">About/Description:</span><br/> I am very gun passionate person</p>
                                 </div>
                                 <div className="col-12">
                                    <ul className="d-flex justify-content-between align-items-center">
                                       <li>
                                          <p className="large dark-color fw-semibold">Badges Earned</p>
                                       </li>
                                       <li>
                                          <p><a href="#" className="basic-links grey-links">View All</a></p>
                                       </li>
                                    </ul>
                                    <ul className="d-flex flex-wrap gap-2 badge-small justify-content-between align-items-center">
                                       <li>
                                          <img src={badge1} className="img-fluid" alt="badge-1" />
                                       </li>
                                       <li>
                                          <img src={badge2} className="img-fluid" alt="badge-2" />
                                       </li>
                                       <li>
                                          <img src={badge3} className="img-fluid" alt="badge-3" />
                                       </li>
                                       <li>
                                          <img src={badge4} className="img-fluid" alt="badge-4" />
                                       </li>
                                       <li>
                                          <img src={badge2} className="img-fluid" alt="badge-5" />
                                       </li>
                                       <li>
                                          <img src={badge3} className="img-fluid" alt="badge-6" />
                                       </li>
                                       <li>
                                          <img src={badge1} className="img-fluid" alt="badge-7" />
                                       </li>
                                       <li>
                                          <img src={badge4} className="img-fluid" alt="badge-8" />
                                       </li>
                                       <li>
                                          <img src={badge3} className="img-fluid" alt="badge-9" />
                                       </li>
                                       <li>
                                          <img src={badge3} className="img-fluid" alt="badge-10" />
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="col-md-7 col-lg-8 mt-3 mt-xxl-4">
                           <form action="#">
                              <fieldset className="row">
                                 <div className="col-12">
                                    <h3 className="fw-bold">User Details</h3>
                                    <hr className="mb-2"/>
                                 </div>
                                 <div className="col-sm-6 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="first-name" className="fw-semibold">First Name <span className="danger-color">*</span></label>
                                       <input type="text" name="first-name" className="form-control" value="Christopher" required=""/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="last-name" className="fw-semibold">Last Name <span className="danger-color">*</span></label>
                                       <input type="text" name="last-name" className="form-control" value="Nolan" required=""/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="birthday" className="fw-semibold">Birthday</label>
                                       <input type="date" id="date" name="birthday" className="form-control"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="gender" className="fw-semibold">Gender</label>
                                       <select className="form-select">
                                          <option>Male</option>
                                          <option>Female</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="email" className="fw-semibold">Email <span className="danger-color">*</span></label>
                                       <input type="email" name="email" className="form-control" value="Christophernolan25@gmail.com" id="email"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6 mt-3">
                                    <div className="form-group">
                                       <label htmlFor="contact-no" className="fw-semibold">Contact Number <span className="danger-color">*</span></label>
                                       <input type="text" name="contact-no" className="form-control" value="+1 9825968357" id="contactNo" maxlength="10"/>
                                    </div>
                                 </div>
                                 <div className="col-sm-6">/
                                    <div className="form-group mt-3">
                                       <label className="fw-semibold">Preferences <span className="danger-color">*</span></label>
                                       <input type="text" className="form-control" value="Firearm, Ammunition" id="contactNo"/>
                                    </div>
                                    <div className="form-group mt-3">
                                       <label htmlFor="password" className="fw-semibold">Password <span className="danger-color">*</span></label>
                                       <div className="field-icon">
                                          <input type="password" name="password" className="form-control" id="password"/>
                                          <button className="txt-pass">Change</button>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-sm-6">
                                    <div className="form-group file-input mt-3">
                                       <label className="fw-semibold">Uploaded Documents</label>
                                       <div className="form-control">
                                          {/* <!-- Hidden file input --> */}
                                          <input type="file" className="d-none" id="fileInput" multiple />
                                          {/* <!-- Clickable label to trigger file input --> */}
                                          <label htmlFor="fileInput" className="mb-0" id="chooseLabel">Choose Files</label>
                                          {/* <!-- Count display (hidden until files selected) --> */}
                                          <input type="text" id="fileCount" className="form-control simple-text d-none mt-2" readonly value="No files selected" />
                                          {/* <!-- File names list --> */}
                                          <ul id="fileList" className="list-unstyled mb-2"></ul>
                                       </div>
                                    </div>
                                 </div>
                              </fieldset>
                           </form>
                        </div>


                     </div>
                     <div className="tabbar-section mt-4 mt-xxl-5">
                        <div className="row">
                           <div className="col-12">
                              {/* <!-- Tab Nav (desktop only) --> */}
                              <ul className="nav nav-tabs" id="myTab" role="tablist">
                                 <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-one-tab" data-bs-toggle="tab" data-bs-target="#nav-one-tab-pane" type="button" role="tab" aria-controls="nav-one-tab-pane" aria-selected="true">Upload Gun</button>
                                 </li>
                                 <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-two-tab" data-bs-toggle="tab" data-bs-target="#nav-two-tab-pane" type="button" role="tab" aria-controls="nav-two-tab-pane" aria-selected="false">Venues</button>
                                 </li>
                                 <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="nav-three-tab" data-bs-toggle="tab" data-bs-target="#nav-three-tab-pane" type="button" role="tab" aria-controls="nav-three-tab-pane" aria-selected="true">Events</button>
                                 </li>
                                 <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-four-tab" data-bs-toggle="tab" data-bs-target="#nav-four-tab-pane" type="button" role="tab" aria-controls="nav-four-tab-pane" aria-selected="false">Activities</button>
                                 </li>
                              </ul>
                              {/* <!-- Shared Content: Tab + Accordion --> */}
                              <div className="tab-content accordion" id="myTabContent">
                                 <div className="tab-pane fade accordion-item" id="nav-one-tab-pane" role="tabpanel" aria-labelledby="nav-one-tab" tabindex="0">
                                    <h2 className="accordion-header d-lg-none" id="headingOne">
                                       <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Upload Gun</button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show d-lg-block" aria-labelledby="headingOne" data-bs-parent="#myTabContent">
                                       <div className="accordion-body mt-3 mt-xxl-4">
                                          <div className="row">
                                             <div className="col-12">
                                                <div className="table-responsive">
                                                   <table className="table">
                                                      <thead className="table-dark">
                                                         <tr>
                                                            <th>Action</th>
                                                            <th>Host Name</th>
                                                            <th>Event Name</th>
                                                            <th>Date & Time</th>
                                                            <th>Address</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Andrew Abbott</td>
                                                            <td>Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
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
                                 <div className="tab-pane fade accordion-item" id="nav-two-tab-pane" role="tabpanel" aria-labelledby="nav-two-tab" tabindex="0">
                                    <h2 className="accordion-header d-lg-none" id="headingTwo">
                                       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Venues</button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse d-lg-block" aria-labelledby="headingTwo" data-bs-parent="#myTabContent">
                                       <div className="accordion-body mt-3 mt-xxl-4">
                                          <div className="row">
                                             <div className="col-12">
                                                <div className="table-responsive">
                                                   <table className="table">
                                                      <thead className="table-dark">
                                                         <tr>
                                                            <th>Action</th>
                                                            <th>Host Name</th>
                                                            <th>Event Name</th>
                                                            <th>Date & Time</th>
                                                            <th>Address</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Andrew Abbott</td>
                                                            <td>Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
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
                                 <div className="tab-pane fade show active accordion-item" id="nav-three-tab-pane" role="tabpanel" aria-labelledby="nav-three-tab" tabindex="0">
                                    <h2 className="accordion-header d-lg-none" id="headingThree">
                                       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">Events</button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse d-lg-block" aria-labelledby="headingThree" data-bs-parent="#myTabContent">
                                       <div className="accordion-body mt-3 mt-xxl-4">
                                          <div className="row">
                                             <div className="col-12">
                                                <div className="table-responsive">
                                                   <table className="table">
                                                      <thead className="table-dark">
                                                         <tr>
                                                            <th>Action</th>
                                                            <th>Host Name</th>
                                                            <th>Event Name</th>
                                                            <th>Date & Time</th>
                                                            <th>Address</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Andrew Abbott</td>
                                                            <td>Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
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
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="tab-pane fade accordion-item" id="nav-four-tab-pane" role="tabpanel" aria-labelledby="nav-four-tab" tabindex="0">
                                    <h2 className="accordion-header d-lg-none" id="headingFour">
                                       <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">Activities</button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse d-lg-block" aria-labelledby="headingFour" data-bs-parent="#myTabContent">
                                       <div className="accordion-body mt-3 mt-xxl-4">
                                          <div className="row">
                                             <div className="col-12">
                                                <div className="table-responsive">
                                                   <table className="table">
                                                      <thead className="table-dark">
                                                         <tr>
                                                            <th>Action</th>
                                                            <th>Host Name</th>
                                                            <th>Event Name</th>
                                                            <th>Date & Time</th>
                                                            <th>Address</th>
                                                         </tr>
                                                      </thead>
                                                      <tbody>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Andrew Abbott</td>
                                                            <td>Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Tom Curran</td>
                                                            <td>GO Up meeting</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
                                                            </td>
                                                         </tr>
                                                         <tr>
                                                            <td>
                                                               <span className="d-flex gap-2 align-items-center">
                                                               <a className="small-square-btn edit-btn" href="javascript:void(0);"><i className="demo-icon icon-eye-line"></i></a>
                                                               <a className="small-square-btn danger-btn" href="javascript:void(0);"><i className="demo-icon icon-delete-1"></i></a> 
                                                               </span>
                                                            </td>
                                                            <td>Christopher Nolan</td>
                                                            <td>Gun Meet Ups</td>
                                                            <td>
                                                               <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            </td>
                                                            <td>
                                                               <p className="mb-0">Gun Club Association Member Meeting, Buriel club co. Ashville, NC</p>
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
                              </div>
                           </div>
                        </div>
                     </div>
                     </div>
  )
}

export default ManageEndUser
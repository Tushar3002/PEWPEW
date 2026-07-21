import React from 'react'

function Events() {
  return (
    <>
        <div className="tabbar-section">
                     <div className="row">
                        <div className="col-12">
                           {/* <!-- Tab Nav (desktop only) --> */}
                           <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item" role="presentation">
                                 <button className="nav-link active" id="nav-one-tab" data-bs-toggle="tab" data-bs-target="#nav-one-tab-pane" type="button" role="tab" aria-controls="nav-one-tab-pane" aria-selected="true">Upcoming Events</button>
                              </li>
                              <li className="nav-item" role="presentation">
                                 <button className="nav-link" id="nav-two-tab" data-bs-toggle="tab" data-bs-target="#nav-two-tab-pane" type="button" role="tab" aria-controls="nav-two-tab-pane" aria-selected="false">Passed Events</button>
                              </li>
                           </ul>
                           {/* <!-- Shared Content: Tab + Accordion --> */}
                           <div className="tab-content accordion" id="myTabContent">
                              <div className="tab-pane fade show active accordion-item" id="nav-one-tab-pane" role="tabpanel" aria-labelledby="nav-one-tab" tabindex="0">
                                 <h2 className="accordion-header d-lg-none" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Upcoming Events</button>
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
                                                         <th>Host Name/Venue Name</th>
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
                                                         <td>Suite Park</td>
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
                                                         <td>Vanguard Shooting Park</td>
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
                                                         <td>Pistol Range</td>
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
                                                         <td>Pistol Range</td>
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
                                                         <td>Falcon Ridge Shooting Park</td>
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
                                                         <td>Clay Target Center</td>
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
                                                         <td>Falcon Ridge Shooting Park</td>
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
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Passed Events</button>
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
                                                         <th>Host Name/Venue Name</th>
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
                                                         <td>Suite Park</td>
                                                         <td>Meet Ups</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
                                                         <td>Vanguard Shooting Park</td>
                                                         <td>GO Up meeting</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
                                                         <td>Clay Target Center</td>
                                                         <td>Gun Meet Ups</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
                                                         <td>Pistol Range</td>
                                                         <td>GO Up meeting</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
                                                         <td>Falcon Ridge Shooting Park</td>
                                                         <td>Gun Meet Ups</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
                                                         <td>Clay Target Center</td>
                                                         <td>GO Up meeting</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
                                                         <td>Falcon Ridge Shooting Park</td>
                                                         <td>Gun Meet Ups</td>
                                                         <td>
                                                            <p className="mb-0">Monday, 17 May 2024 3:30 am- 6:30 am</p>
                                                            <p className="mb-0">This Event has ended</p>
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
    </>
  )
}

export default Events
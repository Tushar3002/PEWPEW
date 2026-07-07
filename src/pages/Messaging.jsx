import React, { useState } from "react";
import CreateChatModal from "../components/CreateChatModal";

function Messaging() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <section className="message-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="chat-area">
                {/* <!-- chatlist --> */}
                <div className="chatlist">
                  <div className="modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="chat-header d-flex align-items-center justify-content-between">
                        <span className="d-flex align-items-center justify-content-between w-100">
                          <div>
                            <h3>Messages</h3>
                            <p className="mb-0">Admin</p>
                          </div>
                          <div className="d-flex gap-3">
                            <button
                              className="add"
                              onClick={() => setShowModal(true)}
                            >
                              <i className="demo-icon icon-plus"></i>
                            </button>
                            <button
                              className="button-tranparent"
                              type="button"
                              id="dropdownMenuButton"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <img src="images/icons/triple-dots-v.svg" />
                            </button>
                          </div>
                        </span>
                      </div>
                      <div className="msg-search">
                        <input
                          type="text"
                          className="form-control"
                          id="inlineFormInputGroup"
                          placeholder="Search"
                          aria-label="search"
                        />
                      </div>
                      <div className="modal-body">
                        {/* <!-- chat-list --> */}
                        <div className="chat-lists">
                          {/* <!-- chat-list --> */}
                          <div className="chat-list">
                            <ul>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center current"
                                >
                                  <div className="flex-shrink-0 position-relative">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                    <span className="active"></span>
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">1m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center current"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">4+ Messages</p>
                                    <span className="chat-time">10m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="d-flex align-items-center"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      className="img-fluid"
                                      src="images/profile-img.png"
                                      alt="user img"
                                    />
                                  </div>
                                  <div className="ms-3">
                                    <h3>
                                      John Doe{" "}
                                      <i className="demo-icon icon-verified"></i>
                                    </h3>
                                    <p className="fw-semibold">
                                      Please check the above document.
                                    </p>
                                    <span className="chat-time">50m</span>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <!-- chat-list --> */}
                        </div>
                        {/* <!-- chat-list --> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- chatlist -->
                              <!-- chatbox --> */}
                <div className="chatbox">
                  <div className="modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="msg-head">
                        <div className="row g-2 g-sm-3">
                          <div className="col">
                            <div className="d-flex align-items-center">
                              <span className="chat-icon">
                                <i className="demo-icon icon-left-arrow"></i>
                              </span>
                              <div className="flex-shrink-0">
                                <img
                                  className="img-fluid"
                                  src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                  alt="user img"
                                />
                              </div>
                              <div className="flex-grow-1 ms-2 ms-sm-3">
                                <h3 className="text-nowrap">
                                  John Doe{" "}
                                  <i className="demo-icon icon-verified"></i>
                                </h3>
                                <p className="mb-0 position-relative d-flex align-items-center gap-1">
                                  <span className="active"></span> Online
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto d-flex align-items-center justify-content-end">
                            {/* <!-- Dropdown --> */}
                            <div className="dropdown">
                              <button
                                className="button-tranparent"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <img src="images/icons/triple-dots-h.svg" />
                              </button>
                              {/* <!-- <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                      <li><a className="dropdown-item" href="#">Action</a></li>
                                                      <li><a className="dropdown-item" href="#">Another action</a></li>
                                                      <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                      </ul> --> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-body">
                        <div className="msg-body">
                          <ul>
                            <li className="sender">
                              <p> Hey, Are you there? </p>
                              <span className="time">10:06 AM</span>
                            </li>
                            <li className="repaly">
                              <p>How are you?</p>
                              <span className="time">10:35 AM</span>
                            </li>
                            <li>
                              <div className="divider">
                                <h6>New Message</h6>
                              </div>
                            </li>
                            <li className="repaly">
                              <p> yes, tell me</p>
                              <span className="time">10:36 AM</span>
                            </li>
                            <li className="repaly">
                              <p>yes... on it</p>
                              <span className="time">Just Now</span>
                            </li>
                            <li className="sender">
                              <p> Hey, Are you there? </p>
                              <span className="time">10:16 AM</span>
                            </li>
                            <li className="repaly">
                              <p>yes!</p>
                              <span className="time">10:20 AM</span>
                            </li>
                            <li className="sender">
                              <p> Hey, Are you there? </p>
                              <span className="time">10:26 AM</span>
                            </li>
                            <li className="sender">
                              <p> Hey, Are you there? </p>
                              <span className="time">10:32 AM</span>
                            </li>
                            <li className="repaly">
                              <p>How are you?</p>
                              <span className="time">10:35 AM</span>
                            </li>
                            <li>
                              <div className="divider">
                                <h6>New Message</h6>
                              </div>
                            </li>
                            <li className="repaly">
                              <p> yes, tell me</p>
                              <span className="time">10:36 AM</span>
                            </li>
                            <li className="repaly">
                              <p>yes... on it</p>
                              <span className="time">Just Now</span>
                            </li>
                            <li className="repaly">
                              <p>How are you?</p>
                              <span className="time">10:35 AM</span>
                            </li>
                            <li>
                              <div className="divider">
                                <h6>New Message</h6>
                              </div>
                            </li>
                            <li className="repaly">
                              <p> yes, tell me</p>
                              <span className="time">10:36 AM</span>
                            </li>
                            <li className="repaly">
                              <p>yes... on it</p>
                              <span className="time">Just Now</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="send-box d-flex gap-2">
                        <button className="button-tranparent">
                          <i className="demo-icon icon-plus"></i>
                        </button>
                        <form action="" className="w-100">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="message…"
                            placeholder="Write message…"
                          />
                          <button
                            type="button"
                            className="btn main-btn w-auto border-btn"
                          >
                            <i
                              className="fa fa-paper-plane"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- chatbox --> */}
            </div>
          </div>
        </div>
      </section>
      {showModal && <CreateChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Messaging;

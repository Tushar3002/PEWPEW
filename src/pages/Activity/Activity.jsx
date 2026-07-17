import React from "react";
// import image1 from '../assets/images/gallery-1.png'

function Activity() {
  return (
    <>
      <div className="page-heading">
        <div className="row align-items-center gap-2">
          <div className="col">
            <h2 className="page-title">Posts</h2>
          </div>
          <div className="col-auto">
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
        </div>
      </div>
      <div className="card-section">
        <div className="row">
          <div className="col-xl-12 mt-3 mt-xxl-4">
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table">
                    <thead className="table-dark">
                      <tr>
                        <th>Actions</th>
                        <th>Uploaded By</th>
                        <th>Uploaded Date</th>
                        <th>Images / Video</th>
                        <th>Post Type</th>
                        <th>Text</th>
                        <th>Ratings</th>
                        <th>Review</th>
                        <th>Likes</th>
                        <th>Comments</th>
                        <th>Share</th>
                        <th>Hide Count</th>
                        <th>Reported</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a
                              className="basic-links me-1"
                              href="javascript:void(0);"
                            >
                              <i className="demo-icon icon-eye-line"></i>
                            </a>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>
                        <td>Tom Curran</td>
                        <td>07/24/205</td>
                        <td align="center">
                          <span className="d-flex gap-2 justify-content-center">
                            <img
                              src={image1}
                              className="post-img"
                              alt="gallery-1"
                            />
                            <img
                              src={image1}
                              className="post-img"
                              alt="gallery-1"
                            />
                          </span>
                        </td>
                        <td>Ammunition</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>4.2</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            250
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a
                              className="basic-links me-1"
                              href="javascript:void(0);"
                            >
                              <i className="demo-icon icon-eye-line"></i>
                            </a>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>
                        <td>Tom Curran</td>
                        <td>07/24/205</td>
                        <td align="center">
                          <span className="d-flex gap-2 justify-content-center">
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                          </span>
                        </td>
                        <td>Ammunition</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>4.2</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            250
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a
                              className="basic-links me-1"
                              href="javascript:void(0);"
                            >
                              <i className="demo-icon icon-eye-line"></i>
                            </a>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>
                        <td>Tom Curran</td>
                        <td>07/24/205</td>
                        <td align="center">
                          <span className="d-flex gap-2 justify-content-center">
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                          </span>
                        </td>
                        <td>Ammunition</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>4.2</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            250
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a
                              className="basic-links me-1"
                              href="javascript:void(0);"
                            >
                              <i className="demo-icon icon-eye-line"></i>
                            </a>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>
                        <td>Tom Curran</td>
                        <td>07/24/205</td>
                        <td align="center">
                          <span className="d-flex gap-2 justify-content-center">
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                          </span>
                        </td>
                        <td>Ammunition</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>4.2</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            250
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="d-flex gap-2 align-items-center">
                            <a
                              className="basic-links me-1"
                              href="javascript:void(0);"
                            >
                              <i className="demo-icon icon-eye-line"></i>
                            </a>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="toggle1"
                                checked
                              />
                              <label
                                className="form-check-label"
                                htmlFor="toggle1"
                              ></label>
                            </div>
                          </span>
                        </td>
                        <td>Tom Curran</td>
                        <td>07/24/205</td>
                        <td align="center">
                          <span className="d-flex gap-2 justify-content-center">
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                            <img
                              src="images/gallery-1.png"
                              className="post-img"
                              alt="gallery-1"
                            />
                          </span>
                        </td>
                        <td>Ammunition</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>4.2</td>
                        <td>
                          <p className="content-viewmore mb-0">
                            Lorem ipsum dolor sit amet, consectetur amet lorem
                            ipsum dolor sit amet, consectetur amet{" "}
                          </p>
                          <a
                            href="javascript:void(0);"
                            className="basic-links view-toggle"
                          >
                            View
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            1287
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            250
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
                            05
                          </a>
                        </td>
                        <td>
                          <a href="javascript:void(0);" className="basic-links">
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
        </div>
      </div>
    </>
  );
}

export default Activity;

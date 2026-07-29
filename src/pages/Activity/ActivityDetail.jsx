import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVenueActivities } from "../../api/EndUsers/endUserViewApi";
import ActivityComments from "../../components/Activity/ActivityComments";
import ActivityShares from "../../components/Activity/ActivityShares";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";

function ActivityDetail() {
  const { id } = useParams();

  const [activityData, setActivityData] = useState(null);
  const [selectedAttachment, setSelectedAttachment] = useState(0);

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!id) return;

    getVenueActivityData();
  }, [id]);

  const getVenueActivityData = async () => {
    try {
      console.log(id);

      const res = await getVenueActivities(id);
      setActivityData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  if (!activityData) return null;
  return (
    <div className="container-fluid">
      <Breadcrumbs
            items={[
              {
                id: "activity",
                text: "Activity",
                path: "/activity",
              },
              {
                id: "activity-details",
                text: "Activity Details",
              },
            ]}
          />
      <div className="row g-4 align-items-stretch">
        
        <div className="col-12 col-lg-5">
          
          <div className="border rounded p-3 h-100">
            {activityData.attachments?.length > 0 ? (
              <>
                <div className="mb-3">
                  {isVideo(
                    activityData.attachments[selectedAttachment].fullURL,
                  ) ? (
                    <video
                      controls
                      className="w-100 rounded"
                      style={{
                        height: "350px",
                        objectFit: "contain",
                        background: "#000",
                      }}
                    >
                      <source
                        src={
                          activityData.attachments[selectedAttachment].fullURL
                        }
                      />
                    </video>
                  ) : (
                    <img
                      src={activityData.attachments[selectedAttachment].fullURL}
                      alt={
                        activityData.attachments[selectedAttachment]
                          .attachmentName
                      }
                      className="w-100 rounded"
                      style={{
                        height: "350px",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                <div className="d-flex gap-2 flex-wrap w-100">
                  {activityData.attachments.map((attachment, index) => (
                    <div
                      key={attachment.attachmentName}
                      onClick={() => setSelectedAttachment(index)}
                      style={{
                        width: "calc(33.333% - 6px)",
                        height: "125px",
                        cursor: "pointer",
                        overflow: "hidden",
                      }}
                    >
                      {isVideo(attachment.fullURL) ? (
                        <video
                          src={attachment.fullURL}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            pointerEvents: "none",
                          }}
                        />
                      ) : (
                        <img
                          src={attachment.fullURL}
                          alt={attachment.attachmentName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="mb-0">No attachments available.</p>
            )}
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="border rounded p-4 h-100">
            <div className="row align-items-center mb-2">
              <div className="col-4">
                <span className="fw-bold fs-5 text-dark">Username:</span>
              </div>
              <div className="col-8">
                <span className="fs-5">{activityData.userName || "-"}</span>
              </div>
            </div>

            <div className="row align-items-center mb-2">
              <div className="col-4">
                <span className="fw-bold fs-5 text-dark">Created On:</span>
              </div>
              <div className="col-8">
                <span className="fs-5">
                  {activityData.createdOn
                    ? new Date(activityData.createdOn).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>

            <div className="row align-items-center mb-2">
              <div className="col-4">
                <span className="fw-bold fs-5 text-dark">Ratings :</span>
              </div>
              <div className="col-8">
                <span className="fs-5">{activityData.rate ?? "-"}</span>
              </div>
            </div>

            <div className="row align-items-center mb-2">
              <div className="col-4">
                <span className="fw-bold fs-5 text-dark">
                  Post Description:
                </span>
              </div>
              <div className="col-8">
                <span className="fs-5">{activityData.post || "-"}</span>
              </div>
            </div>
            {activityData.venueName && (
              <div className="row align-items-center mb-2">
                <div className="col-4">
                  <span className="fw-bold fs-5 text-dark">Venue Name:</span>
                </div>
                <div className="col-8">
                  <span className="fs-5">{activityData.venueName || "-"}</span>
                </div>
              </div>
            )}
            {activityData.venueLocation && (
              <div className="row align-items-center mb-2">
                <div className="col-4">
                  <span className="fw-bold fs-5 text-dark">
                    Venue Address :
                  </span>
                </div>
                <div className="col-8">
                  <span className="fs-5">
                    {activityData.venueLocation || "-"}
                  </span>
                </div>
              </div>
            )}
            {activityData.venueOwner && (
              <div className="row align-items-center mb-2">
                <div className="col-4">
                  <span className="fw-bold fs-5 text-dark">
                    Venue Owner Name :
                  </span>
                </div>
                <div className="col-8">
                  <span className="fs-5">{activityData.venueOwner || "-"}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-6 col-xl-5 mt-3 mt-xxl-4">
          <div className="row g-2 g-md-3">
            {activityData.totalComment > 0 && (
              <div className="col-sm-6">
                <div
                  className="border-contents aspect-icon-column d-flex blue-column align-items-center gap-3 justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveSection("comments")}
                >
                  <i className="demo-icon icon-comments large-icon"></i>

                  <span>
                    <h2 className="mb-1">{activityData.totalComment || 0}</h2>
                    <h3 className="mb-0">Comments</h3>
                  </span>
                </div>
              </div>
            )}

            {activityData.totalShare > 0 && (
              <div className="col-sm-6">
                <div
                  className="border-contents aspect-icon-column d-flex blue-column align-items-center gap-3 justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveSection("shares")}
                >
                  <i className="demo-icon icon-share-1 large-icon"></i>

                  <span>
                    <h2 className="mb-1">{activityData.totalShare || 0}</h2>
                    <h3 className="mb-0">Shares</h3>
                  </span>
                </div>
              </div>
            )}

            {activityData.totalLike > 0 && (
              <div className="col-sm-6">
                <div
                  className="border-contents aspect-icon-column d-flex blue-column align-items-center gap-3 justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveSection("likes")}
                >
                  <i className="demo-icon icon-likes large-icon "></i>

                  <span>
                    <h2 className="mb-1">{activityData.totalLike || 0}</h2>
                    <h3 className="mb-0">Likes</h3>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-12 col-lg-6 col-xl-7 mt-3 mt-xxl-4">
          {activeSection === "comments" && <ActivityComments postId={id} />}

          {activeSection === "shares" && (
            <ActivityShares postId={id} type={3} />
          )}

          {activeSection === "likes" && <ActivityShares postId={id} type={1} />}
        </div>
      </div>
    </div>
  );
}

export default ActivityDetail;

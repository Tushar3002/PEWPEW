import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventDetail } from "../../api/Events/eventApi";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { decryptUrlParam } from "../../utils/crypto";

function EventsDetail() {
  const [data, setData] = useState("");
  const { id } = useParams();
  const eventId=decryptUrlParam(id)
  useEffect(() => {
    getEventDatabyId();
  }, []);
  const getEventDatabyId = async () => {
    try {
      const res = await getEventDetail(eventId);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error.resonse);
    }
  };

  const handleOpenLocation = () => {
    if (!data.latitude || !data.longitude) return;

    const mapUrl = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

    window.open(mapUrl, "_blank", "noopener,noreferrer");
  };

  const isEventEnded = data?.endTime
    ? new Date(`${data.endTime}Z`) < new Date()
    : false;
  return (
    <div className="container-fluid">
      <Breadcrumbs
        items={[
          {
            id: "events",
            text: "Events",
            path: "/events",
          },
          {
            id: "event-details",
            text: "Event Details",
          },
        ]}
      />
      <div className=" p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-4">
            <div
              className="position-relative rounded overflow-hidden"
              style={{
                height: "220px",
              }}
            >
              <img
                src={data.eventImagePath}
                alt={data.eventName}
                className="w-100 h-100"
                style={{
                  objectFit: "cover",
                  filter: isEventEnded ? "brightness(45%)" : "none",
                }}
              />
            </div>

            {isEventEnded && (
              <div className="text-center mt-2 fw-semibold">
                This Event has ended
              </div>
            )}
          </div>

          <div className="col-12 col-md-8">
            <div className="mb-2">
              <span className="border rounded px-2 py-1 ">
                {data.venueTypeName || "-"}
              </span>
            </div>

            <h3 className="mb-3">{data.eventName || "-"}</h3>

            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="demo-icon icon-calender-heart"></span>

              <div className="d-flex align-items-center flex-wrap gap-2">
                <span>
                  {data.eventDate
                    ? new Date(`${data.eventDate}Z`).toLocaleDateString(
                        "en-GB",
                        {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )
                    : "-"}
                </span>

                <span>▪</span>

                <span>
                  {data.startTime
                    ? new Date(`${data.startTime}Z`).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        },
                      )
                    : "-"}

                  {" - "}

                  {data.endTime
                    ? new Date(`${data.endTime}Z`).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "-"}
                </span>
              </div>
            </div>

            {/* Venue + Address */}
            <div className="d-flex align-items-start gap-2">
              {/* Fixed icon space */}
              <span
                className="demo-icon icon-location-3 "
                style={{
                  width: "20px",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              ></span>

              {/* Venue Information */}
              <div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold">{data.venueName || "-"}</span>

                  {data.latitude && data.longitude && (
                    <span
                      onClick={handleOpenLocation}
                      title="View Location"
                      style={{ cursor: "pointer", color:"blue" }}

                    >
                      <i className="demo-icon icon-share"></i>
                    </span>
                  )}
                </div>

                <div className="mt-1">
                  <span>{data.address || "-"}</span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center mt-3">
              <div className="text-center px-3 ps-0">
                <div className="fw-semibold">{data.goingCount ?? 0}</div>
                <div className="small">Going</div>
              </div>

              <div
                style={{
                  width: "1px",
                  height: "38px",
                  backgroundColor: "#dee2e6",
                }}
              />

              <div className="text-center px-3">
                <div className="fw-semibold">{data.interetedCount ?? 0}</div>
                <div className="small">Interested</div>
              </div>

              <div
                style={{
                  width: "1px",
                  height: "38px",
                  backgroundColor: "#dee2e6",
                }}
              />

              <div className="text-center px-3">
                <div className="fw-semibold">
                  {data.notInterestedCount ?? 0}
                </div>
                <div className="small">Not Interested</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mb-4">
        <h3 className="mb-3">Details</h3>

        <input
          type="text"
          className="form-control"
          value={data.details || ""}
          readOnly
        />
      </div>

      {/* Hosts */}
      <div>
        <h3 className="mb-3">Hosts</h3>

        <div className="border rounded p-3">
          <div className="row g-3 align-items-center">
            {/* Host Image - Left */}
            <div className="col-3 col-md-2">
              <img
                src={data.eventVenuePath}
                alt={data.venueName}
                className="rounded"
                style={{
                  height: "90px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Host Content - Right */}
            <div className="col-9 col-md-10">
              <h5 className="mb-1">{data.venueName || "-"}</h5>

              <div>{data.address || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsDetail;

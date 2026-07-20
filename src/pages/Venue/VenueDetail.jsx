import React, { useEffect, useState } from "react";
import {
  getActivitiesinVenue,
  getVenueById,
  getVenueGunDetails,
} from "../../api/EndUsers/endUserViewApi";
import { useParams } from "react-router-dom";
import GunModal from "../../components/Modal/GunModal";

function VenueDetail() {
  const [data, setData] = useState("");
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [showGunModal, setShowGunModal] = useState(false);
  const [gunData, setGunData] = useState([]);
  const { id } = useParams();
  const isVideo = (url) => /\.(mp4|webm|mov)$/i.test(url);

  const tabs = [
 
    
    { id: "activities", label: "Activities" },
    { id: "events", label: "Events" },
  ];

  useEffect(() => {
    getVenueByIdData();
    getActivitiesData();
  }, []);

  const getVenueByIdData = async () => {
    try {
      const res = await getVenueById(id);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getActivitiesData = async () => {
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      venueId: id,
      search: "",
    };
    console.log("Activities body:", body);
    try {
      const res = await getActivitiesinVenue(body);
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleGunClick = async (venueId) => {
    try {
      const res = await getVenueGunDetails(venueId);
      console.log(res.data);
      setGunData(res.data);
      setShowGunModal(true);
    } catch (error) {
      console.error(error?.response);
    }
  };

  return (
    <div className="container-fluid py-4">
      {/* Page Heading */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <h3 className="mb-0 fw-bold">Check-In Posts/Activities:</h3>
        <span className="fs-4">{data.totalPost || 0}</span>
      </div>

      {/* Venue Container */}
      <div className="border rounded p-4">
        {/* Venue Header */}
        <div className="row g-4 align-items-center mb-4">
          {/* Venue Image */}
          <div className="col-12 col-md-4">
            <img
              src={data.imageFullPath}
              alt={data.venueName}
              className="w-100 rounded"
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Venue Name & Description */}
          <div className="col-12 col-md-8">
            <h3 className="fw-bold mb-3">{data.venueName || "-"}</h3>

            <p className="mb-0">{data.description || "-"}</p>
          </div>
        </div>

        <hr />

        <div className="row g-4 mt-1">
          {/* My Gun */}
          <div className="col-12 col-lg-6">
            <div className="border rounded p-3 h-100">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fw-bold mb-0">My Gun</h4>

                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={() => handleGunClick(id)}
                >
                  View All
                </button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="col-12 col-lg-6">
            <div className="border rounded p-3 h-100">
              <h4 className="fw-bold mb-3">Details</h4>

              {/* Website */}
              <div className="mb-3">
                <span className="fw-semibold">Website:</span>{" "}
                {data.website || "-"}
              </div>

              {/* Phone */}
              <div className="mb-3">
                <span className="fw-semibold">Phone:</span>{" "}
                {data.phone ? `(${data.countryCode}) ${data.phone}` : "-"}
              </div>

              {/* Address */}
              <div>
                <span className="fw-semibold">Address:</span>{" "}
                {data.address || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Attachments */}
        {data.venueActivityAttachements?.length > 0 && (
          <div className="mt-4">
            <h4 className="fw-bold mb-3">Photos/Videos</h4>

            <div className="d-flex flex-wrap gap-3">
              {data.venueActivityAttachements.map((attachment, index) => {
                const fullUrl = data.venueContainer + attachment;

                return isVideo(attachment) ? (
                  <video
                    key={index}
                    controls
                    className="rounded"
                    style={{
                      width: "150px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  >
                    <source src={fullUrl} />
                  </video>
                ) : (
                  <img
                    key={index}
                    src={fullUrl}
                    alt={`Activity ${index + 1}`}
                    className="rounded"
                    style={{
                      width: "150px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="tabbar-section mt-4 mt-xxl-5">
        <div className="row">
          <div className="col-12">
            {/* <!-- Tab Nav (desktop only) --> */}
            <ul className="nav nav-tabs">
              {tabs.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            {/* <!-- Shared Content: Tab + Accordion --> */}
            <div className="tab-content mt-4">
              

              {activeTab === "events" && (
                <div className="tab-pane fade show active">
                  {/* <EventsTable userId={id}/> */}
                </div>
              )}

              {activeTab === "activities" && (
                <div className="tab-pane fade show active">
                  {/* <ActivitiesTables userId={id}/> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gun Modal */}
      <GunModal
        show={showGunModal}
        onClose={() => setShowGunModal(false)}
        data={gunData}
      />
    </div>
  );
}

export default VenueDetail;

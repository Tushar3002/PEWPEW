import React, { useEffect, useState } from "react";
import { getActivitiesClickDetails } from "../../api/EndUsers/endUserViewApi";
import { Link } from "react-router-dom";

function ActivityShares({ postId, type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSharedUserData();
  }, []);

  const getSharedUserData = async () => {
    try {
      const res = await getActivitiesClickDetails(postId, type);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="border rounded p-3">
      {type===3 ?<h4 className="fw-bold mb-3">Shares</h4> : <h4 className="fw-bold mb-3">Likes</h4>}

      <hr />

      {data.length > 0 ? (
        data.map((d) => (
          <div key={d.id} className="d-flex align-items-center gap-3 mb-3">
            <img
              src={d.profileImagePath}
              alt={d.userName}
              width="45"
              height="45"
              className="rounded-circle"
              style={{
                objectFit: "cover",
              }}
            />

            <h5 className="mb-0">
              <Link to={`/manage-end-users/view/${d.id}`}>{d.userName}</Link>
            </h5>
          </div>
        ))
      ) : (
        <p className="mb-0">No shares available.</p>
      )}
    </div>
  );
}

export default ActivityShares;

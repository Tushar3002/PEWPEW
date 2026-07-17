import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVenueActivities } from "../../api/EndUsers/endUserViewApi";

function ActivityDetail() {
  const { id } = useParams();

  useEffect(() => {
  if (!id) return;

  getVenueActivityData();
}, [id]);

  const getVenueActivityData = async () => {
    try {
        console.log(id);
        
        const res=await getVenueActivities(id)
        console.log(res.data);
        
    } catch (error) {
      console.log(error.response);
    }
  };
  return <div>ActivityDetail</div>;
}

export default ActivityDetail;

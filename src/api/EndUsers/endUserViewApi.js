import { api } from "../api";

export const getEndUserById = async (id) => {
  const res = await api.get(`/EndUser/${id}`);
  return res.data;
};

export const getEventApprovalStatus = async () => {
  const res = await api.get("/Common/GetEventApprovalStatus");
  return res.data;
};


//Guns

export const gunListByUser = async (body) => {
  const res = await api.post("/Gun/GunListByUser", body);
  return res.data;
};

export const deleteGunUser = async (gunId) => {
  const res = await api.delete("/Gun/Delete/", gunId);
  return res.data;
};

export const updateGunStatus = async (gunId, isActive) => {
  const res = await api.put(`/Gun/UpdateStatus/${gunId}`, null, {
    params: {
      isActive,
    },
    showSuccessToast: true,
  });
  return res.data;
};

//Venues

export const venueListByUser = async (body) => {
  const res = await api.post("/Venue/GetVenueListByUser", body);
  return res.data;
};

export const updateVenueStatus = async (venueId,isActive) => {
  const res = await api.put(`/Venue/UpdateStatus/${venueId}`, null, {
    params: {
      isActive,
    },
    showSuccessToast: true,
  });
  return res.data;
};

export const getVenueGunDetails = async(venueId)=>{
  const res=await api.get(`/Venue/GetVenueGunDetails`,{
    params:{
      venueId,
    },
    
  })

  return res.data
}

export const deleteVenue=async(venueId)=>{
  await api.delete(`/Venue/${venueId}`)
  return res.data
}
export const getVenueActivities=async(postId)=>{
  const res=await api.get(`/Venue/GetVenueActivity/${postId}`)
  return res.data
}

export const getVenueById=async(venueId)=>{
  const res=await api.get(`/Venue/${venueId}`)
  return res.data
}

export const getActivitiesinVenue=async(body)=>{
  const res=await api.post('/Venue/GetActivities',body)
  return res.data
}



//Events

export const eventListByUser = async (body) => {
    const res = await api.post("/Event/GetEventList", body);
    return res.data;
};



//Activties

export const getActivities = async (body) => {
    const res = await api.post("/Activities/GetActivities", body);
    return res.data;
};

export const updateActivitiesStatus = async (gunId,isActive) => {
  const res = await api.put(`/Activities/UpdatePostStatus/${gunId}`, null, {
    params: {
      isActive,
    },
    showSuccessToast: true,
  });
  return res.data;
};

export const getPostComments=async(body)=>{
  const res=await api.post('/Activities/GetPostComments',body)
  return res.data
}

export const getReportList=async(body)=>{
  const res=await api.post('/Report/GetReportList',body)
  return res.data
}



export const getActivitiesClickDetails=async(id,type)=>{
  const res=await api.get('/Activities/GetActivtyClickDetails',{
    params:{
      id,type
    }
  })

  return res.data
}
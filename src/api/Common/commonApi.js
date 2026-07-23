import { api } from "../api"

export const venueTypesDropDown=async()=>{
    const res=await api.get('/Common/GetVenueTypes')
    return res.data
}

export const getGender = async () => {
  const res = await api.get("/Common/GetGenders");
  return res.data;
};

export const getCountryCode = async () => {
  const res = await api.get("/Common/country-codes");
  return res.data;
};

export const getVenueApprovalStatus=async()=>{
  const res=await api.get("/Common/GetVenueApprovalStatus")
  return res.data
}


export const getSupportStatus=async()=>{
  const res=await api.get('/Common/GetSupportStatus')
  return res.data
}

export const getSupportIssueType=async()=>{
  const res=await api.get('/Common/GetSupportIssueType')
  return res.data
}
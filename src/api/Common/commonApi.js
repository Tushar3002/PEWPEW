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

export const getCommonDashBoardFilters=async()=>{
  const res=await api.get('/Common/GetDashboardFilters')
  return res.data
}

export const getCommunicatedDropdown=async()=>{
    const res=await api.get('/Common/GetCommincateWith')
    return res.data
}

export const getActivityType=async()=>{
  const res=await api.get('/Common/GetActivityType')
  return res.data
}

export const getBadgeApplicablefor=async()=>{
  const res=await api.get('/Common/GetBadgeApplicableFor')
  return res.data
}

export const getGunApprovalStatus = async()=>{
  const res=await api.get('/Common/GetGunApprovalStatus')
  return res.data
}
import { api } from "../api"

export const updateVenueData=async(venueId,body)=>{
    const res=await api.put(`/Venue/Update/${venueId}`,body)
    return res.data
}

export const addVenueData=async(body)=>{
    const res=await api.post('/Venue/Add',body)
    return res.data
}

export const getVenueList=async(body)=>{
    const res=await api.post('/Venue/GetList',body)
    return res.data
}


export const deleteVenue=async(venueId)=>{
    const res=await api.delete(`/Venue/${venueId}`)
    return res.data
}
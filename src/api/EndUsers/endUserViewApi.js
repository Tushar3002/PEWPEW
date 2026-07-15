import { api } from "../api"

export const getEndUserById=async(id)=>{
    const res=await api.get(`/EndUser/${id}`)
    return res.data
}

export const getEventApprovalStatus=async()=>{
    const res= await api.get('/Common/GetEventApprovalStatus')
    return res.data
}

export const gunListByUser=async(body)=>{
    const res=await api.post('/Gun/GunListByUser',body)
    return res.data
}

export const venueListByUser=async(body)=>{
    const res=await api.post('/Venue/GetVenueListByUser',body)
    return res.data
}

export const eventListByUser=async(body)=>{
    const res=await api.post('/Event/GetEventList',body)
    return res.data
}

export const getActivities=async(body)=>{
    const res=await api.post('/Activities/GetActivities',body)
    return res.data
}
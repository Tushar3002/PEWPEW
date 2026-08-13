import { api } from "../api"

export const getEventDetail = async(id)=>{
    const res=await api.get('/Event/Get',{
        params:{
            id
        }
    })

    return res.data
}


export const getAllEventList=async(body,isUpcomingEvents,isAdminRequest)=>{
    const res=await api.post('/Event/List',body,{
        params:{
            isUpcomingEvents,
            isAdminRequest
        }
    })
    return res.data
}


export const deleteEvents=async(eventId)=>{
    const res=await api.delete(`/Event/Delete/${eventId}`,{showSuccessToast: true})
    return res.data
}
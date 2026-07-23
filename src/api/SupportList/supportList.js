import { api } from "../api"

export const getSupportList=async(body)=>{
    const res=await api.post('/SupportTicket/List',body)
    return res.data
}

export const statusUpdateSupportTicket=async(body)=>{
    const res=await api.post('/SupportTicket/StatusUpadteAsync',body)
    return res.data
}

export const getSupportTicketDatabyId=async(id)=>{
    const res=await api.get(`/SupportTicket/${id}`,{
        params:{
            id
        }
    })

    return res.data
}
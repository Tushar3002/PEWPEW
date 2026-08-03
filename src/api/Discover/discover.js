import { api } from "../api"

export const getLeadByGuns=async(request,takRanking)=>{
    const res=await api.post('/Discover/GetLeadByGunsCheckin',null,{
        params:{
            request,
            takRanking
        }
    })
    return res.data
}
export const getLeadByVenues=async(request,takRanking)=>{
    const res=await api.post('Discover/GetLeadByVenueCheckin',null,{
        params:{
            request,
            takRanking
        }
    })
    return res.data
}
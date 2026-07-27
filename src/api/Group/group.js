import { api } from "../api"

export const getGroupsData=async(body)=>{
    const res=await api.post(`/Group/GetGroups`,body)
    return res.data
}
import { api } from "../api"

export const getGroupsData=async(body)=>{
    const res=await api.post(`/Group/GetGroups`,body)
    return res.data
}

export const updateGroupStatus=async(id,isActive)=>{
    const res=await api.put(`/Group/UpdateStatus/${id}`,null,{
        params:{
            isActive
        },
        showSuccessToast: true
    })
    return res.data
}

export const getGroupDataById=async(id)=>{
    const res=await api.get(`/Group/GetGroupDetail/${id}`)
    return res.data
}

export const getGroupMembers=async(body)=>{
    const res=await api.post('Group/GetGroupMembersList',body)
    return res.data
}

export const deleteGroup=async(id)=>{
    const res=await api.delete(`Group/Delete/${id}`,{showSuccessToast: true})
    return res.data
}
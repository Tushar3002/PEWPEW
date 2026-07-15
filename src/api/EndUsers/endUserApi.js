import { api } from "../api"

export const getEndUsers=async(body)=>{
    const res=await api.post('/EndUser/GetUsers',body)
    return res.data
}

export const deleteEndUser=async(userIds)=>{
    const res=await api.delete('/EndUser',{
      data: {
        userIds,
      },
      showSuccessToast: true
    },)
    return res.data
}



export const updateEndUserStatus=async(id,isActive)=>{
    const res=await api.put(`/EndUser/UpdateStatus/${id}`,null,{
        params:{
            isActive
        },
        showSuccessToast:true
    })
    return res.data
}

export const updateVerification=async(id,isVerify)=>{
    const res=await api.put(`/EndUser/EndUserVerify/${id}`,null,{
        params:{
            isVerify
        },
        showSuccessToast:true
    })
    return res.data
}
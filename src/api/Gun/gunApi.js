import { api } from "../api"

export const getGunDropDownAll=async()=>{
    const res=await api.get('/Gun/GetGunDropdownAll')
    return res.data
}

export const getGunList=async(body)=>{
    const res=await api.post('/Gun/List',body)
    return res.data
}

export const updateGunApprovalStatus=async(body)=>{
    const res=await api.post('/Gun/GunApprovalUpdateAsync',body,{showSuccessToast: true})
    return res.data
}

export const addGuns=async(body)=>{
    const res=await api.post('/Gun/Add',body,{showSuccessToast: true})
    return res.data
}

export const editGunById=async(id,body)=>{
    const res=await api.put(`/Gun/Edit/${id}`,body,{showSuccessToast: true})
    return res.data
}

export const deleteGunById=async(id)=>{
    const res=await api.delete(`/Gun/Delete/${id}`,{showSuccessToast: true})
    return res.data
}

export const getGunById=async(id)=>{
    const res=await api.get('/Gun/Get/',{
        params:{
            id
        }
    })
    return res.data
}
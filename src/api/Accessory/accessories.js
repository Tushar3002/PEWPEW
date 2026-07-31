import { api } from "../api"

export const getAccessoriesList=async(body)=>{
    const res=await api.post('/Accessory/List',body)
    return res.data
}

export const addAccessories=async(body)=>{
    const res=await api.post('Accessory/Add',body)
    return res.data
}

export const getAccessoriesListById=async(id)=>{
    const res=await api.get(`/Accessory/Get`,{
        params:{
            id
        }
    })
    return res.data
}

export const editAccessories=async(id,body)=>{
    const res=await api.put(`/Accessory/Edit/${id}`,body)
    return res.data
}

export const updateAccessoriesStatus=async(id,isActive)=>{
    const res=await api.put(`/Accessory/UpdateStatus/${id}`,null,{
        params:{
            isActive
        }
    })

    return res.data
}

export const deleteAccessory=async(id)=>{
    const res=await api.delete(`/Accessory/Delete/${id}`)
    return res.data
}
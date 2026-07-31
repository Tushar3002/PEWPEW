import { api } from "../api"

export const categoryDropDown=async(applicableFor=1)=>{
    const res=await api.get('/GunCategoryMaster/CategoryDropdown',{
        params:{
            applicableFor
        }
    })

    return res.data
}

export const getGunCategoryMasterList=async(body)=>{
    const res=await api.post('/GunCategoryMaster/List'.body)
    return res.data
}

export const getGunCategoryById=async(id)=>{
    const res=await api.get('/GunCategoryMaster/Get',{
        params:{
            id
        }
    })
    return res.data
}

export const addGunCategory=async(body)=>{
    const res=await api.post('/GunCategoryMaster/Add',body)
    return res.data
}

export const editGunCategory=async(id,body)=>{
    const res=await api.put(`/GunCategoryMaster/Edit/${id}`,body)
    return res.data
}

export const deleteCategory=async(id)=>{
    const res=await api.delete(`/GunCategoryMaster/Delete/${id}`)
    return res.data
}

export const updateGunCategoryStatus=async(id,isActive)=>{
    const res=await api.put(`/api/v{version}/GunCategoryMaster/UpdateStatus/${id}`,{
        params:{
            isActive
        }
    })
}
import { api } from "../api"

export const getDropdownAmmunitions=async()=>{
    const res=await api.get('/Ammunition/GetDropdownAmmunitions')
    return res.data
}

export const getAmmunitionsList=async(body)=>{
    const res=await api.post('/Ammunition/List',body)
    return res.data
}

export const addAmmunition=async(body)=>{
    const res=await api.post('/Ammunition/Add',body,{showSuccessToast: true})
    return res.data
}

export const getAmmunitionById=async(id)=>{
    const res=await api.get('/Ammunition/Get',{
        params:{
            id
        }
    })
    return res.data
}

export const updateAmmunition=async(body)=>{
    const res=await api.put('/Ammunition/Update',body,{showSuccessToast: true})
    return res.data
}

export const deleteAmmunition=async(deleteId)=>{
    const res=await api.delete(`/Ammunition/Delete/${deleteId}`,{showSuccessToast: true})
    return res.data
}

export const updateAmmunitionStatus=async(id,isActive)=>{
    const res=await api.put(`/Ammunition/UpdateStatus/${id}`,null,{
        params:{
            isActive
        },
        showSuccessToast: true
    })

    return res.data
}
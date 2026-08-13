import { api } from "../api"

export const getManufacturerDropdownData=async()=>{
    const res=await api.get('/Manufacturer/GetManufacturerDropdown')
    return res.data
}

export const manufacturerList=async(body)=>{
    const res=await api.post('/Manufacturer/List',body)
    return res.data
}

export const updateManufacturerStatus=async(id,isActive)=>{
    const res=await api.put(`/Manufacturer/UpdateStatus/${id}`,null,{
        params:{
            isActive
        },
        showSuccessToast: true
    })

    return res.data
}

export const addManufacturer=async(body)=>{
    const res=await api.post('/Manufacturer/Add',body,{showSuccessToast: true})
    return res.data
}

export const getManufacturerDataById=async(id)=>{
    const res=await api.get(`/Manufacturer/Get/${id}`)
    return res.data
}

export const updateManufacturer=async(id,body)=>{
    const res=await api.put(`/Manufacturer/Update/${id}`,body,{showSuccessToast: true})
    return res.data
}

export const deleteManufacturer=async(id)=>{
    const res=await api.delete(`/Manufacturer/Delete/${id}`,{showSuccessToast: true})
    return res.data
}
import { api } from "../api"

export const getManufacturerDropdownData=async()=>{
    const res=await api.get('/Manufacturer/GetManufacturerDropdown')
    return res.data
}
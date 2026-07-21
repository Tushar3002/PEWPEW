import { api } from "../api"

export const getGunDropDownAll=async()=>{
    const res=await api.get('Gun/GetGunDropdownAll')
    return res.data
}
import { api } from "../api/api"

export const getDropdownAmmunitions=async()=>{
    const res=await api.get('/Ammunition/GetDropdownAmmunitions')
    return res.data
}
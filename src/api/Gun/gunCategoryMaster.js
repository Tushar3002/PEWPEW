import { api } from "../api"

export const categoryDropDown=async(applicableFor=1)=>{
    const res=await api.get('/GunCategoryMaster/CategoryDropdown',{
        params:{
            applicableFor
        }
    })

    return res.data
}
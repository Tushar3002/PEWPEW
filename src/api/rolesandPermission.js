import { api } from "./api"

export const getRolesAndPermission=async(data)=>{
    const res=await api.post('/Role/List',data)
    return res.data
}
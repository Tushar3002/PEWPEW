import { api } from "./api"

export const getUsers=async(body)=>{
    const res=await api.post('/User/GetUsers',body)
    return res.data
}

export const getCurrentUser=async()=>{
    const res=await api.get('/User/GetUserProfile')
    return res.data
}
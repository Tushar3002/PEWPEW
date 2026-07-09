import { api } from "./api"

export const getUsers=async(body)=>{
    const res=await api.post('/User/GetUsers',body)
    return res.data
}

export const getCurrentUser=async()=>{
    const res=await api.get('/User/GetUserProfile')
    return res.data
}

export const addUser=async()=>{
    const res=await api.post('/User/Add')
    return res.data
}

export const getGender=async()=>{
    const res=await api.get('/Common/GetGenders')
    return res.data
}

export const getCountryCode=async()=>{
    const res=await api.get('Common/country-codes')
    return res.data
}
import { api } from "../api"

export const getEventDetail = async(id)=>{
    const res=await api.get('/Event/Get',{
        params:{
            id
        }
    })

    return res.data
}
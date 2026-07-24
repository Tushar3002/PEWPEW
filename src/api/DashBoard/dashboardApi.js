import { api } from "../api"

export const getDashBoardData=async(filter=0,customFrom="",customTo="")=>{
    const res=await api.get('/Dashboard/GetTopDashboardData',{
        params:{
            filter,
            customFrom,
            customTo
        }
    })

    return res.data
}

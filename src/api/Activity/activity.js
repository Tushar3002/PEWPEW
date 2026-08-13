import { api } from "../api"

export const updatePostStatus=async(postId,isActive)=>{
    const res=await api.put(`/Activities/UpdatePostStatus/${postId}`,null,{
        params:{
            isActive
        },
        showSuccessToast: true
    })
    return res.data
}
import { api } from "./api";

export const loginUser = async(data) => {

    const res = await api.post('/Login/Login', data,{showSuccessToast:true});
    return res.data;
}
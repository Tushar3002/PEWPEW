import { api } from "./api";

export const loginUser = async(data) => {
    // email = email.trim();
    // password = password.trim();
    const res = await api.post('/Login/Login', data);
    return res.data;
}
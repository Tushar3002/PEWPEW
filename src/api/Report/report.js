import { api } from "../api";

export const getReportList = async (body) => {
    const res = await api.post("/Report/GetUserReportList", body);
    return res.data;
}
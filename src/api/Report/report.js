import { api } from "../api";

export const getReportList = async (body) => {
    const res = await api.post("/Report/GetUserReportList", body);
    return res.data;
}

export const updateReportStatus = async (body) => {
    const res = await api.put("/Report/UpdateStatus", body);
    return res.data;
}

import { api } from "../api"

export const getBadgesList = async (body) => {
    const res=await api.post('/ManageBadges/List',body)
    return res.data
}

export const getBadgeById = async (badgeId) => {
    const res = await api.get(`/ManageBadges/Get/${badgeId}`);
    return res.data;
}

export const createBadge = async (body) => {
    const res=await api.post('/ManageBadges/Add', body)
    return res.data
}

export const updateBadge = async (badgeId, body) => {
    const res=await api.put(`/ManageBadges/Update/${badgeId}`, body)
    return res.data
}
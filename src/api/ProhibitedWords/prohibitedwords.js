import { api } from "../api";

export const getProhibitedWords = async (body) => {
  const res = await api.post("/ProhibitedWord/List", body);
  return res.data;
};

export const updateProhibitedWordsStatus = async (id, isActive) => {
  const res = await api.put(`/ProhibitedWord/UpdateStatus/${id}`, null, {
    params: {
      isActive,
    },
    showSuccessToast: true
  });
  return res.data;
};

export const addProhibitedWords = async (body) => {
  const res = await api.post("/ProhibitedWord/Add", body,{showSuccessToast: true});
  return res.data;
};

export const updateProhibitedWords = async (body) => {
  const res = await api.put("/ProhibitedWord/Update", body,{showSuccessToast: true});
  return res.data;
};

export const getProhibitedWordsById = async (id) => {
  const res = await api.get("/ProhibitedWord/Get", {
    params: {
      id,
    },
  });
  return res.data
};

export const deleteProhibitedWords=async(id)=>{
    const res=await api.delete(`/ProhibitedWord/Delete/${id}`,{showSuccessToast: true})
    return res.data
}
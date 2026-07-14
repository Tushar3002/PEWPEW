import { api } from "./api";

export const getRolesAndPermission = async (data) => {
  const res = await api.post("/Role/List", data);
  return res.data;
};

export const getRoleById = async (id) => {
  const res = await api.get("/Role/Get", {
    params: {
      Id: id,
    },
  });

  return res.data;
};

export const updateStatusforRoles = async (id, isActive) => {
  const res = await api.put(`/Role/UpdateStatus/${id}`, null, {
    params: { isActive },
  });
  return res.data;
};


export const addRoles = async(body)=>{
    const res=await api.post('/Role/Add',body)
    return res.data
}


export const updateRoles = async(id,body)=>{
    const res=await api.put(`/Role/Update/${id}`,body)
    return res.data
}

export const deleteRole=async(id)=>{
    const res=await api.delete(`/Role/Delete/${id}`)
    return res.data
}
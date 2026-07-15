import { api } from "./api";

export const getUsers = async (body) => {
  const res = await api.post("/User/GetUsers", body);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/User/GetUserProfile");
  return res.data;
};

export const addUser = async (body) => {
  const res = await api.post("/User/Add", body, { showSuccessToast: true });
  return res.data;
};

export const getGender = async () => {
  const res = await api.get("/Common/GetGenders");
  return res.data;
};

export const getCountryCode = async () => {
  const res = await api.get("/Common/country-codes");
  return res.data;
};

export const getRole = async () => {
  const res = await api.get("Role/GetRolesForDropdown");
  return res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/User/${id}`);
  return res.data;
};

export const updateUser = async (body) => {
  const res = await api.put("/User/update", body, { showSuccessToast: true });
  return res.data;
};

export const deleteUser = async (userIds) => {
  const res = await api.delete(
    "/User",
    {
      data: {
        userIds,
      },
      showSuccessToast: true
    },
  );
  return res.data;
};

export const updateStatus = async (id, isActive) => {
  const res = await api.put(
    `/User/UpdateStatus/${id}`,
    null,
    {
      params: {
        isActive,
      },
      showSuccessToast: true
    },

  );

  return res.data;
};

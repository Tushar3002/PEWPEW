import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, getUserById, updateUser } from "../../api/userApi";
import UserForm from "../../components/users/UserForm";
import { initialUserForm } from "../../constants/userForm";
import { useUserDropDown } from "../../hooks/useUserDropDown";
import { getRoleById } from "../../api/rolesandPermission";
import PermissionTable from "../../components/rolesAndPermissions/PermissionTable";

function ManageUserFormPage() {
  const [defaultValues, setDefaultValues] = useState(initialUserForm);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const { genders, roles, countryCodeData } = useUserDropDown();
  const [selectedRole, setSelectedRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  

  useEffect(() => {
    if (!isEditMode) {
      setDefaultValues(initialUserForm);
      return;
    }

    loadUser();
  }, [id, isEditMode]);

  useEffect(() => {
    if (!selectedRole) return;

    getRoleandPermissions(selectedRole);
  }, [selectedRole]);

  const getRoleandPermissions = async (id) => {
    try {
      const res = await getRoleById(id);
      setPermissions(res.data.permissions)
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const loadUser = async () => {
    try {
      const res = await getUserById(id);
      console.log("User by Id",res.data);
      
      const userData = res.data || {};

      setDefaultValues({
        userId: id,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        contactNumber: userData.contactNumber || "",
        countryCode: userData.countryCode || "",
        countryCodeName: userData.countryCodeName || "",
        gender: userData.gender || "",
        role: userData.roleId || "",
        commincateWith: Array.isArray(userData.commincateWith)
          ? userData.commincateWith.map(String)
          : [],
        birthDay: userData.birthDay || "",
        address: userData.address || "",
        userName: userData.userName || "",
        profileImage: userData.profileImageFullPath || "",
      });
      setSelectedRole(userData.roleId || "");
    } catch (error) {
      console.log(error);
    }
  };

  const buildPayload = (data) => {
    const selectedCountry = countryCodeData.find(
      (country) => String(country.countryId) === String(data.countryCode),
    );

    return {
      ...data,
      userId: isEditMode ? id : undefined,
      gender: data.gender ? Number(data.gender) : null,
      role: data.role,
      commincateWith: Array.isArray(data.commincateWith)
        ? data.commincateWith.map(String)
        : [],
      countryCode: selectedCountry
        ? selectedCountry.phoneInternationalCode
        : data.countryCode,
      countryCodeName: selectedCountry
        ? selectedCountry.countryCode
        : data.countryCodeName,
    };
  };

  const handleSubmit = async (data) => {
    try {
      const payload = buildPayload(data);

      if (isEditMode) {
        await updateUser(payload);
      } else {
        await addUser(payload);
      }

      navigate("/manage-users");
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (<>
    <UserForm
      defaultValues={isEditMode ? defaultValues : initialUserForm}
      preview={isEditMode ? defaultValues.profileImage || "" : ""}
      genders={genders}
      roles={roles}
      countryCodeData={countryCodeData}
      isEditMode={isEditMode}
      onRoleChange={setSelectedRole}
      onSubmit={handleSubmit}
    />
    {selectedRole && <PermissionTable permissions={permissions} editable={false}/>}
    </>
  );
}

export default ManageUserFormPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/userApi";
import UserForm from "../../components/users/UserForm";
import { initialUserForm } from "../../constants/userForm";
import { useUserDropDown } from "../../hooks/useUserDropDown";

function ManageUserAdd() {
  const navigate = useNavigate();
  const { genders, roles, countryCodeData } = useUserDropDown();

  const handleSubmit = async (data) => {
    try {
      const selectedCountry = countryCodeData.find(
        (country) => String(country.countryId) === String(data.countryCode),
      );

      const payload = {
        ...data,
        gender: data.gender ? Number(data.gender) : null,
        role: data.role ,
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
      console.log(payload);
      
      await addUser(payload);
      navigate("/manage-users");
    } catch (error) {
      console.log(error?.response);
    }
  };

  return (
    <UserForm
      defaultValues={initialUserForm}
      genders={genders}
      roles={roles}
      countryCodeData={countryCodeData}
      onSubmit={handleSubmit}
    />
  );
}

export default ManageUserAdd;

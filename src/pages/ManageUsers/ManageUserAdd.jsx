import React, { useEffect, useState } from "react";

import { addUser, getCountryCode, getGender, getRole } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

import { initialUserForm } from "../../constants/userForm";
import UserForm from "../../components/users/UserForm";
import { useUserForm } from "../../hooks/useUserForm";
import { useUserDropDown } from "../../hooks/useUserDropDown";


function ManageUserAdd() {
  const navigate = useNavigate();

  const { genders, roles, countryCodeData }=useUserDropDown();
  const {
    form,
    setForm,
    preview,
    handleChange,
    handleImageChange,
    handleCountryChange,
    handleCommunicateChange,
  } = useUserForm(countryCodeData);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(form);
      const res = await addUser(form);
      navigate("/manage-users");
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <UserForm
      form={form}
      setForm={setForm}
      genders={genders}
      roles={roles}
      countryCodeData={countryCodeData}
      handleSubmit={handleSubmit}
      preview={preview}
      setPreview={setPreview}
      handleImageChange={handleImageChange}
      handleCommunicateChange={handleCommunicateChange}
      handleCountryChange={handleCountryChange}
      getGenderData={getGenderData}
      getCountryCodeData={getCountryCodeData}
      getRolesData={getRolesData}
      handleChange={handleChange}
    />
  );
}

export default ManageUserAdd;

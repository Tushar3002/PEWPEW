import React, { useEffect, useState } from "react";
import UserForm from "../../components/users/UserForm";
import { initialUserForm } from "../../constants/userForm";
import { useParams } from "react-router-dom";

function ManageUserEdit() {
  const [form, setForm] = useState(initialUserForm);
  const {id}=useParams()
  useEffect(() => {
    // loadUser(id);
  }, []);

  const handleSubmit = async () => {
    await updateUser(form);
  };

  return(
    <>
    <h1>EDIT PAGE </h1>
    {/* <h1>{id}</h1> */}
      {/* <UserForm
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
    /> */}
    </>
  )
}

export default ManageUserEdit;
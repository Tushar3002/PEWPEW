import { useEffect, useState } from "react";

import UserForm from "../../components/users/UserForm";
import { initialUserForm } from "../../constants/userForm";
import { useUserDropDown } from "../../hooks/useUserDropDown";
import { getCurrentUser } from "../../api/userApi";

function Profile() {

  const { genders, roles, countryCodeData } = useUserDropDown();
  const [data, setData] = useState([]);

  const [defaultValues, setDefaultValues] = useState(initialUserForm);

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (!data) return;

    setDefaultValues({
      userId: data.userId || "",
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      contactNumber: data.contactNumber || "",
      countryCode: data.countryCode || "",
      countryCodeName: data.countryCodeName || "",
      gender: data.gender || "",
      role: data.roleId || "",
      commincateWith: Array.isArray(data.commincateWith)
        ? data.commincateWith.map(String)
        : [],
      birthDay: data.birthDay || "",
      address: data.address || "",
      userName: data.userName || "",
      profileImage: data.profileImage ? data.profileImageFullPath : "",
    });
  }, [data]);

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("userData", user.data);

      setData(user.data);
      // console.log("Get Current",user);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <UserForm
      defaultValues={defaultValues}
      preview={defaultValues.profileImage}
      genders={genders}
      roles={roles}
      countryCodeData={countryCodeData}
      isEditMode
      onSubmit={() => {}}
    />
  );
}

export default Profile;

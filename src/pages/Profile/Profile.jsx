import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserForm from "../../components/users/UserForm";
import { initialUserForm } from "../../constants/userForm";
import { useUserDropDown } from "../../hooks/useUserDropDown";

function Profile() {
  const { user } = useAuth();
  const { genders, roles, countryCodeData } = useUserDropDown();

  const [defaultValues, setDefaultValues] = useState(initialUserForm);

  useEffect(() => {
    if (!user) return;

    setDefaultValues({
      userId: user.userId || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      contactNumber: user.contactNumber || "",
      countryCode: user.countryCode || "",
      countryCodeName: user.countryCodeName || "",
      gender: user.gender || "",
      role: user.roleId || "",
      commincateWith: Array.isArray(user.commincateWith)
        ? user.commincateWith.map(String)
        : [],
      birthDay: user.birthDay || "",
      address: user.address || "",
      userName: user.userName || "",
      profileImage: user.profileImage
        ? user.profileImageFullPath
        : "",
    });
  }, [user]);

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
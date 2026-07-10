import { useState } from "react";
import { initialUserForm } from "../constants/userForm";

export const useUserForm=(countryCodeData)=>{
    const [form, setForm] = useState(initialUserForm);
  
    const [preview, setPreview] = useState(null);
    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(name, value);
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "gender"
            ? Number(value)
            : value,
    }));
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleCountryChange = (e) => {
    const selected = countryCodeData.find(
      (c) => c.countryId === Number(e.target.value),
    );

    console.log(selected);

    if (!selected) return;

    setForm((prev) => ({
      ...prev,
      countryCode: selected.phoneInternationalCode,
      countryCodeName: selected.countryCode,
    }));
  };

  const handleCommunicateChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setForm((prev) => ({
      ...prev,
      commincateWith: checked
        ? [...prev.commincateWith, value]
        : prev.commincateWith.filter((item) => item !== value),
    }));
  };

  
    return {
    form,
    setForm,
    preview,
    setPreview,
    handleChange,
    handleCommunicateChange,
    handleCountryChange,
    handleImageChange,
};
}
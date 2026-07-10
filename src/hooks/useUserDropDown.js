import { useEffect, useState } from "react";

export function useUserDropDown() {

    const [genders, setGenders] = useState([]);
  const [roles, setRoles] = useState([]);
  const [countryCodeData, setCountryCodeData] = useState([]);

  useEffect(() => {
      getGenderData();
      getCountryCodeData();
      getRolesData();
    }, []);
  const getGenderData = async () => {
    try {
      const res = await getGender();

      setGenders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountryCodeData = async () => {
    try {
      const res = await getCountryCode();
      console.log(res.data);

      setCountryCodeData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRolesData = async () => {
    try {
      const res = await getRole();
      setRoles(res.data);
      // console.log("Roles", res);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    genders,
    roles,
    countryCodeData
  };
}

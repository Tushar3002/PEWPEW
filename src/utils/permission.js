import { getStorage } from "./storage";

export const getPermissions = () => {
  return getStorage("menuList") || [];
};

export const getMenuPermission = (menuName) => {
  const permissions = getPermissions();
  // console.log("Permi",permissions);
  
  return (
    permissions.find(
      (x) => x.menuName.toLowerCase() === menuName.toLowerCase(),
    ) || {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: false,
    }
  );
};

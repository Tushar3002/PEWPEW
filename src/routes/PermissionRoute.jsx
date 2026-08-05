import { Navigate } from "react-router-dom";
import { getStorage } from "../utils/storage";

const PermissionRoute = ({ menuName, children }) => {
  const permissions = getStorage("menuList") || [];

  const hasPermission = permissions.some(
    (p) => p.menuName === menuName && p.canRead
  );

  if (!hasPermission) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PermissionRoute;
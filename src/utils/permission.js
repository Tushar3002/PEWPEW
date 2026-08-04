import { getStorage } from "./storage";

export const getPermissions = () => {
    return getStorage("menuPermissions") || [];
};

export const getMenuPermission = (menuName) => {
    const permissions = getPermissions();

    return permissions.find(
        x => x.menuName === menuName
    );
};

export const canRead = (menuName) =>
    getMenuPermission(menuName)?.canRead ?? false;

export const canCreate = (menuName) =>
    getMenuPermission(menuName)?.canCreate ?? false;

export const canUpdate = (menuName) =>
    getMenuPermission(menuName)?.canUpdate ?? false;

export const canDelete = (menuName) =>
    getMenuPermission(menuName)?.canDelete ?? false;
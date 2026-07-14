import React from "react";
import './PermissionTable.css'

const PermissionTable = ({
  permissions = [],
  editable,
  onPermissionsChange,
}) => {
  const normalizeBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (value === 1 || value === "1" || value === "true" || value === "True") {
      return true;
    }
    if (value === 0 || value === "0" || value === "false" || value === "False") {
      return false;
    }
    return Boolean(value);
  };

  const handleChange = (menuId, field) => {
    if (!editable || typeof onPermissionsChange !== "function") return;

    const updated = permissions.map((permission) => {
      if (permission.menuId !== menuId) return permission;

      const currentValue = normalizeBoolean(permission[field]);
      const nextValue = !currentValue;

      if (field === "isRead") {
        return {
          ...permission,
          isRead: nextValue,
          isCreate: nextValue ? permission.isCreate : false,
          isUpdate: nextValue ? permission.isUpdate : false,
          isDelete: nextValue ? permission.isDelete : false,
        };
      }

      if (!normalizeBoolean(permission.isRead) && field !== "isRead") {
        return {
          ...permission,
          isRead: true,
          [field]: true,
        };
      }

      return {
        ...permission,
        [field]: nextValue,
      };
    });

    onPermissionsChange(updated);
  };

  const renderCheckbox = (checked, hidden, menuId, field) => {
    const isHidden = normalizeBoolean(hidden);
    if (isHidden) return null;

    return (
      <input
        type="checkbox"
        className="form-check-input permission-checkbox"
        checked={normalizeBoolean(checked)}
        disabled={!editable}
        readOnly={!editable}
        onChange={() => handleChange(menuId, field)}
      />
    );
  };

  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "40%" }}>Access Privileges</th>
            <th className="text-center">Read</th>
            <th className="text-center">Create</th>
            <th className="text-center">Update</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>

        <tbody>
          {permissions.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-3">
                No permissions available
              </td>
            </tr>
          ) : (
            permissions.map((permission) => (
              <tr key={permission.menuId}>
                <td>{permission.menuDisplayName}</td>

                <td className="text-center">
                  {renderCheckbox(permission.isRead, false, permission.menuId, "isRead")}
                </td>

                <td className="text-center">
                  {renderCheckbox(permission.isCreate, permission.isCreateHide, permission.menuId, "isCreate")}
                </td>

                <td className="text-center">
                  {renderCheckbox(permission.isUpdate, permission.isUpdateHide, permission.menuId, "isUpdate")}
                </td>

                <td className="text-center">
                  {renderCheckbox(permission.isDelete, permission.isDeleteHide, permission.menuId, "isDelete")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionTable;

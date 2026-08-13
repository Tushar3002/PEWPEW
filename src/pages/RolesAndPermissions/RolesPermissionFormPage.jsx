import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PermissionTable from "../../components/rolesAndPermissions/PermissionTable";
import {
  addRoles,
  getRoleById,
  updateRoles,
} from "../../api/rolesandPermission";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { decrypt } from "../../utils/crypto";

function RolesPermissionFormPage() {
  const [permissions, setPermissions] = useState([]);

  const { id } = useParams();
  const roleId=decrypt(id)
  const isEditMode = Boolean(id);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: "",
      description: "",
    },
  });

  const normalizePermissions = (list = []) =>
    (list || []).map((permission) => ({
      ...permission,
      isRead: Boolean(permission.isRead),
      isCreate: Boolean(permission.isCreate),
      isUpdate: Boolean(permission.isUpdate),
      isDelete: Boolean(permission.isDelete),
    }));

  useEffect(() => {
    if (!isEditMode) {
      reset({ roleName: "", description: "" });
      loadPermissions();
      return;
    }

    loadRole();
  }, [id, isEditMode, reset]);

  const loadPermissions = async () => {
    try {
      const res = await getRoleById();
      const roleData = res?.data || res || {};
      const permissionList = Array.isArray(roleData?.permissions)
        ? roleData.permissions
        : Array.isArray(roleData?.data?.permissions)
          ? roleData.data.permissions
          : [];

      setPermissions(normalizePermissions(permissionList));
    } catch (error) {
      console.log(error?.response);
      setPermissions([]);
    }
  };

  const buildPayload = (data) => ({
    roleId: isEditMode ? roleId : undefined,
    roleName: data.roleName,
    description: data.description,
    isSystemRole: false,
    permissions: normalizePermissions(permissions).map((permission) => ({
      menuId: permission.menuId,
      menuName: permission.menuName,
      menuDisplayName: permission.menuDisplayName || "",
      isRead: Boolean(permission.isRead),
      isCreate: Boolean(permission.isCreate),
      isUpdate: Boolean(permission.isUpdate),
      isDelete: Boolean(permission.isDelete),
    })),
  });

  const addRole = async (body) => {
    try {
      const res = await addRoles(body);
      console.log(res);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const updateRole = async (roleId, body) => {
    try {
      const res = await updateRoles(roleId, body);
      console.log(res);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const loadRole = async () => {
    try {
      const res = await getRoleById(roleId);
      const roleData = res?.data || res || {};

      reset({
        roleName: roleData?.roleName || "",
        description: roleData?.description || "",
      });

      setPermissions(normalizePermissions(roleData?.permissions || []));
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      const payload = buildPayload(data);

      if (isEditMode) {
        await updateRole(roleId, payload);
      } else {
        await addRole(payload);
      }

      navigate("/roles-permissions");
    } catch (error) {
      console.log(error?.response);
    }
  };
  return (
    <div className="container-fluid">
      <div className="tabbar-section">
        <div className="row">
          <div className="col-12">
            <Breadcrumbs
              items={[
                {
                  id: "roles-permissions",
                  text: "Roles & Permissions",
                  path: "/roles-permissions",
                },
                {
                  id: isEditMode ? "edit-role" : "add-role",
                  text: isEditMode ? "Edit Role & Permission" : "Add Role & Permission",
                },
              ]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form
              className="mt-3 mt-xxl-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <fieldset className="row">
                <div className="col-12 mt-3">
                  <div className="form-group">
                    <label htmlFor="roleName" className="fw-semibold">
                      Role Name <span className="danger-color">*</span>
                    </label>
                    <input
                      id="roleName"
                      className={`form-control ${errors.roleName ? "is-invalid" : ""}`}
                      {...register("roleName", {
                        required: "Role Name is required",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.roleName?.message}
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  <div className="form-group">
                    <label htmlFor="description" className="fw-semibold">
                      Description <span className="danger-color">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      {...register("description", {
                        required: "Description is required",
                      })}
                    />
                    <div className="invalid-feedback">
                      {errors.description?.message}
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3 mt-xxl-4">
                  <div className="d-flex flex-wrap justify-content-end gap-3">
                    <button type="submit" className="btn main-btn w-auto">
                      Save
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>

            <div>
              <h3>Permissions</h3>
              <PermissionTable
                permissions={permissions}
                editable={true}
                onPermissionsChange={setPermissions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesPermissionFormPage;

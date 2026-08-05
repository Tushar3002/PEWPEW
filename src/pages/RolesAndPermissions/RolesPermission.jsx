import React, { useEffect, useState } from "react";
import {
  deleteRole,
  getRolesAndPermission,
  updateStatusforRoles,
} from "../../api/rolesandPermission";
import { Link, useNavigate } from "react-router-dom";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import StatusCell from "../../components/GridCells/StatusCell";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { TextCell } from "../../components/GridCells/TextCell";
import { GunCountCell } from "../../components/GridCells/GunCountCell";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { getMenuPermission } from "../../utils/permission";
import { ActionCell } from "../../components/GridCells/ActionCell";

function RolesPermission() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const [sort, setSort] = useState([]);
  // const [filter, setFilter] = useState({
  //   logic: "and",
  //   filters: [],
  // });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const navigate = useNavigate();

  const rolePermission = getMenuPermission("Role");

  useEffect(() => {
    rolesandpermissionData();
  }, [page, sort, search]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== searchInput) {
        setSearch(searchInput);
      }

      setPage((prev) => {
        if (prev.skip === 0) return prev;

        return {
          ...prev,
          skip: 0,
        };
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const updateStatusData = async (id, isActive) => {
    try {
      await updateStatusforRoles(id, isActive);
      rolesandpermissionData();
      return true;
    } catch (error) {
      console.log(error?.response);
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      
      await deleteRole(deleteId);
      closeDeleteModal()
      rolesandpermissionData();
    } catch (error) {
      console.log(error.response);
    }finally{
      setIsDeleting(false)
    }
  };

  const rolesandpermissionData = async () => {
    try {
      const body = {
        page: page.skip / page.take + 1,
        pageSize: page.take,

        sorts: sort.map((s) => ({
          field: s.field,
          direction: s.dir === "asc" ? 0 : 1,
        })),

        customSearch: search,
      };
      const res = await getRolesAndPermission(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;
    if (!nextValue) {
      const confirmed = window.confirm(
        "Are you sure you want to inactivate this role?\n\nInactivating this role will prevent all associated users from accessing the system.",
      );

      if (!confirmed) {
        return;
      }
    }

    setData((prev) =>
      prev.map((item) =>
        item.id === id || item.userId === id
          ? { ...item, isActive: nextValue }
          : item,
      ),
    );

    const isSuccess = await updateStatusData(id, nextValue);

    if (!isSuccess) {
      setData((prev) =>
        prev.map((item) =>
          item.id === id || item.userId === id
            ? { ...item, isActive: currentValue }
            : item,
        ),
      );
    }
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "roles-permissions",
              text: "Roles & Permissions",
            },
          ]}
        />
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
            role="search"
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button
              className="btn btn-outline-primary search-toggle"
              type="button"
            >
              <i className="demo-icon icon-search"></i>
            </button>
          </form>
        </div>

        <div className="col-12 col-lg">
          <div className="btn-list d-flex justify-content-lg-end flex-wrap gap-2 gap-md-3 text-end">
            {/* <a href="#" className="btn main-btn border-btn danger-btn">
          Delete
        </a>

        <a href="#" className="btn main-btn border-btn blue-btn">
          Import
        </a> */}

            {/* <a href="#" className="btn main-btn border-btn sky-btn">
              Export
            </a> */}

            <Link
              to={"/roles-permissions/add"}
              className="btn main-btn border-btn blue-btn"
            >
              Add Users
            </Link>
          </div>
        </div>
      </div>

      <div className="row w-100">
        <div className="col-12 mt-3 mt-xxl-4 w-100 ">
          <div
            className="table-responsive w-100"
            style={{ overflow: "visible" }}
          >
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
                style={{ width: "100%", overflow: "visible" }}
                data={data}
                pageable={{
                  buttonCount: 5,
                  pageSizes: [5, 10, 20, 50, 100, 500],
                  info: true,
                  previousNext: true,
                }}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                <GridColumn
                  title="Action"
                  width="110px"
                  headerClassName="text-center"
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={rolePermission}
                        idField="id"
                        onEdit={(id) => navigate(`/roles-permissions/edit/${id}`)}
             
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />
                <GridColumn
                  width={"330px"}
                  field="role"
                  title="Role Name"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  width={"580px"}
                  field="description"
                  title="Description"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  width={"240px"}
                  field="noOfUser"
                  title="No. Of User"
                  cells={{ data: GunCountCell }}
                />

                <GridColumn
                  width={"120px"}
                  title="Status"
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="id"
                        onToggle={handleStatusToggle}
                      />
                    ),
                  }}
                />
              </Grid>
            </Tooltip>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default RolesPermission;

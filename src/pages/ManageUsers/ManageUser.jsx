import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers, updateStatus } from "../../api/userApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import StatusCell from "../../components/GridCells/StatusCell";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { TextCell } from "../../components/GridCells/TextCell";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import { getMenuPermission } from "../../utils/permission";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { ActionCell } from "../../components/GridCells/ActionCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";

import { useLocation } from "react-router-dom";
import { encryptUrlParam } from "../../utils/crypto";
import { useAuth } from "../../context/AuthContext";

const responsiveColumns = [
  { field: "check", minWidth: 60 },
  { field: "action", minWidth: 90 },
  { field: "firstName", minWidth: 180 },
  { field: "lastName", minWidth: 180 },
  { field: "userName", minWidth: 180 },
  { field: "roleName", minWidth: 150 },
  { field: "contactNumber", minWidth: 160 },
  { field: "email", minWidth: 260 },
  { field: "status", minWidth: 90 },
];

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);

  const [selectedUserIds, setSelectedUserIds] = useState([]);

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

  const location = useLocation();

  const roleId = location.state?.roleId;

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const userPermission = getMenuPermission("User");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
    
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
      await updateStatus(id, isActive);
      fetchUsers();
      return true;
    } catch (error) {
      console.log(error?.response);
      return false;
    }
  };

  const fetchUsers = async () => {
    try {
      const body = {
        Page: page.skip / page.take + 1,
        PageSize: page.take,

        Sorts: sort.map((s) => ({
          field: s.field,
          direction: s.dir === "asc" ? 0 : 1,
        })),

        CustomSearch: search,
      };
      if (roleId) {
        body.Filters = [
          {
            field: "roleId",
            operatorType: 2,
            value: roleId,
          },
        ];
      }
      const res = await getUsers(body);
      // console.log("Users",res.data.data);

      setUsers(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      const userIds = Array.isArray(deleteId) ? deleteId : [deleteId];

      await deleteUser(userIds);

      closeDeleteModal();
      await fetchUsers();

      setSelectedUserIds([]);
    } catch (error) {
      console.log(error?.response);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleUserSelection = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // const handleFilterChange = (e) => {
  //   setFilter(e.filter);

  //   setPage((prev) => ({
  //     ...prev,
  //     skip: 0,
  //   }));
  // };
  // const filterOperators = {
  //   text: [
  //     {
  //       text: "Contains",
  //       operator: "contains",
  //     },
  //   ],
  // };

  const CheckboxCell = (props) => {
    const userId = props.dataItem.id;

    //   console.log("User row:", props.dataItem);
    // console.log("User ID:", userId);
    const isSelected = selectedUserIds.includes(userId);

    return (
      <td className="text-center align-middle">
        <label className="custom-checkbox m-0">
          <input
            type="checkbox"
            className="child-checkbox"
            checked={isSelected}
            onChange={() => toggleUserSelection(userId)}
          />
          <span className="checkmark"></span>
        </label>
      </td>
    );
  };

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    const isSuccess = await updateStatusData(id, nextValue);
    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "manage-users",
              text: "Manage User",
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
            {selectedUserIds.length > 0 ? (
              <button
                type="button"
                className="btn main-btn border-btn danger-btn"
                onClick={() => openDeleteModal(selectedUserIds)}
              >
                Delete
              </button>
            ) : null}

            {/* <a href="#" className="btn main-btn border-btn blue-btn">
              Import
            </a> */}
            {/* 
            <a href="#" className="btn main-btn border-btn sky-btn">
              Export
            </a> */}

            {userPermission.canCreate && (
              <Link
                to={"/manage-users/add"}
                className="btn main-btn border-btn blue-btn"
              >
                Add Users
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div
            className="table-responsive"
            style={{ overflow: "visible" }}
            ref={gridRef}
          >
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
                style={{ width: "100%", overflow: "visible" }}
                data={users}
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                {/* Checkbox */}
                <GridColumn
                  width={getWidth("check")}
                  headerClassName="text-center"
                  cells={{
                    data: CheckboxCell,
                  }}
                />

                <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  headerClassName="text-center"
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={userPermission}
                        idField="id"
                        onEdit={(id) => navigate(`/manage-users/edit/${encryptUrlParam(id)}`)}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />

                <GridColumn
                  field="firstName"
                  title="First Name"
                  width={getWidth("firstName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="lastName"
                  title="Last Name"
                  width={getWidth("lastName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="userName"
                  title="User Name"
                  width={getWidth("userName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="roleName"
                  title="Role"
                  width={getWidth("roleName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="contactNumber"
                  title="Phone"
                  width={getWidth("contactNumber")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="email"
                  title="Email"
                  width={getWidth("email")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Status"
                  width={getWidth("status")}
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
              <CustomPager
                skip={page.skip}
                take={page.take}
                total={total}
                pageSizes={[5, 10, 20, 50, 100, 500]}
                buttonCount={4}
                previousNext
                firstLast
                info
                onPageChange={(e) => setPage(e.page)}
              />
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

export default ManageUser;

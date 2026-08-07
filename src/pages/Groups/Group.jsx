import React, { useEffect, useState } from "react";
import {
  deleteGroup,
  getGroupsData,
  updateGroupStatus,
} from "../../api/Group/group";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import AttachmentCell from "../../components/GridCells/AttachmentCell";
import StatusCell from "../../components/GridCells/StatusCell";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { TextCell } from "../../components/GridCells/TextCell";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { DateCell } from "../../components/GridCells/DateCell";
import { getMenuPermission } from "../../utils/permission";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { ActionCell } from "../../components/GridCells/ActionCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "groupName", minWidth: 180 },
  { field: "groupImageFullUrl", minWidth: 160 },
  { field: "about", minWidth: 240 },
  { field: "isPublic", minWidth: 140 },
  { field: "totalMember", minWidth: 120 },
  { field: "totalActivity", minWidth: 120 },
  { field: "totalReport", minWidth: 120 },
  { field: "userName", minWidth: 140 },
  { field: "createdOn", minWidth: 140 },
  { field: "status", minWidth: 90 },
];

function Group() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);
  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const navigate = useNavigate();

  const groupPermission = getMenuPermission("Group");

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

  useEffect(() => {
    fetchGroupData();
  }, [page, sort, search]);
  const fetchGroupData = async () => {
    const body = {
      Page: page.skip / page.take + 1,
      PageSize: page.take,
      Sorts: sort.map((s) => ({
        field: s.field,
        direction: s.dir === "asc" ? 0 : 1,
      })),
      CustomSearch: search,
    };
    try {
      const res = await getGroupsData(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const viewUserCell = (props) => {
    const userId = props.dataItem.createdBy;
    const userName = props.dataItem[props.field];
    return (
      <td {...props.tdProps}>
        <button
          title="userName"
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate(`/manage-end-users/view/${userId}`)}
        >
          {userName}
        </button>
      </td>
    );
  };

  const GroupTypeCell = (props) => {
    const value = props.dataItem[props.field] ?? "";
    const groupType = value ? "Public" : "Private";
    return (
      <td {...props.tdProps}>
        <span title={groupType}>{groupType}</span>
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

    const isSuccess = await updateGroupStatus(id, nextValue);
    await fetchGroupData();
    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteGroup(deleteId);

      closeDeleteModal();
      await fetchGroupData();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };

  const CountLinkCell = ({ dataItem, tdProps, field, getPath }) => {
    const value = dataItem[field] ?? 0;

    return (
      <td {...tdProps}>
        {value > 0 ? (
          <Link
            to={getPath(dataItem)}
            className="fw-semibold text-primary text-decoration-underline"
          >
            {value}
          </Link>
        ) : (
          <span className="fw-semibold">{value}</span>
        )}
      </td>
    );
  };

  return (
    <div className="row">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "groups",
              text: "Groups",
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
      </div>

      <div className="row w-100">
        <div className="col-12 mt-3 mt-xxl-4 w-100 ">
          <div
            className="table-responsive w-100"
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
                data={data}
                total={total}
                pageable={false}
                skip={page.skip}
                take={page.take}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                <GridColumn
                  width={getWidth("action")}
                  title="Action"
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={groupPermission}
                        idField="id"
                        onView={(id) => navigate(`/groups/view/${id}`)}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />
                <GridColumn
                  title="Group Name"
                  field="groupName"
                  width={getWidth("groupName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Group Image"
                  field="groupImageFullUrl"
                  width={getWidth("groupImageFullUrl")}
                  cells={{
                    data: (props) => <AttachmentCell {...props} />,
                  }}
                />

                <GridColumn
                  title="About Group"
                  field="about"
                  width={getWidth("about")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Group Type"
                  field="isPublic"
                  width={getWidth("isPublic")}
                  cells={{ data: GroupTypeCell }}
                />

                <GridColumn
                  title="Members"
                  field="totalMember"
                  width={getWidth("totalMember")}
                  cells={{
                    data: (props) => (
                      <CountLinkCell
                        {...props}
                        getPath={(item) => `/groups/view/${item.id}/members`}
                      />
                    ),
                  }}
                />

                <GridColumn
                  title="Activities"
                  field="totalActivity"
                  width={getWidth("totalActivity")}
                  cells={{
                    data: (props) => (
                      <CountLinkCell
                        {...props}
                        getPath={(item) => `/groups/activity/${item.id}`}
                      />
                    ),
                  }}
                />

                <GridColumn
                  title="Reported"
                  field="totalReport"
                  width={getWidth("totalReport")}
                />

                <GridColumn
                  title="Created By"
                  field="userName"
                  width={getWidth("userName")}
                  cells={{ data: viewUserCell }}
                />

                <GridColumn
                  title="Created On"
                  field="createdOn"
                  width={getWidth("createdOn")}
                  cells={{ data: DateCell }}
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

export default Group;

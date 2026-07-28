import React, { useEffect, useState } from "react";
import { getGroupsData, updateGroupStatus } from "../../api/Group/group";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import AttachmentCell from "../../components/GridCells/AttachmentCell";
import StatusCell from "../../components/GridCells/StatusCell";
import { Link, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearch(searchInput);
      setPage((prev) => ({
        ...prev,
        skip: 0,
      }));
    }, 500);
    return () => clearTimeout(timeOut);
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
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate(`/manage-end-users/view/${userId}`)}
        >
          {userName}
        </button>
      </td>
    );
  };

  const ActionCell = (props) => {
    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() => navigate(`/groups/view/${props.dataItem.id}`)}
          >
            <i className="fa fa-eye"></i>
          </button>

          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => handleDelete(props.dataItem.venueId)}
          >
            <i className="icon-delete-1"></i>
          </button>
        </div>
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

  const CountLinkCell = ({ dataItem, tdProps, field, getPath }) => {
    const value = dataItem[field] ?? 0;

    return (
      <td {...tdProps}>
        {value > 0 ? (
          <Link to={getPath(dataItem)} className="fw-semibold text-primary text-decoration-underline" >
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
        <h3>Group</h3>
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
          >
            <Grid
              data={data}
              total={total}
              pageable={{
                buttonCount: 5,
                pageSizes: [5, 10, 20],
                info: true,
                previousNext: true,
              }}
              skip={page.skip}
              take={page.take}
              onPageChange={(e) => setPage(e.page)}
              sortable
              sort={sort}
              onSortChange={(e) => setSort(e.sort)}
            >
              <GridColumn title="Action" cells={{ data: ActionCell }} />
              <GridColumn title="Group Name" field="groupName" />
              <GridColumn
                title="Group Image"
                field="groupImageFullUrl"
                cells={{
                  data: (props) => <AttachmentCell {...props} />,
                }}
              />
              <GridColumn title="About Group" field="about" />
              <GridColumn
                title="Group Type"
                field="isPublic"
                cells={{ data: GroupTypeCell }}
              />
              <GridColumn
                title="Members"
                field="totalMember"
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
                title="activities"
                field="totalActivity"
                cells={{
                  data: (props) => (
                    <CountLinkCell
                      {...props}
                      getPath={(item) => `/groups/activity/${item.id}`}
                    />
                  ),
                }}
              />
              <GridColumn title="Reported" field="totalReport" />
              <GridColumn
                title="Created By"
                field="userName"
                cells={{ data: viewUserCell }}
              />
              <GridColumn title="Created On" field="createdOn" />
              <GridColumn
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;

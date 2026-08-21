import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivities } from "../../api/EndUsers/endUserViewApi";
import { Tooltip } from "@progress/kendo-react-tooltip";
import StatusCell from "../../components/GridCells/StatusCell";
import { DateCell } from "../../components/GridCells/DateCell";
import { updatePostStatus } from "../../api/Activity/activity";
import AttachmentCell from "../../components/GridCells/AttachmentCell";
import { TextCell } from "../../components/GridCells/TextCell";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { getMenuPermission } from "../../utils/permission";
import { ActionCell } from "../../components/GridCells/ActionCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";
import { decryptUrlParam, encryptUrlParam } from "../../utils/crypto";
import useStatusConfirmation from "../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../components/Modal/StatusConfirmationModal";
import { hasAction } from "../../utils/hasAction";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "userName", minWidth: 180 },
  { field: "uploadedDate", minWidth: 140 },
  { field: "attachmentList", minWidth: 220 },
  { field: "post", minWidth: 250 },
  { field: "totalLike", minWidth: 100 },
  { field: "totalComment", minWidth: 110 },
  { field: "totalShare", minWidth: 100 },
  { field: "totalReport", minWidth: 120 },
  { field: "status", minWidth: 90 },
];

function GroupActivity() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [sort,setSort]=useState([])
  const { id } = useParams();
  const groupId=decryptUrlParam(id)
  const navigate = useNavigate();
  const activityPermission = getMenuPermission("Activity");

  const onView=true

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const {
    showStatusModal,
    statusId,
    currentStatus,
    isUpdatingStatus,
    setIsUpdatingStatus,
    openStatusModal,
    closeStatusModal,
  } = useStatusConfirmation();

  useEffect(() => {
    fetchGroupActivity();
  }, [page,sort,search]);
  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchInput);

    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
  };

  const fetchGroupActivity = async () => {
    const body = {
      Page: page.skip / page.take + 1,
      pageSize: page.take,
      Sorts:sort.map((s)=>({
        field:s.field,
        direction:s.dir==='asc'?0:1,
      })),
      search,
      Filters: [
        {
          Field: "groupId",
          OperatorType: 2,
          Value: groupId,
        },
      ],
    };
    try {
      const res = await getActivities(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateStatusToggle = async (postId, isActive) => {
    try {
      const res = await updatePostStatus(postId, isActive);
      fetchGroupActivity();
      return res;
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleStatusToggle = async () => {
    if (!statusId) return;

    const nextValue = !currentStatus;

    try {
      setIsUpdatingStatus(true);

      const isSuccess = await updateStatusToggle(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await fetchGroupActivity();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="row">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "groups",
              text: "Groups",
              path: "/groups",
            },

            {
              id: "group-activity",
              text: "Group Activity",
            },
          ]}
        />
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
            role="search"
            onSubmit={handleSearch}
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
              type="submit"
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
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                {hasAction(activityPermission,onView) && <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  headerClassName="text-center"
                  sortable={false}
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={activityPermission}
                        idField="postId"
                        onView={(id) => navigate(`/activity/view/${encryptUrlParam(id)}`)}
                      />
                    ),
                  }}
                />}

                <GridColumn
                  field="userName"
                  title="Uploaded By"
                  width={getWidth("userName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Uploaded Date"
                  width={getWidth("uploadedDate")}
                  cells={{ data: DateCell }}
                />

                <GridColumn
                  field="attachmentList"
                  title="Image/Video"
                  sortable={false}
                  width={getWidth("attachmentList")}
                  cells={{ data: AttachmentCell }}
                />

                <GridColumn
                  field="post"
                  title="Description"
                  width={getWidth("post")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="totalLike"
                  title="Likes"
                  width={getWidth("totalLike")}
                />

                <GridColumn
                  field="totalComment"
                  title="Comments"
                  width={getWidth("totalComment")}
                />

                <GridColumn
                  field="totalShare"
                  title="Share"
                  width={getWidth("totalShare")}
                />

                <GridColumn
                  field="totalReport"
                  title="Reported"
                  width={getWidth("totalReport")}
                />

                <GridColumn
                  title="Status"
                  width={getWidth("status")}
                  field="isActive"
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="postId"
                        onToggle={openStatusModal}
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
      <StatusConfirmationModal
        show={showStatusModal}
        onClose={closeStatusModal}
        onConfirm={handleStatusToggle}
        isUpdatingStatus={isUpdatingStatus}
      />
    </div>
  );
}

export default GroupActivity;

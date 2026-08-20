import React, { useEffect, useState } from "react";
import image1 from "../../assets/images/gallery-1.png";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { getActivities } from "../../api/EndUsers/endUserViewApi";
import AttachmentCell from "../../components/GridCells/AttachmentCell";
import AttachmentViewerModal from "../../components/Modal/AttachmentViewerModal";
import { useLocation, useNavigate } from "react-router-dom";
import { DateCell } from "../../components/GridCells/DateCell";
import StatusCell from "../../components/GridCells/StatusCell";
import { updatePostStatus } from "../../api/Activity/activity";
import ReportListModal from "../../components/Modal/ReportListModal";
import useAttachmentViewer from "../../hooks/useAttachmentViewer";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { DetailsCell } from "../../components/GridCells/DetailsCell";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { getMenuPermission } from "../../utils/permission";
import { ActionCell } from "../../components/GridCells/ActionCell";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";
import { encryptUrlParam } from "../../utils/crypto";
import useStatusConfirmation from "../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../components/Modal/StatusConfirmationModal";
import { hasAction } from "../../utils/hasAction";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "userName", minWidth: 140 },
  { field: "createdOn", minWidth: 140 },
  { field: "postTypeName", minWidth: 140 },
  { field: "attachmentList", minWidth: 220 },
  { field: "post", minWidth: 250 },
  { field: "rate", minWidth: 100 },
  { field: "totalGun", minWidth: 100 },
  { field: "totalLike", minWidth: 100 },
  { field: "totalComment", minWidth: 110 },
  { field: "totalShare", minWidth: 100 },
  { field: "totalHide", minWidth: 110 },
  { field: "totalReport", minWidth: 120 },
  { field: "status", minWidth: 90 },
];

function Activity() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const [sort, setSort] = useState(location.state?.sort || []);

  const [showReport, setShowReport] = useState(false);
  const [reportedIdData, setReportedIdData] = useState("");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const {
    showViewer,
    attachments,
    currentIndex,
    setCurrentIndex,
    openViewer,
    closeViewer,
  } = useAttachmentViewer();

  const {
    showStatusModal,
    statusId,
    currentStatus,
    isUpdatingStatus,
    setIsUpdatingStatus,
    openStatusModal,
    closeStatusModal,
  } = useStatusConfirmation();

  const activityPermission = getMenuPermission("Activity");
  const onView=true
  const navigate = useNavigate();

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
    getActivitiesData();
  }, [page, sort, search]);

  const getActivitiesData = async () => {
    console.log("getActivitiesData called");
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
      const res = await getActivities(body);
      console.log(res);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleStatusToggle = async () => {
    if (!statusId) return;

    const nextValue = !currentStatus;

    try {
      setIsUpdatingStatus(true);

      const isSuccess = await updatePostStatus(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await getActivitiesData();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const viewUserCell = (props) => {
    const userId = props.dataItem.userId;
    const userName = props.dataItem[props.field];
    return (
      <td {...props.tdProps}>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate(`/manage-end-users/view/${encryptUrlParam(userId)}`)}
        >
          {userName}
        </button>
      </td>
    );
  };
  const viewDetailCell = (props) => {
    const postId = props.dataItem.postId;
    const field = props.field;

    const value = props.dataItem[field];
    return (
      <td {...props.tdProps}>
        {value === 0 ? (
          <span>{value}</span>
        ) : (
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate(`/activity/view/${postId}`)}
          >
            {value}
          </button>
        )}
      </td>
    );
  };

  const ReportedDataCell = (props) => {
    const value = props.dataItem.totalReport;
    const reportedId = props.dataItem.postId;

    return (
      <td {...props.tdProps}>
        {value > 0 ? (
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => handleReportClick(reportedId)}
          >
            {value}
          </button>
        ) : (
          value
        )}
      </td>
    );
  };

  const handleReportClick = async (reportedId) => {
    //  console.log("Clicked ID:", reportedId);

    setReportedIdData(reportedId);
    // console.log("ReportedId is :",reportedId)
    setShowReport(true);
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "activity",
              text: "Activity",
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
                style={{ width: "100%", overflow: "visible" }}
                data={data}
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                {hasAction(activityPermission,onView) && <GridColumn
                  title="Actions"
                  width={getWidth('action')}
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
                  title="Post Type"
                  field="postTypeName"
                  width={getWidth("postTypeName")}
                />

                <GridColumn
                  title="Image/Video"
                  field="attachmentList"
                  width={getWidth("attachmentList")}
                  sortable={false}
                  cells={{
                    data: (props) => (
                      <AttachmentCell {...props} onOpen={openViewer} />
                    ),
                  }}
                />

                <GridColumn
                  title="Description"
                  field="post"
                  width={getWidth("post")}
                  cells={{ data: DetailsCell }}
                />

                <GridColumn
                  title="Ratings"
                  field="rate"
                  width={getWidth("rate")}
                />

                <GridColumn
                  title="Guns"
                  field="totalGun"
                  width={getWidth("totalGun")}
                />

                <GridColumn
                  title="Likes"
                  field="totalLike"
                  width={getWidth("totalLike")}
                  cells={{ data: viewDetailCell }}
                />

                <GridColumn
                  title="Comments"
                  field="totalComment"
                  width={getWidth("totalComment")}
                  cells={{ data: viewDetailCell }}
                />

                <GridColumn
                  title="Shares"
                  field="totalShare"
                  width={getWidth("totalShare")}
                  cells={{ data: viewDetailCell }}
                />

                <GridColumn
                  title="Hide Count"
                  field="totalHide"
                  width={getWidth("totalHide")}
                  cells={{ data: viewDetailCell }}
                />

                <GridColumn
                  title="Reported"
                  field="totalReport"
                  width={getWidth("totalReport")}
                  cells={{ data: ReportedDataCell }}
                />

                <GridColumn
                  title="Status"
                  width={getWidth("status")}
                  sortable={true}
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
      <AttachmentViewerModal
        show={showViewer}
        onClose={closeViewer}
        attachments={attachments}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <ReportListModal
        show={showReport}
        reportedId={reportedIdData}
        onClose={() => setShowReport(false)}
      />

      <StatusConfirmationModal
        show={showStatusModal}
        onClose={closeStatusModal}
        onConfirm={handleStatusToggle}
        isUpdatingStatus={isUpdatingStatus}
      />
    </div>
  );
}

export default Activity;

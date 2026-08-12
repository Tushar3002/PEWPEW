import React, { useEffect, useState } from "react";
import {
  getActivitiesinVenue,
  updateActivitiesStatus,
} from "../../../api/EndUsers/endUserViewApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { TextCell } from "../../../components/GridCells/TextCell";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { DateCell } from "../../../components/GridCells/DateCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import AttachmentViewerModal from "../../../components/Modal/AttachmentViewerModal";
import AttachmentCell from "../../../components/GridCells/AttachmentCell";
import { useNavigate } from "react-router-dom";
import useAttachmentViewer from "../../../hooks/useAttachmentViewer";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import { getMenuPermission } from "../../../utils/permission";
import CustomPager from "../../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";

const columns = [
  { field: "action", minWidth: 120 },
  { field: "userName", minWidth: 180 },
  { field: "createdOn", minWidth: 160 },
  { field: "attachmentList", minWidth: 300 },
  { field: "rate", minWidth: 120 },
  { field: "totalGun", minWidth: 100 },
  { field: "totalLike", minWidth: 110 },
  { field: "totalComment", minWidth: 130 },
  { field: "totalShare", minWidth: 120 },
  { field: "totalHide", minWidth: 130 },
  { field: "totalReport", minWidth: 120 },
  { field: "status", minWidth: 120 },
];

function ActivityTabs({ userId }) {
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const activityPermission = getMenuPermission("Activity");

  const { getWidth, gridRef } = useResponsiveGridWidths(columns);
  const {
    showViewer,
    attachments,
    currentIndex,
    setCurrentIndex,
    openViewer,
    closeViewer,
  } = useAttachmentViewer();

  useEffect(() => {
    getActivitiesData();
  }, [page]);
  const getActivitiesData = async () => {
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      venueId: userId,
      search: "",
    };
    //   console.log("Activities body:", body);
    try {
      const res = await getActivitiesinVenue(body);
      console.log(res);
      setActivities(res.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateStatusToggle = async (postId, isActive) => {
    try {
      const res = await updateActivitiesStatus(postId, isActive);
      getActivitiesData();
      return res;
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    const isSuccess = await updateStatusToggle(id, nextValue);

    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  return (
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
              data={activities}
              pageable={false}
              skip={page.skip}
              take={page.take}
              total={total}
            >
              <GridColumn
                title="Actions"
                width={getWidth("action")}
                cells={{
                  data: (props) => (
                    <ActionCell
                      {...props}
                      permission={activityPermission}
                      idField="postId"
                      onView={(id) => navigate(`/activity/view/${id}`)}
                    />
                  ),
                }}
              />

              <GridColumn
                title="Uploaded By"
                field="userName"
                width={getWidth("userName")}
                cells={{ data: TextCell }}
              />

              <GridColumn
                title="Uploaded Date"
                field="createdOn"
                width={getWidth("createdOn")}
                cells={{ data: DateCell }}
              />

              <GridColumn
                width={getWidth("attachmentList")}
                title="Image/Video"
                field="attachmentList"
                cells={{
                  data: (props) => (
                    <AttachmentCell {...props} onOpen={openViewer} />
                  ),
                }}
              />

              <GridColumn
                title="Ratings"
                field="rate"
                width={getWidth("rate")}
              />

              <GridColumn
                title="Gun"
                field="totalGun"
                width={getWidth("totalGun")}
              />

              <GridColumn
                title="Likes"
                field="totalLike"
                width={getWidth("totalLike")}
              />

              <GridColumn
                title="Comments"
                field="totalComment"
                width={getWidth("totalComment")}
              />

              <GridColumn
                title="Shares"
                field="totalShare"
                width={getWidth("totalShare")}
              />

              <GridColumn
                title="Hide Count"
                field="totalHide"
                width={getWidth("totalHide")}
              />

              <GridColumn
                title="Reported"
                field="totalReport"
                width={getWidth("totalReport")}
              />

              <GridColumn
                title="Status"
                width={getWidth("status")}
                cells={{
                  data: (props) => (
                    <StatusCell
                      {...props}
                      idField="postId"
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

          <AttachmentViewerModal
            show={showViewer}
            onClose={closeViewer}
            attachments={attachments}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default ActivityTabs;

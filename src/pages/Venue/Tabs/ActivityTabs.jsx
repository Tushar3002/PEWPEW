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

function ActivityTabs({ userId }) {
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total,setTotal]=useState(0)
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const activityPermission = getMenuPermission("Activity");
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
      setTotal(res.data.totalRecord)
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
    <div>
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
            cells={{ data: TextCell }}
          />
          <GridColumn
            title="Uploaded Date"
            field="createdOn"
            cells={{ data: DateCell }}
          />
          <GridColumn
            width={"300px"}
            title="Image/Video"
            field="attachmentList"
            cells={{
              data: (props) => (
                <AttachmentCell {...props} onOpen={openViewer} />
              ),
            }}
          />
          <GridColumn title="Ratings" field="rate" />
          <GridColumn title="Gun" field="totalGun" />
          <GridColumn title="Likes" field="totalLike" />
          <GridColumn title="Comments" field="totalComment" />
          <GridColumn title="Shares" field="totalShare" />
          <GridColumn title="Hide Count" field="totalHide" />
          <GridColumn title="Reported" field="totalReport" />
          <GridColumn
            title="Status"
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
  );
}

export default ActivityTabs;

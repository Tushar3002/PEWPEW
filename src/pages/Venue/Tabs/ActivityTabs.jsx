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

function ActivityTabs({ userId }) {
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

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
  }, []);
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
    } catch (error) {
      console.log(error.response);
    }
  };
  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() => navigate(`/activity/view/${props.dataItem.postId}`)}
          >
            <i className="fa fa-eye"></i>
          </button>
        </div>
      </td>
    );
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
        <Grid data={activities}>
          <GridColumn title="Actions" cells={{ data: ActionCell }} />
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

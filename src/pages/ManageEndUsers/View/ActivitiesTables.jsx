import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import {
  getActivities,
  updateActivitiesStatus,
} from "../../../api/EndUsers/endUserViewApi";
import AttachmentViewerModal from "../../../components/Modal/AttachmentViewerModal";
import ReportListModal from "../../../components/Modal/ReportListModal";
import { useNavigate } from "react-router-dom";
import { TextCell } from "../../../components/GridCells/TextCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import { DateCell } from "../../../components/GridCells/DateCell";
import useAttachmentViewer from "../../../hooks/useAttachmentViewer";
import AttachmentCell from "../../../components/GridCells/AttachmentCell";
import { getMenuPermission } from "../../../utils/permission";
import { ActionCell } from "../../../components/GridCells/ActionCell";

function ActivitiesTables({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [showReport, setShowReport] = useState(false);
  const [reportedIdData, setReportedIdData] = useState("");

  const {
    showViewer,
    attachments,
    currentIndex,
    setCurrentIndex,
    openViewer,
    closeViewer,
  } = useAttachmentViewer();

  const activityPermission=getMenuPermission('Activity')

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);

      setPage((prev) => ({
        ...prev,
        skip: 0,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchActivities();
  }, [page, userId]);

  const fetchActivities = async () => {
    console.log("UserID", userId);

    const body = {
      page: page.skip / page.take + 1,
      pageSize: page.take,
      sorts: [],
      Filters: [
        {
          Field: "userId",
          OperatorType: 2,
          Value: userId,
        },
      ],
      customSearch: search,
    };
    try {
      const res = await getActivities(body);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
      console.log("Activities Data", res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleReportClick = async (reportedId) => {
    //  console.log("Clicked ID:", reportedId);

    setReportedIdData(reportedId);
    // console.log("ReportedId is :",reportedId)
    setShowReport(true);
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

  const updateStatusToggle = async (gunId, isActive) => {
    try {
      const res = await updateActivitiesStatus(gunId, isActive);
      fetchActivities();
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
    <div className="tabbar-section">
      <div className="col-12 col-lg-auto">
        <form className="d-md-flex searchbar align-items-center" role="search">
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
      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div className="table-responsive" style={{ overflow: "visible" }}>
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
                data={data}
                pageable={{
                  buttonCount: 4,
                  pageSizes: [5, 10, 20, 50, 100, 500],
                  info: true,
                  previousNext: true,
                }}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
              >
                <GridColumn
                  title="Action"
                  headerClassName="text-center"
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
                <GridColumn title="Created On" cells={{ data: DateCell }} />
                <GridColumn
                  // width={"180px"}
                  field="postTypeName"
                  title="Post Type"
                  // columnMenu={ColumnMenu}
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  width={"250px"}
                  field="attachmentList"
                  title="Image/Video"
                  cells={{
                    data: (props) => (
                      <AttachmentCell {...props} onOpen={openViewer} />
                    ),
                  }}
                />
                <GridColumn
                  field="post"
                  title="Description"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="rate"
                  title="Ratings"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="totalGun"
                  title="Guns"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="totalLike"
                  title="Likes"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="totalComment"
                  title="Comments"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="totalShare"
                  title="Share"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="totalHide"
                  title="Hide Count"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  // field="totalReport"
                  title="Reported"
                  cells={{ data: ReportedDataCell }}
                />

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
    </div>
  );
}

export default ActivitiesTables;

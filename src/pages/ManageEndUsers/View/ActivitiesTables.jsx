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

function ActivitiesTables({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  const navigate=useNavigate()
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [showViewer, setShowViewer] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showReport, setShowReport] = useState(false);
  const [reportedIdData, setReportedIdData] = useState("");

  const openViewer = (files, index) => {
    setAttachments(files);
    setCurrentIndex(index);
    setShowViewer(true);
  };

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

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">

          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() =>
              navigate(`/activity/view/${props.dataItem.postId}`)
            }
          >
            <i className="fa fa-eye"></i>
          </button>
          
        </div>
      </td>
    );
  };


  const AttachmentCell = (props) => {
    const attachments = props.dataItem.attachmentList || [];

    const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

    return (
      <td>
        {attachments.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "6px",
            }}
          >
            {attachments.map((file, index) =>
              isVideo(file) ? (
                <div
                  onClick={() => openViewer(attachments, index)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                  key={index}
                >
                  <video
                    style={{
                      width: "100%",
                      height: "70px",
                      objectFit: "cover",
                      pointerEvents: "none",
                    }}
                  >
                    <source src={file} />
                  </video>

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      fontSize: "24px",
                      background: "rgba(0,0,0,0.2)",
                    }}
                  >
                    ▶
                  </div>
                </div>
              ) : (
                <img
                  key={index}
                  src={file}
                  alt={`Attachment ${index + 1}`}
                  onClick={() => openViewer(attachments, index)}
                  style={{
                    width: "100%",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              ),
            )}
          </div>
        ) : (
          "-"
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
        <form
          className="d-md-flex searchbar align-items-center"
          role="search"
          noValidate
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
                  pageSizes: [5, 10, 20],
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
                    data: ActionCell,
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
                  cells={{ data: AttachmentCell }}
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
        onClose={() => setShowViewer(false)}
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

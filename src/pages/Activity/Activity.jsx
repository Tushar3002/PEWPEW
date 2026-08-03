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

  const {
    showViewer,
    attachments,
    currentIndex,
    setCurrentIndex,
    openViewer,
    closeViewer,
  } = useAttachmentViewer();

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

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    const isSuccess = await updatePostStatus(id, nextValue);
    await getActivitiesData();
    if (!isSuccess) {
      alert("Failed to update status.");
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
          onClick={() => navigate(`/manage-end-users/view/${userId}`)}
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
              pageable={{
                buttonCount: 5,
                pageSizes: [5, 10, 20, 50, 100, 500],
                info: true,
                previousNext: true,
              }}
              skip={page.skip}
              take={page.take}
              total={total}
              onPageChange={(e) => setPage(e.page)}
              sortable
              sort={sort}
              onSortChange={(e) => setSort(e.sort)}
            >
              <GridColumn
                title="Actions"
                width={"95px"}
                cells={{ data: ActionCell }}
              />
              <GridColumn
                title="Created By"
                width={"150px"}
                field="userName"
                cells={{ data: viewUserCell }}
              />
              <GridColumn
                title="Created On"
                width={"150px"}
                field="createdOn"
                cells={{ data: DateCell }}
              />
              <GridColumn
                title="Post Type"
                width={"150px"}
                field="postTypeName"
              />
              <GridColumn
                width={"225px"}
                title="Image/Video"
                field="attachmentList"
                cells={{
                  data: (props) => (
                    <AttachmentCell {...props} onOpen={openViewer} />
                  ),
                }}
              />
              <GridColumn width={"240px"} title="Description" field="post" cells={{data:DetailsCell}}/>
              <GridColumn width={"120px"} title="Ratings" field="rate" />
              <GridColumn width={"120px"} title="Guns" field="totalGun" />
              <GridColumn
                width={"120px"}
                title="Likes"
                field="totalLike"
                cells={{ data: viewDetailCell }}
              />
              <GridColumn
                width={"120px"}
                title="Comments"
                field="totalComment"
                cells={{ data: viewDetailCell }}
              />
              <GridColumn
                width={"120px"}
                title="Shares"
                field="totalShare"
                cells={{ data: viewDetailCell }}
              />
              <GridColumn
                width={"120px"}
                title="Hide Count"
                field="totalHide"
                cells={{ data: viewDetailCell }}
              />
              <GridColumn
                width={"120px"}
                title="Reported"
                field="totalReport"
                cells={{ data: ReportedDataCell }}
              />
              <GridColumn
                width={"120px"}
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

export default Activity;

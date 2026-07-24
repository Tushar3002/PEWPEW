import React, { useEffect, useState } from "react";
import { gunListByUser, updateGunStatus } from "../../../api/EndUsers/endUserViewApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import AttachmentViewerModal from "../../../components/Modal/AttachmentViewerModal";

function UploadGunsTable({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [search, setSearch] = useState("");

  const [showViewer, setShowViewer] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const openViewer = (files, index) => {
      setAttachments(files);
      setCurrentIndex(index);
      setShowViewer(true);
    };

  useEffect(() => {
    fetchUploadGun();
  }, [page, userId]);

  const fetchUploadGun = async () => {
    console.log("UserID", userId);

    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      search: search,
      userId,
    };
    try {
      const res = await gunListByUser(body);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
      console.log(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex  align-items-center gap-2">
          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => handleDelete(props.dataItem.gunId)}
          >
            <i className="icon-delete-1"></i>
          </button>
        </div>
      </td>
    );
  };

  const updateStatusData=async(id,isActive)=>{
    try {
      const res=await updateGunStatus(id,isActive)
      fetchUploadGun()
      return res
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

      const confirmed = window.confirm(
        `Are you sure you want to ${
          nextValue ? "activate" : "deactivate"
        } this role?`,
      );

      if (!confirmed) return;
    
    const isSuccess = await updateStatusData(id, nextValue);
    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  const StatusCell = (props) => (
    <td className="text-center align-middle">
      <div className="form-check form-switch d-inline-flex align-items-center m-0">
        <input
          className="form-check-input"
          type="checkbox"
          checked={Boolean(props.dataItem.isActive)}
          onChange={() =>
            handleStatusToggle(
              props.dataItem.gunId,
              Boolean(props.dataItem.isActive),
            )
          }
        />
      </div>
    </td>
  );
  const DetailsCell = (props) => {
    const value = props.dataItem.details || "";

    return (
      <td>
        <span
          title={value}
          style={{
            display: "block",
            maxWidth: "140px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </span>
      </td>
    );
  };
  const ImageCell = (props) => {
    const image = props.dataItem.attachmentFullPath;

    return (
      <td className="text-center">
        {image ? (
          <img
            src={image}
            alt="Gun"
            onClick={() => openViewer([image],0)}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          "-"
        )}
      </td>
    );
  };

  const DateCell = (props) => {
    const date = props.dataItem.createdDate;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-GB")
      : "-";

    return (
      <td {...props.tdProps}>
        <span title={formattedDate}>{formattedDate}</span>
      </td>
    );
  };

  const ApprovalStatusCell = (props) => {
    const status = props.dataItem.approvalStatus;

    let text = "Pending";

    if (status === 1) text = "Accepted";
    if (status === 2) text = "Rejected";

    return <td>{text}</td>;
  };

  const TextCell = (props) => {
    const value = props.dataItem[props.field] ?? "";

    return (
      <td {...props.tdProps}>
        <span
          title={value}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "100%" }}
        >
          {value}
        </span>
      </td>
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteGunUser(id);
      fetchUploadGun();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="tabbar-section">
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
                  buttonCount: 5,
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
                width={"120px"}
                  title="Action"
                  headerClassName="text-center"
                  cells={{
                    data: ActionCell,
                  }}
                />
                <GridColumn
                  // width={"180px"}
                  field="gunName"
                  title="Gun Name"
                  // columnMenu={ColumnMenu}
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="categoryNames"
                  title="Category Name"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  field="manufacturerNames"
                  title="Manufacturer Name"
                  cells={{ data: TextCell }}
                />
                <GridColumn title="Details" cells={{ data: DetailsCell }} />
                <GridColumn title="Images" cells={{ data: ImageCell }} />
                <GridColumn
                  field="ammunitions"
                  title="Ammunition"
                  cells={{ data: TextCell }}
                />
                <GridColumn title="Created On" cells={{ data: DateCell }} />
                <GridColumn
                  title="Approval Status"
                  cells={{ data: ApprovalStatusCell }}
                />

                <GridColumn
                  title="Status"
                  cells={{
                    data: StatusCell,
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
    </div>
  );
}

export default UploadGunsTable;

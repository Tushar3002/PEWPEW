import React, { useEffect, useState } from "react";
import {
  deleteGunUser,
  gunListByUser,
  updateGunStatus,
} from "../../../api/EndUsers/endUserViewApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import AttachmentViewerModal from "../../../components/Modal/AttachmentViewerModal";
import { TextCell } from "../../../components/GridCells/TextCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import { DetailsCell } from "../../../components/GridCells/DetailsCell";
import { DateCell } from "../../../components/GridCells/DateCell";
import AttachmentCell from "../../../components/GridCells/AttachmentCell";
import useAttachmentViewer from "../../../hooks/useAttachmentViewer";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import { getMenuPermission } from "../../../utils/permission";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import CustomPager from "../../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";
import { hasAction } from "../../../utils/hasAction";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "gunName", minWidth: 180 },
  { field: "categoryNames", minWidth: 200 },
  { field: "manufacturerNames", minWidth: 220 },
  { field: "details", minWidth:250 },
  { field: "attachmentFullPath", minWidth: 120 },
  { field: "ammunitions", minWidth: 180 },
  { field: "createdOn", minWidth: 140 },
  { field: "approvalStatus", minWidth: 180 },
  { field: "status", minWidth: 90 },
];

function UploadGunsTable({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [search, setSearch] = useState("");
  const {
    showViewer,
    attachments,
    currentIndex,
    setCurrentIndex,
    openViewer,
    closeViewer,
  } = useAttachmentViewer();

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();



  const gunPermission = getMenuPermission("GunMaster");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  useEffect(() => {
    fetchUploadGun();
  }, [page, userId]);

  const fetchUploadGun = async () => {
    // console.log("UserID", userId);

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

  const updateStatusData = async (id, isActive) => {
    try {
      const res = await updateGunStatus(id, isActive);
      fetchUploadGun();
      return res;
    } catch (error) {
      console.log(error.response);
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

    const isSuccess = await updateStatusData(id, nextValue);
    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };

  const ApprovalStatusCell = (props) => {
    const status = props.dataItem.approvalStatus;

    let text = "Pending";

    if (status === 1) text = "Accepted";
    if (status === 2) text = "Rejected";

    return <td>{text}</td>;
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteGunUser(deleteId);

      closeDeleteModal();
      await fetchUploadGun();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="tabbar-section">
      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div className="table-responsive" style={{ overflow: "visible" }} ref={gridRef}>
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
                onPageChange={(e) => setPage(e.page)}
              >
                {hasAction(gunPermission)&&<GridColumn
                  title="Action"
                  width={getWidth("action")}
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={gunPermission}
                        idField="gunId"
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />}

                <GridColumn
                  field="gunName"
                  title="Gun Name"
                  width={getWidth("gunName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="categoryNames"
                  title="Category Name"
                  width={getWidth("categoryNames")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="manufacturerNames"
                  title="Manufacturer Name"
                  width={getWidth("manufacturerNames")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Details"
                  width={getWidth("details")}
                  cells={{ data: DetailsCell }}
                />

                <GridColumn
                  title="Images"
                  field="attachmentFullPath"
                  width={getWidth("attachmentFullPath")}
                  cells={{
                    data: (props) => (
                      <AttachmentCell {...props} onOpen={openViewer} />
                    ),
                  }}
                />

                <GridColumn
                  field="ammunitions"
                  title="Ammunition"
                  width={getWidth("ammunitions")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Created On"
                  width={getWidth("createdOn")}
                  cells={{ data: DateCell }}
                />

                <GridColumn
                  title="Approval Status"
                  width={getWidth("approvalStatus")}
                  cells={{ data: ApprovalStatusCell }}
                />

                <GridColumn
                  title="Status"
                  width={getWidth("status")}
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="gunId"
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
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default UploadGunsTable;

import React, { useEffect, useState } from "react";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import {
  deleteGunById,
  getGunList,
  updateGunApprovalStatus,
} from "../../../api/Gun/gunApi";
import { GunMasterModal } from "../../../components/Modal/GunMasterModal";
import { updateGunStatus } from "../../../api/EndUsers/endUserViewApi";
import Breadcrumbs from "../../../components/BreadCrumbs/Breadcrumbs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { DateCell } from "../../../components/GridCells/DateCell";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import StatusCell from "../../../components/GridCells/StatusCell";
import { TextCell } from "../../../components/GridCells/TextCell";
import AttachmentCell from "../../../components/GridCells/AttachmentCell";
import useAttachmentViewer from "../../../hooks/useAttachmentViewer";
import AttachmentViewerModal from "../../../components/Modal/AttachmentViewerModal";
import { ApprovalStatusDropdownCell } from "../../../components/GridCells/ApprovalStatusDropdownCell";
import { getGunApprovalStatus } from "../../../api/Common/commonApi";
import { getMenuPermission } from "../../../utils/permission";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";
import CustomPager from "../../../components/Pagnation/CustomPager";
import useStatusConfirmation from "../../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../../components/Modal/StatusConfirmationModal";
import { hasAction } from "../../../utils/hasAction";


const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "gunName", minWidth: 180 },
  { field: "categoryNames", minWidth: 200 },
  { field: "manufacturerNames", minWidth: 220 },
  { field: "details", minWidth: 250 },
  { field: "attachmentFullPath", minWidth: 110 },
  { field: "ammunitions", minWidth: 180 },
  { field: "createdDate", minWidth: 140 },
  { field: "updatedByUserName", minWidth: 140 },
  { field: "approvalStatus", minWidth: 170 },
  { field: "status", minWidth: 90 },
];

function GunMaster() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState([]);

  const [showGunModal, setShowGunModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [approvalStatusDropdown, setApprovalStatusDropdown] = useState([]);

  const gunMasterPermission = getMenuPermission("GunMaster");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

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

  useEffect(() => {
    fetchGuns();
    getApprovalStatusList();
  }, [page, sort, search]);

  const fetchGuns = async () => {
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
      const res = await getGunList(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setShowGunModal(true);
  };

  const handleCloseModal = () => {
    setShowGunModal(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteGunById(deleteId);

      closeDeleteModal();
      await fetchGuns();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };
  const getApprovalStatusList = async () => {
    try {
      const res = await getGunApprovalStatus();
      console.log(res.data);
      setApprovalStatusDropdown(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleApprovalStatusChange = async (gunId, statusId) => {
    try {
      const body = {
        gunId,
        reason: "",
        statusId,
      };

      await updateGunApprovalStatus(body);
      await fetchGuns();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleStatusToggle = async () => {
    if (!statusId) return;

    const nextValue = !currentStatus;

    try {
      setIsUpdatingStatus(true);

      const isSuccess = await updateGunStatus(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await fetchGuns();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission/reload
    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
    setSearch(searchInput);
  };

  const StatusDropdownCell = (props) => {
    const currentStatus = props.dataItem?.[props.field] ?? "";

    return (
      <td {...props.tdProps}>
        <select
          className="form-select"
          value={currentStatus}
          disabled={props.dataItem.isCreateAdmin}
          onChange={(e) => {
            const selectedStatus = approvals.find(
              (approval) => approval.description === e.target.value,
            );

            console.log("Selected approval:", selectedStatus);
          }}
        >
          {approvals.map((approval) => (
            <option key={approval.id} value={approval.description}>
              {approval.description}
            </option>
          ))}
        </select>
      </td>
    );
  };
  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "master",
              text: "Masters",
            },
            {
              id: "prohibited-words",
              text: "Gun Master",
            },
          ]}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mt-3 mt-xxl-4 mb-3">
            <form
              className="d-flex searchbar align-items-center"
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

            {gunMasterPermission.canCreate && (<button
              type="button"
              className="btn main-btn "
              onClick={() => {
                setSelectedId(null);
                setShowGunModal(true);
              }}
            >
              Add
            </button>)}
          </div>

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
                {hasAction(gunMasterPermission) && <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  sortable={false}
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={gunMasterPermission}
                        idField="gunId"
                        onEdit={handleEdit}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />}
                <GridColumn
                  title="Gun Name"
                  field="gunName"
                  width={getWidth("gunName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Category Name"
                  field="categoryNames"
                  width={getWidth("categoryNames")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Manyfacturer Name"
                  field="manufacturerNames"
                  width={getWidth("manufacturerNames")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Details"
                  field="details"
                  width={getWidth("details")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Images"
                  field="attachmentFullPath"
                  sortable={false}                
                  width={getWidth("attachmentFullPath")}
                  cells={{
                    data: (props) => (
                      <AttachmentCell {...props} onOpen={openViewer} />
                    ),
                  }}
                />

                <GridColumn
                  title="Ammunition"
                  field="ammunitions"
                  width={getWidth("ammunitions")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Created On"
                  field="createdDate"
                  width={getWidth("createdDate")}
                  cells={{ data: DateCell }}
                />

                <GridColumn
                  title="Modified By"
                  field="updatedByUserName"
                  width={getWidth("updatedByUserName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Approval Status"
                  field="approvalStatus"
                  width={getWidth("approvalStatus")}
                  cells={{
                    data: (props) => (
                      <ApprovalStatusDropdownCell
                        {...props}
                        approvalStatusDropdown={approvalStatusDropdown}
                        onStatusChange={handleApprovalStatusChange}
                      />
                    ),
                  }}
                />

                <GridColumn
                  title="Status"
                  field="isActive"
                  width={getWidth("status")}
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="gunId"
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
      <GunMasterModal
        show={showGunModal}
        onClose={handleCloseModal}
        id={selectedId}
        onSuccess={() => {
          fetchGuns();
        }}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />

      <AttachmentViewerModal
        show={showViewer}
        onClose={closeViewer}
        attachments={attachments}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
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

export default GunMaster;

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import {
  deleteBadge,
  getBadgesList,
} from "../../api/ManageBadges/managebadges";
import AttachmentCell from "../../components/GridCells/AttachmentCell";
import useAttachmentViewer from "../../hooks/useAttachmentViewer";
import AttachmentViewerModal from "../../components/Modal/AttachmentViewerModal";
import BadgeModal from "../../components/Modal/BadgeModal";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { getBadgeApplicablefor } from "../../api/Common/commonApi";
import { ApplicableForCell } from "../../components/GridCells/ApplicableForCell";
import { TextCell } from "../../components/GridCells/TextCell";
import { ActionCell } from "../../components/GridCells/ActionCell";
import { getMenuPermission } from "../../utils/permission";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "imageFullPath", minWidth: 120 },
  { field: "name", minWidth: 180 },
  { field: "applicableFor", minWidth: 200 },
  { field: "noOfCheckIns", minWidth: 140 },
];

function ManageBadges() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState([]);

  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadgeId, setSelectedBadgeId] = useState(null);

  const [applicableForOptions, setApplicableForOptions] = useState([]);

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
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const badgePermission = getMenuPermission("Badge");

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
    fetchBadgesList();
    getApplicableForOptions();
  }, [page, sort, search]);

  const fetchBadgesList = async () => {
    const body = {
      Page: page.skip / page.take + 1,
      PageSize: page.take,
      CustomSearch: search,
      Sorts: sort.map((s) => ({
        field: s.field,
        direction: s.dir === "asc" ? 0 : 1,
      })),
    };

    try {
      const res = await getBadgesList(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEditBadge = (id) => {
    setSelectedBadgeId(id);

    setShowBadgeModal(true);
  };

  const handleCloseBadgeModal = () => {
    setShowBadgeModal(false);
    setSelectedBadgeId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteBadge(deleteId);

      closeDeleteModal();
      await fetchBadgesList();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };

  const getApplicableForOptions = async () => {
    try {
      const res = await getBadgeApplicablefor();
      setApplicableForOptions(res.data);
      console.log("applicable", res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "manage-badges",
              text: "Manage Badges",
            },
          ]}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mt-3 mt-xxl-4 mb-3">
            <form className="d-flex searchbar align-items-center" role="search">
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

            {badgePermission.canCreate && (<button
              type="button"
              className="btn main-btn "
              onClick={() => {
                setSelectedBadgeId(null);
                setShowBadgeModal(true);
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
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                <GridColumn
                  title="Actions"
                  width={getWidth("action")}
                  sortable={false}
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={badgePermission}
                        idField="id"
                        onEdit={handleEditBadge}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />

                <GridColumn
                  title="Images"
                  field="imageFullPath"
                  sortable={false}
                  width={getWidth("imageFullPath")}
                  cells={{
                    data: (props) => (
                      <AttachmentCell {...props} onOpen={openViewer} />
                    ),
                  }}
                />

                <GridColumn
                  title="Name"
                  field="name"
                  width={getWidth("name")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  title="Badge Applicable For"
                  field="applicableFor"
                  width={getWidth("applicableFor")}
                  cells={{
                    data: (props) => (
                      <ApplicableForCell
                        {...props}
                        applicableForOptions={applicableForOptions}
                      />
                    ),
                  }}
                />

                <GridColumn
                  title="No. of Check-ins"
                  field="noOfCheckIns"
                  width={getWidth("noOfCheckIns")}
                  cells={{ data: TextCell }}
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
      <BadgeModal
        show={showBadgeModal}
        onClose={handleCloseBadgeModal}
        badgeId={selectedBadgeId}
        onSuccess={() => {
          fetchBadgesList();
        }}
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

export default ManageBadges;

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
        <div className="col-12 col-lg">
          <div className="btn-list d-flex justify-content-lg-end flex-wrap gap-2 gap-md-3 text-end">
            <button
              type="button"
              className="btn main-btn w-auto"
              onClick={() => {
                setSelectedBadgeId(null);
                setShowBadgeModal(true);
              }}
            >
              Add
            </button>
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
                    cells={{
                      data: (props) => (
                        <AttachmentCell {...props} onOpen={openViewer} />
                      ),
                    }}
                  />
                  <GridColumn
                    title="Name"
                    field="name"
                    cells={{ data: TextCell }}
                  />
                  <GridColumn
                    title="Badge Applicable For"
                    field="applicableFor"
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
                    cells={{ data: TextCell }}
                  />
                </Grid>
              </Tooltip>
            </div>
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

import React, { useEffect, useState } from "react";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import { deleteGunById, getGunList } from "../../../api/Gun/gunApi";
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

  useEffect(() => {
    fetchGuns();
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
      setData(res.data);
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

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;
    console.log("NextV", nextValue);

    const isSuccess = await updateGunStatus(id, nextValue);
    await fetchGuns();

    if (!isSuccess) {
      alert("Failed to update status.");
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

  const ActionCell = (props) => {
    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() => handleEdit(props.dataItem.id)}
          >
            <i className="fa fa-eye"></i>
          </button>

          <button
            type="button"
            className="delete-btn"
            title="Delete"
            onClick={() => openDeleteModal(props.dataItem.id)}
          >
            <i className="icon-delete-1"></i>
          </button>
        </div>
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
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
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
        </div>
      </div>
      <div className="col-12 col-lg">
        <div className="btn-list d-flex justify-content-lg-end flex-wrap gap-2 gap-md-3 text-end">
          <button
            type="button"
            className="btn main-btn w-auto"
            onClick={() => {
              setSelectedId(null);
              setShowGunModal(true);
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
                  width={"125px"}
                  title="Action"
                  cells={{ data: ActionCell }}
                />
                <GridColumn title="Gun Name" field="gunName" />
                <GridColumn title="Category Name" field="categoryNames" />
                <GridColumn
                  title="Manyfacturer Name"
                  field="manufacturerNames"
                />
                <GridColumn
                  title="Details"
                  field="details"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  title="Images"
                  field="attachmentFullPath"
                  cells={{
                    data: (props) => (
                      <AttachmentCell {...props} onOpen={openViewer} />
                    ),
                  }}
                />
                <GridColumn title="Ammunition" field="ammunitions" />
                <GridColumn
                  title="Created On"
                  field="createdDate"
                  cells={{ data: DateCell }}
                />
                <GridColumn title="Modified By" field="updatedByUserName" />
                <GridColumn
                  title="Status"
                  field="status"
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
    </div>
  );
}

export default GunMaster;

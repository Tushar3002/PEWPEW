//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

import React, { useEffect, useState } from "react";

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import Breadcrumbs from "../../../components/BreadCrumbs/Breadcrumbs";
import { DateCell } from "../../../components/GridCells/DateCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import { ProhibitedWordsModal } from "../../../components/Modal/ProhibitedWordsModal";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import {
  deleteManufacturer,
  manufacturerList,
  updateManufacturerStatus,
} from "../../../api/Manufacturer/manufacturer";
import { ManufacturerModal } from "../../../components/Modal/ManufacturerModal";
import { TextCell } from "../../../components/GridCells/TextCell";
import { getMenuPermission } from "../../../utils/permission";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";
import CustomPager from "../../../components/Pagnation/CustomPager";
import useStatusConfirmation from "../../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../../components/Modal/StatusConfirmationModal";
import { hasAction } from "../../../utils/hasAction";

const columns = [
  { field: "action", minWidth: 90 },
  { field: "name", minWidth: 200 },
  { field: "description", minWidth: 230 },
  { field: "createdByUserName", minWidth: 140 },
  { field: "createdOn", minWidth: 140 },
  { field: "updatedByUserName", minWidth: 140 },
  { field: "status", minWidth: 90 },
];

function Manufacturer() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState([]);

  const [showManufacturerModal, setShowManufacturerModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { gridRef, getWidth } = useResponsiveGridWidths(columns);
  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const {
    showStatusModal,
    statusId,
    currentStatus,
    isUpdatingStatus,
    setIsUpdatingStatus,
    openStatusModal,
    closeStatusModal,
  } = useStatusConfirmation();

  const manufacturerPermission = getMenuPermission("Manufacturer");

  useEffect(() => {
    fetchManufacturer();
  }, [page, sort, search]);

  const fetchManufacturer = async () => {
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
      const res = await manufacturerList(body);
      console.log(res.data);
      setData(res.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setShowManufacturerModal(true);
  };

  const handleCloseModal = () => {
    setShowManufacturerModal(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteManufacturer(deleteId);

      closeDeleteModal();

      await fetchManufacturer();
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleStatusToggle = async () => {
    if (!statusId) return;

    const nextValue = !currentStatus;

    try {
      setIsUpdatingStatus(true);

      const isSuccess = await updateManufacturerStatus(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await fetchManufacturer();
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
              id: "manufacturer",
              text: "Manufacturer Master",
            },
          ]}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mt-3 mt-xxl-4 mb-3">
            {/* Search */}
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

            {/* Add */}
            {manufacturerPermission.canCreate && (
              <button
                type="button"
                className="btn main-btn"
                onClick={() => {
                  setSelectedId(null);
                  setShowManufacturerModal(true);
                }}
              >
                Add
              </button>
            )}
          </div>

          {/* Grid */}
          <div
            ref={gridRef}
            className="table-responsive"
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
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                sortable
                sort={sort}
                onSortChange={(e) => setSort(e.sort)}
              >
                {hasAction(manufacturerPermission) && <GridColumn
                  width={getWidth("action")}
                  title="Action"
                  sortable={false}
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={manufacturerPermission}
                        idField="id"
                        onEdit={handleEdit}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />}
                <GridColumn
                  title="Manufacturer Name"
                  field="name"
                  width={getWidth("name")}
                />
                <GridColumn
                  width={getWidth("description")}
                  title="Description"
                  field="description"
                  cells={{ data: TextCell }}
                />
                <GridColumn
                  title="Created By"
                  field="createdByUserName"
                  width={getWidth("createdByUserName")}
                />
                <GridColumn
                  width={getWidth("createdOn")}
                  title="Created On"
                  field="createdOn"
                  cells={{ data: DateCell }}
                />
                <GridColumn
                  title="Modified By"
                  field="updatedByUserName"
                  width={getWidth("updatedByUserName")}
                />
                <GridColumn
                  width={getWidth("status")}
                  title="Status"
                  field="isActive"
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="id"
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
                onPageChange={(e) => setPage(e.page)}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <ManufacturerModal
        show={showManufacturerModal}
        onClose={handleCloseModal}
        id={selectedId}
        onSuccess={() => {
          fetchManufacturer();
        }}
      />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
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
export default Manufacturer;

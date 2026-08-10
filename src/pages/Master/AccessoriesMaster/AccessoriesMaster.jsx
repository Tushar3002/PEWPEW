import React, { useEffect, useState } from "react";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import {
  deleteAccessory,
  getAccessoriesList,
  updateAccessoriesStatus,
} from "../../../api/Accessory/accessories";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { AccessoryModal } from "../../../components/Modal/AccessoryModal";
import Breadcrumbs from "../../../components/BreadCrumbs/Breadcrumbs";
import { DateCell } from "../../../components/GridCells/DateCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import { getMenuPermission } from "../../../utils/permission";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";
import CustomPager from "../../../components/Pagnation/CustomPager";
import { TextCell } from "../../../components/GridCells/TextCell";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "accessoryName", minWidth: 170 },
  { field: "accessoryCategory", minWidth: 170 },
  { field: "gunNames", minWidth: 160 },
  { field: "description", minWidth: 180},
  { field: "createdByUserName", minWidth: 150 },
  { field: "createdAt", minWidth: 150 },
  { field: "updatedByUserName", minWidth: 150 },
  { field: "status", minWidth: 90 },
];

function AccessoriesMaster() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState([]);

  const [showAccessoryModal, setShowAccessoryModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const accessoryPermission = getMenuPermission("Accessory");

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  useEffect(() => {
    fetchAccessories();
  }, [page, sort, search]);

  const fetchAccessories = async () => {
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
      const res = await getAccessoriesList(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setShowAccessoryModal(true);
  };

  const handleCloseModal = () => {
    setShowAccessoryModal(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);

      await deleteAccessory(deleteId);

      closeDeleteModal();
      await fetchAccessories();
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

    const isSuccess = await updateAccessoriesStatus(id, nextValue);
    await fetchAccessories();

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
              id: "accessories",
              text: "Accessories Master",
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

            {accessoryPermission.canCreate && (<button
              type="button"
              className="btn main-btn"
              onClick={() => {
                setSelectedId(null);
                setShowAccessoryModal(true);
              }}
            >
              Add
            </button>)}
          </div>

          <div className="table-responsive " style={{ overflow: "visible" }} ref={gridRef}>
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
                  title="Action"
                  width={getWidth("action")}
                  sortable={false}
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={accessoryPermission}
                        idField="accessoryId"
                        onEdit={handleEdit}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />
                <GridColumn title="Name" field="accessoryName" width={getWidth("accessoryName")}/>
                <GridColumn title="Category Name" field="accessoryCategory" width={getWidth("accessoryCategory")}/>
                <GridColumn title="Gun" field="gunNames" width={getWidth("gunNames")}/>
                <GridColumn title="Description" field="description" width={getWidth("description")} cells={{data:TextCell}}/>
                <GridColumn title="Created By" field="createdByUserName" width={getWidth("createdByUserName")}/>
                <GridColumn
                  title="Created On"
                  field="createdAt"
                  cells={{ data: DateCell }}
                  width={getWidth("createdAt")}
                />
                <GridColumn title="Modified By" field="updatedByUserName" width={getWidth("updatedByUserName")}/>
                <GridColumn
                  title="Status"
                  field="isActive"
                  width={getWidth("status")}
                  
                  cells={{
                    data: (props) => (
                      <StatusCell
                        {...props}
                        idField="accessoryId"
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
      <AccessoryModal
        show={showAccessoryModal}
        onClose={handleCloseModal}
        id={selectedId}
        onSuccess={() => {
          fetchAccessories();
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

export default AccessoriesMaster;

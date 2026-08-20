import React, { useEffect, useState } from "react";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";

import { Tooltip } from "@progress/kendo-react-tooltip";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { AccessoryModal } from "../../../components/Modal/AccessoryModal";
import Breadcrumbs from "../../../components/BreadCrumbs/Breadcrumbs";
import { DateCell } from "../../../components/GridCells/DateCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import { deleteCategory, getGunCategoryMasterList, updateGunCategoryStatus } from "../../../api/Gun/gunCategoryMaster";
import { CategoryMasterModel } from "../../../components/Modal/CategoryMasterModal";
import { getMenuPermission } from "../../../utils/permission";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";
import CustomPager from "../../../components/Pagnation/CustomPager";
import { TextCell } from "../../../components/GridCells/TextCell";
import useStatusConfirmation from "../../../hooks/useStatusConfirmation";
import StatusConfirmationModal from "../../../components/Modal/StatusConfirmationModal";
import { hasAction } from "../../../utils/hasAction";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "applicablefor", minWidth: 160 },
  { field: "accessoryCategory", minWidth: 200 },
  { field: "description", minWidth: 230 },
  { field: "parentCategoryName", minWidth: 220 },
  { field: "createdByUserName", minWidth: 140 },
  { field: "createdOn", minWidth: 140 },
  { field: "updatedByUserName", minWidth: 140 },
  { field: "status", minWidth: 90 },
];

function CategoryMaster() {
  const [data, setData] = useState([]);
    const [page, setPage] = useState({
      skip: 0,
      take: 10,
    });
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [sort, setSort] = useState([]);
  
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

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
    showStatusModal,
    statusId,
    currentStatus,
    isUpdatingStatus,
    setIsUpdatingStatus,
    openStatusModal,
    closeStatusModal,
  } = useStatusConfirmation();

    const categoryMasterPermission=getMenuPermission('GunCategoryMaster')
  
    useEffect(() => {
      fetchCategories();
    }, [page, sort, search]);
  
    const fetchCategories = async () => {
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
        const res = await getGunCategoryMasterList(body);
        console.log(res.data);
        setData(res.data.data);
        setTotal(res.data.totalRecord);
      } catch (error) {
        console.log(error.response);
      }
    };
  
    const handleEdit = (id) => {
      setSelectedId(id);
      setShowCategoryModal(true);
    };
  
    const handleCloseModal = () => {
      setShowCategoryModal(false);
      setSelectedId(null);
    };
  
    const handleDelete = async () => {
      if (!deleteId) return;
  
      try {
        setIsDeleting(true);
  
        await deleteCategory(deleteId);
  
        closeDeleteModal();
        await fetchCategories();
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

      const isSuccess = await updateGunCategoryStatus(statusId, nextValue);

      if (!isSuccess) {
        alert("Failed to update status.");
        return;
      }

      closeStatusModal();

      await fetchCategories();
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
                id: "category",
                text: "Category Master",
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

            {categoryMasterPermission.canCreate && (<button
              type="button"
              className="btn main-btn "
              onClick={() => {
                setSelectedId(null);
                setShowCategoryModal(true);
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
                  {hasAction(categoryMasterPermission)&&<GridColumn
                    width={getWidth("action")}
                    title="Action"
                    sortable={false}
                    cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={categoryMasterPermission}
                        idField="categotyId"
                        onEdit={handleEdit}

                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                  />}
                  <GridColumn title="Applicable For" field="applicableFor" width={getWidth("applicableFor")}/>
                  <GridColumn title="Category Name" field="accessoryCategory" width={getWidth("accessoryCategory")} />
                  <GridColumn title="Description" field="description" width={getWidth("description")} cells={{data:TextCell}}/>
                  <GridColumn title="Parent Category Name" field="parentCategoryName" width={getWidth("parentCategoryName")}/>
                  <GridColumn title="Created By" field="createdByUserName" width={getWidth("createdByUserName")}/>
                  <GridColumn
                  width={getWidth("createdOn")}
                    title="Created On"
                    field="createdOn"
                    cells={{ data: DateCell }}
                  />
                  <GridColumn title="Modified By" field="updatedByUserName" width={getWidth("updatedByUserName")}/>
                  <GridColumn
                  width={getWidth("status")}
                    title="Status"
                    field="isActive"
                    cells={{
                      data: (props) => (
                        <StatusCell
                          {...props}
                          idField="categoryId"
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
        <CategoryMasterModel
          show={showCategoryModal}
          onClose={handleCloseModal}
          id={selectedId}
          onSuccess={() => {
            fetchCategories();
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

export default CategoryMaster
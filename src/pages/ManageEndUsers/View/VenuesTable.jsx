import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import {
  getVenueGunDetails,
  updateVenueStatus,
  venueListByUser,
} from "../../../api/EndUsers/endUserViewApi";
import GunModal from "../../../components/Modal/GunModal";
import { useNavigate } from "react-router-dom";
import VenueEditModal from "../../../components/Modal/VenueModal";
import WebsiteCell from "../../../components/GridCells/WebsiteCell";
import { deleteVenue } from "../../../api/Venue/venueApi";
import { TextCell } from "../../../components/GridCells/TextCell";
import StatusCell from "../../../components/GridCells/StatusCell";
import { DateCell } from "../../../components/GridCells/DateCell";
import { GunCountCell } from "../../../components/GridCells/GunCountCell";
import { getMenuPermission } from "../../../utils/permission";
import { useDeleteConfirmation } from "../../../hooks/useDeleteConfirmation";
import DeleteConfirmationModal from "../../../components/Modal/DeleteConfirmationModal";
import { ActionCell } from "../../../components/GridCells/ActionCell";
import CustomPager from "../../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../../hooks/useResponsiveGridWidths";

const responsiveColumns = [
  { field: "action", minWidth: 90 },
  { field: "venueName", minWidth: 180 },
  { field: "description", minWidth: 230 },
  { field: "website", minWidth: 180 },
  { field: "phone", minWidth: 140 },
  { field: "address", minWidth: 260 },
  { field: "totalGun", minWidth: 120 },
  { field: "avgRate", minWidth: 140 },
  { field: "noOfChackin", minWidth: 140 },
  { field: "noOfEvent", minWidth: 150 },
  { field: "createdOn", minWidth: 140 },
  { field: "approvalStatus", minWidth: 180 },
  { field: "status", minWidth: 90 },
];

function VenuesTable({ userId }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [showGunModal, setShowGunModal] = useState(false);
  const [gunData, setGunData] = useState([]);
  // const [loading, setLoading] = useState(false);

  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);

  const navigate = useNavigate();

  const {
    showDeleteModal,
    deleteId,
    isDeleting,
    setIsDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteConfirmation();

  const venuePermission = getMenuPermission("Venue");

  useEffect(() => {
    fetchVenue();
  }, [page, userId]);

  const fetchVenue = async () => {
    console.log("UserID", userId);

    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      search: search,
      isMyVenue: true,
      userId,
    };
    try {
      const res = await venueListByUser(body);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
      console.log("Venue Data", res.data);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleGunClick = async (venueId) => {
    try {
      const res = await getVenueGunDetails(venueId);
      console.log(res.data);
      setGunData(res.data);
      setShowGunModal(true);
    } catch (error) {
      console.error(error?.response);
    }
  };

  const updateStatusData = async (venueId, isActive) => {
    try {
      const res = await updateVenueStatus(venueId, isActive);
      fetchVenue();
      return res;
    } catch (error) {
      console.log(error?.response);
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

  const handleDelete = async (id) => {
    try {
      await deleteVenue(id);
      fetchVenue();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleEdit = (venueId) => {
    setSelectedVenueId(venueId);
    setShowEditModal(true);
  };
  return (
    <div className="tabbar-section">
      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div
            className="table-responsive"
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
                data={data}
                pageable={false}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
              >
                <GridColumn
                  title="Action"
                  width={getWidth("action")}
                  headerClassName="text-center"
                  cells={{
                    data: (props) => (
                      <ActionCell
                        {...props}
                        permission={venuePermission}
                        idField="venueId"
                        onView={(id) => navigate(`/venue/view/${id}`)}
                        onEdit={handleEdit}
                        onDelete={openDeleteModal}
                      />
                    ),
                  }}
                />
                <GridColumn
                  field="venueName"
                  title="Venue Name"
                  width={getWidth("venueName")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="description"
                  title="Description Name"
                  width={getWidth("description")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="website"
                  title="Website"
                  width={getWidth("website")}
                  cells={{ data: WebsiteCell }}
                />

                <GridColumn
                  field="phone"
                  title="Phone"
                  width={getWidth("phone")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="address"
                  title="Address"
                  width={getWidth("address")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="totalGun"
                  title="No. of Gun"
                  width={getWidth("totalGun")}
                  cells={{
                    data: (props) => (
                      <GunCountCell
                        {...props}
                        onClick={handleGunClick}
                        idField="venueId"
                      />
                    ),
                  }}
                />

                <GridColumn
                  field="avgRate"
                  title="Avg Venue Ratings"
                  width={getWidth("avgRate")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="noOfChackin"
                  title="No. of Check-Ins"
                  width={getWidth("noOfChackin")}
                  cells={{ data: TextCell }}
                />

                <GridColumn
                  field="noOfEvent"
                  title="No. of Event Created"
                  width={getWidth("noOfEvent")}
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
                        idField="venueId"
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
      <GunModal
        show={showGunModal}
        onClose={() => setShowGunModal(false)}
        data={gunData}
      />
      <VenueEditModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedVenueId(null);
        }}
        venueId={selectedVenueId}
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

export default VenuesTable;

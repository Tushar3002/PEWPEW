import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SvgIcon } from "@progress/kendo-react-common";
import { filterIcon } from "@progress/kendo-svg-icons";
import { DatePicker } from "@progress/kendo-react-dateinputs";

const dateOperators = [
  { label: "Is equal to", value: 2 },
  { label: "Is not equal to", value: 3 },
  { label: "Is greater than", value: 5 },
  { label: "Is greater than or equal to", value: 4 },
  { label: "Is less than", value: 0 },
  { label: "Is less than or equal to", value: 1 },
];

const approvalStatusOptions = [
  { label: "Approved", value: "1" },
  { label: "Rejected", value: "2" },
  { label: "Pending", value: "3" },
];

const FilterHeaderCell = (props) => {
  const {
    field,
    children,
    thProps,
    openFilter,
    setOpenFilter,
    filters,
    setFilters,
    filterType = "text",
  } = props;
  const [filterValue, setFilterValue] = useState("");

  const [selectedOperator, setSelectedOperator] = useState(2);
  const [filterDate, setFilterDate] = useState(null);

  const [selectedApprovalStatus, setSelectedApprovalStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const buttonRef = useRef(null);

  const [popupPosition, setPopupPosition] = useState(null);
  const isOpen = openFilter === field;

  const updatePopupPosition = () => {
  if (!buttonRef.current) return;

  const rect = buttonRef.current.getBoundingClientRect();

  const popupWidth = 250;
  const spacing = 8;

  let left = rect.left;

  // If popup would go outside the right side of the screen,
  // align its right edge with the funnel button.
  if (left + popupWidth > window.innerWidth - spacing) {
    left = rect.right - popupWidth;
  }

  // Make sure it doesn't go outside the left side either.
  if (left < spacing) {
    left = spacing;
  }

  setPopupPosition({
    top: rect.bottom + 4,
    left,
  });
};

  const appliedFilter = filters.find((filter) => filter.Field === field);

  const isFiltered = !!appliedFilter;

  useLayoutEffect(() => {
    if (!isOpen) {
      setPopupPosition(null);
      return;
    }

    updatePopupPosition();

    const handlePositionChange = () => {
      updatePopupPosition();
    };

    window.addEventListener("resize", handlePositionChange);

    // Capture scroll events from the page and Kendo's
    // internal scroll containers.
    window.addEventListener("scroll", handlePositionChange, true);

    return () => {
      window.removeEventListener("resize", handlePositionChange);

      window.removeEventListener("scroll", handlePositionChange, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (appliedFilter) {
      setFilterValue(appliedFilter.Value);
    } else {
      setFilterValue("");
    }
  }, [appliedFilter?.Value]);

  useEffect(() => {
    if (filterType !== "date") return;

    if (appliedFilter) {
      setSelectedOperator(appliedFilter.OperatorType);

      const [month, day, year] = appliedFilter.Value.split("/");

      setFilterDate(new Date(Number(year), Number(month) - 1, Number(day)));
    } else {
      setSelectedOperator(2);
      setFilterDate(null);
    }
  }, [filterType, appliedFilter?.Value, appliedFilter?.OperatorType]);

  useEffect(() => {
    if (filterType !== "approvalStatus") return;

    if (appliedFilter) {
      setSelectedApprovalStatus(appliedFilter.Value);
    } else {
      setSelectedApprovalStatus("");
    }
  }, [filterType, appliedFilter?.Value]);

  useEffect(() => {
    if (filterType !== "status") return;

    if (appliedFilter) {
      setSelectedStatus(appliedFilter.Value);
    } else {
      setSelectedStatus("");
    }
  }, [filterType, appliedFilter?.Value]);

  const handleFilterClick = (e) => {
    e.stopPropagation();

    setOpenFilter((current) => (current === field ? null : field));
  };

  const handleFilter = () => {
    const value = filterValue.trim();

    if (!value) return;

    setFilters((currentFilters) => {
      const otherFilters = currentFilters.filter(
        (filter) => filter.Field !== field,
      );

      return [
        ...otherFilters,
        {
          Field: field,
          OperatorType: 8,
          Value: value,
        },
      ];
    });

    setOpenFilter(null);
  };

  const handleDateFilter = () => {
    if (!filterDate) return;

    const month = String(filterDate.getMonth() + 1).padStart(2, "0");
    const day = String(filterDate.getDate()).padStart(2, "0");
    const year = filterDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    setFilters((currentFilters) => {
      const otherFilters = currentFilters.filter(
        (filter) => filter.Field !== field,
      );

      return [
        ...otherFilters,
        {
          Field: field,
          OperatorType: selectedOperator,
          Value: formattedDate,
        },
      ];
    });

    setOpenFilter(null);
  };

  const handleApprovalStatusFilter = () => {
    if (!selectedApprovalStatus) return;

    setFilters((currentFilters) => {
      const otherFilters = currentFilters.filter(
        (filter) => filter.Field !== field,
      );

      return [
        ...otherFilters,
        {
          Field: field,
          OperatorType: 2,
          Value: selectedApprovalStatus,
        },
      ];
    });

    setOpenFilter(null);
  };

  const handleStatusFilter = () => {
    if (selectedStatus === "") return;

    setFilters((currentFilters) => {
      const otherFilters = currentFilters.filter(
        (filter) => filter.Field !== field,
      );

      return [
        ...otherFilters,
        {
          Field: field,
          OperatorType: 2,
          Value: selectedStatus,
        },
      ];
    });

    setOpenFilter(null);
  };

  const handleClear = () => {
    setFilterValue("");
    setFilterDate(null);
    setSelectedOperator(2);
    setSelectedApprovalStatus("");
    setSelectedStatus("");

    setFilters((currentFilters) =>
      currentFilters.filter((filter) => filter.Field !== field),
    );

    setOpenFilter(null);
  };

  const popup =
    isOpen && popupPosition
      ? createPortal(
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: popupPosition.top,
              left: popupPosition.left,

              width: "250px",

              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "8px",

              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",

              zIndex: 99999,
            }}
          >
            {filterType === "text" && (
              <>
                <select
                  style={{
                    width: "100%",
                    height: "38px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "0 10px",
                    marginBottom: "8px",
                  }}
                  defaultValue="contains"
                >
                  <option value="contains">Contains</option>
                </select>

                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "0 10px",
                    boxSizing: "border-box",
                    // marginBottom: "8px",
                  }}
                />
              </>
            )}

            {filterType === "date" && (
              <>
                <select
                  value={selectedOperator}
                  onChange={(e) => setSelectedOperator(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "38px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "0 10px",
                    marginBottom: "8px",
                  }}
                >
                  {dateOperators.map((operator) => (
                    <option key={operator.value} value={operator.value}>
                      {operator.label}
                    </option>
                  ))}
                </select>

                <DatePicker
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.value)}
                  format="MM/dd/yyyy"
                  style={{
                    width: "100%",
                    marginBottom: "8px",
                  }}
                />
              </>
            )}

            {filterType === "approvalStatus" && (
              <select
                value={selectedApprovalStatus}
                onChange={(e) => setSelectedApprovalStatus(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "0 10px",
                  marginBottom: "8px",
                }}
              >
                <option value="">Select approval status</option>

                {approvalStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            )}

            {filterType === "status" && (
              <div
                style={{
                  marginBottom: "8px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name={`status-${field}`}
                    value="1"
                    checked={selectedStatus === "1"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />

                  <span>Active</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name={`status-${field}`}
                    value="0"
                    checked={selectedStatus === "0"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />

                  <span>Inactive</span>
                </label>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              <button
                type="button"
                onClick={
                  filterType === "date"
                    ? handleDateFilter
                    : filterType === "approvalStatus"
                      ? handleApprovalStatusFilter
                      : filterType === "status"
                        ? handleStatusFilter
                        : handleFilter
                }
                style={{
                  flex: 1,
                  height: "40px",
                  border: "none",
                  borderRadius: "6px",
                  background:
                    filterType === "date"
                      ? filterDate
                        ? "#dc3545"
                        : "#d66f75"
                      : filterType === "approvalStatus"
                        ? selectedApprovalStatus
                          ? "#dc3545"
                          : "#d66f75"
                        : filterType === "status"
                          ? selectedStatus
                            ? "#dc3545"
                            : "#d66f75"
                          : filterValue.trim()
                            ? "#dc3545"
                            : "#d66f75",
                  color: "#fff",
                  cursor:
                    filterType === "date"
                      ? filterDate
                        ? "pointer"
                        : "default"
                      : filterType === "approvalStatus"
                        ? selectedApprovalStatus
                          ? "pointer"
                          : "default"
                        : filterType === "status"
                          ? selectedStatus
                            ? "pointer"
                            : "default"
                          : filterValue.trim()
                            ? "pointer"
                            : "default",
                }}
              >
                Filter
              </button>

              <button
                type="button"
                onClick={handleClear}
                style={{
                  flex: 1,
                  height: "40px",
                  border: "none",
                  borderRadius: "6px",
                  background: "#e5e8ec",
                  color: "#222",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <th {...thProps}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>{children}</div>

          <button
            ref={buttonRef}
            type="button"
            onClick={handleFilterClick}
            style={{
              border: "none",
              background: isFiltered ? "#d9534f" : "transparent",
              color: isFiltered ? "#fff" : "inherit",
              padding: "4px",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SvgIcon icon={filterIcon} size="small" />
          </button>
        </div>
      </th>

      {popup}
    </>
  );
};

export default FilterHeaderCell;

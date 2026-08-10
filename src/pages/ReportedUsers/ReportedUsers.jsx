import React, { useEffect, useState } from "react";
import { getReportList, updateReportStatus } from "../../api/Report/report";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import StatusCell from "../../components/GridCells/StatusCell";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { useLocation } from "react-router-dom";
import CustomPager from "../../components/Pagnation/CustomPager";
import useResponsiveGridWidths from "../../hooks/useResponsiveGridWidths";

const responsiveColumns = [
  { field: "username", minWidth: 180 },
  { field: "emailPhone", minWidth: 240 },
  { field: "reportedBy", minWidth: 180 },
  { field: "status", minWidth: 90 },
];

function ReportedUsers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const location = useLocation();
  const [sort, setSort] = useState(location.state?.sort || []);
  const { gridRef, getWidth } = useResponsiveGridWidths(responsiveColumns);
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
    fetchReportList();
  }, [page, sort, search]);
  const fetchReportList = async () => {
    const body = {
      page: page.skip / page.take + 1,
      pageSize: page.take,
      customSearch: search,

      sorts: sort.map((s) => ({
        field: s.field,
        direction: s.dir === "asc" ? 0 : 1,
      })),
    };

    try {
      const res = await getReportList(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleStatusToggle = async (userId, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    const body = {
      userId,
      isActive: nextValue,
    };

    const isSuccess = await updateReportStatus(body);

    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };
  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "reported-users",
              text: "Reported Users",
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

        <div className="row w-100">
          <div className="col-12 mt-3 mt-xxl-4 w-100 ">
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
                    title="Username"
                    field="username"
                    width={getWidth("username")}
                  />

                  <GridColumn
                    title="Email/Phone Number"
                    field="emailPhone"
                    width={getWidth("emailPhone")}
                  />

                  <GridColumn
                    title="Reported By"
                    field="reportedBy"
                    width={getWidth("reportedBy")}
                  />

                  <GridColumn
                    title="Status"
                    field="isActive"
                    width={getWidth("status")}
                    cells={{
                      data: (props) => (
                        <StatusCell
                          {...props}
                          idField="userId"
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
      </div>
    </div>
  );
}

export default ReportedUsers;

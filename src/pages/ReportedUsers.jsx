import React, { useState } from "react";
import { getReportList } from "../api/Report/report";
import { GridColumn } from "@progress/kendo-react-grid";
import StatusCell from "../components/GridCells/StatusCell";

function ReportedUsers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);

      setPage((prev) => ({
        ...prev,
        skip: 0,
      }));
    }, 500);

    return () => clearTimeout(timer);
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

  const handleStatusToggle = async (id, currentValue) => {
    const nextValue = !currentValue;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextValue ? "activate" : "deactivate"
      } this role?`,
    );

    if (!confirmed) return;

    // const isSuccess = await updateStatusToggle(id, nextValue);

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
              id: "support-tickets",
              text: "Support Tickets",
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
                    pageSizes: [5, 10, 20],
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
                  <GridColumn title="Username" />
                  <GridColumn title="Email/Phone Number" />
                  <GridColumn title="Reported By" />
                  <GridColumn title="Status" cells={{
                  data: (props) => (
                    <StatusCell
                      {...props}
                      idField="id"
                      onToggle={handleStatusToggle}
                    />
                  ),
                }}/>
                </Grid>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportedUsers;

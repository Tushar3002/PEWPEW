import React, { useEffect, useState } from "react";
import { getGroupsData } from "../../api/Group/group";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

function Group() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearch(searchInput);
      setPage((prev) => ({
        ...prev,
        skip: 0,
      }));
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchInput]);

  useEffect(() => {
    fetchGroupData();
  }, [page, sort, search]);
  const fetchGroupData = async () => {
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
      const res = await getGroupsData(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="row">
      <div className="row align-items-center gap-3">
        <h3>Group</h3>
        <div className="col-12 col-lg-auto">
          <form
            className="d-md-flex searchbar align-items-center"
            role="search"
            noValidate
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
      </div>

      <div className="row w-100">
        <div className="col-12 mt-3 mt-xxl-4 w-100 ">
          <div
            className="table-responsive w-100"
            style={{ overflow: "visible" }}
          >
            <Grid 
            data={data}
            total={total}
            pageable={{
                buttonCount: 5,
                pageSizes: [5, 10, 20],
                info: true,
                previousNext: true,
              }}
            skip={page.skip}
            take={page.take}
            onPageChange={(e)=>setPage(e.page)}
            sortable
            sort={sort}
            onSortChange={(e)=>setSort(e.sort)}  
            >
                <GridColumn title="Action"/>
                <GridColumn title="Group Name" field="groupName"/>
                <GridColumn title="Group Image" field="groupName"/>
                <GridColumn title="About Group" field="groupName"/>
                <GridColumn title="Group Type" field="groupName"/>
                <GridColumn title="Members" field="groupName"/>
                <GridColumn title="activities" field="groupName"/>
                <GridColumn title="Reported" field="groupName"/>
                <GridColumn title="Created By" field="groupName"/>
                <GridColumn title="Created On" field="groupName"/>
                <GridColumn title="Status" field="groupName"/>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;

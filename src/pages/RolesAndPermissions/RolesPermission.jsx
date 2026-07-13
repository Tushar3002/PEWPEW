import React, { useEffect, useState } from 'react'
import { getRolesAndPermission } from '../../api/rolesandPermission';
import { Link } from 'react-router-dom';
import { Grid, GridColumn } from '@progress/kendo-react-grid';

function RolesPermission() {

    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
  
    const [page, setPage] = useState({
      skip: 0,
      take: 10,
    });
  
    const [sort, setSort] = useState([]);
    const [filter, setFilter] = useState({
      logic: "and",
      filters: [],
    });
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        rolesandpermissionData();
      }, [page, sort, filter, search]);
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

  const rolesandpermissionData=async()=>{
    try {
      const body = {
        page: page.skip / page.take + 1,
        pageSize: page.take,

        sorts: sort.map((s) => ({
          field: s.field,
          direction: s.dir === "asc" ? 0 : 1,
        })),
        

        customSearch: search,
      };
      const res=await getRolesAndPermission(body)
      console.log(res.data);
      setData(res.data.data)

    } catch (error) {
      console.log(error);
    }
  }
  const ActionCell = (props) => (
    <td className="text-center align-middle">
      <div className="d-flex justify-content-center gap-2">
        <button
        type="button"
        className="edit-btn"
        title="Edit"
        onClick={() => navigate(`/manage-users/edit/${props.dataItem.id}`)}
      > 
          <i className="demo-icon icon-edit-1"></i>
        </button>

        <button type="button" className="delete-btn" title="Delete">
          <i className="demo-icon icon-delete-1"></i>
        </button>
      </div>
    </td>
  );
  const StatusCell = (props) => (
    <td className="text-center align-middle">
      <div
        className={`tag ${
          props.dataItem.isActive ? "success-tag" : "basic-tag"
        } d-inline-block`}
      >
        {props.dataItem.isActive ? "Active" : "Inactive"}
      </div>
    </td>
  );
  return (
    <div className="tabbar-section">
      <div className="row align-items-center gap-3">
        <h3>Manage User</h3>
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
            {/* <a href="#" className="btn main-btn border-btn danger-btn">
          Delete
        </a>

        <a href="#" className="btn main-btn border-btn blue-btn">
          Import
        </a> */}

            {/* <a href="#" className="btn main-btn border-btn sky-btn">
              Export
            </a> */}

            <Link
              to={"/manage-users/add"}
              className="btn main-btn border-btn blue-btn"
            >
              Add Users
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div className="table-responsive">
            <Grid
              // style={{ height: "600px" }}
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
           
              <GridColumn
                title="Action"
                width="110px"
                headerClassName="text-center"
                cells={{
                  data: ActionCell,
                }}
              />
              <GridColumn
                width={"320px"}
                field="role"
                title="Role Name"
                // columnMenu={ColumnMenu}
              />
              <GridColumn width={"550px"} field="description" title="Description" />
              <GridColumn width={"200px"} field="noOfUser" title="No. Of User" />
              

              <GridColumn
                width={"120px"}
                title="Status"
                cells={{
                  data: StatusCell,
                }}
              />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RolesPermission
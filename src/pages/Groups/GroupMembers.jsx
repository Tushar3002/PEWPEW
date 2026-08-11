import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React, { useEffect, useState } from "react";
import { getGroupMembers } from "../../api/Group/group";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/BreadCrumbs/Breadcrumbs";
import CustomPager from "../../components/Pagnation/CustomPager";
import { decryptUrlParam, encryptUrlParam } from "../../utils/crypto";

function GroupMembers() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  console.log("URL",id);
  
  const groupId=decryptUrlParam(id)
  console.log("Decrypted",groupId)
  const navigate = useNavigate();

  useEffect(() => {
    getGroupMemberList();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchInput);

    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
  };

  const getGroupMemberList = async () => {
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      search,
      groupId: groupId,
    };
    try {
      const res = await getGroupMembers(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const ProfileCell = (props) => {
    const { profileImagePath, userName, isVerify, userId } = props.dataItem;

    return (
      <td {...props.tdProps}>
        <div className="d-flex align-items-center gap-2">
          {/* Profile Image */}
          <img
            src={profileImagePath}
            alt={userName || "User"}
            className="rounded-circle flex-shrink-0"
            style={{
              width: "42px",
              height: "42px",
              objectFit: "cover",
            }}
          />

          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none fw-semibold"
              onClick={() => navigate(`/manage-end-users/view/${encryptUrlParam(userId)}`)}
            >
              {userName}
            </button>

            {isVerify && (
              <i
                className="demo-icon icon-verified ng-star-inserted"
                title="Verified"
              />
            )}
          </div>
        </div>
      </td>
    );
  };
  return (
    <div className="row">
      <div className="row align-items-center gap-3">
        <Breadcrumbs
          items={[
            {
              id: "groups",
              text: "Groups",
              path: "/groups",
            },
            {
              id: "group-details",
              text: "Group Details",
              path: `/groups/view/${encryptUrlParam(groupId)}`,
            },
            {
              id: "group-members",
              text: "Group Members",
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

      <div className="row w-100">
        <div className="col-12 mt-3 mt-xxl-4 w-100 ">
          <div
            className="table-responsive w-100"
            style={{ overflow: "visible" }}
          >
            <Grid
              data={data}
              total={total}
              pageable={false}
              skip={page.skip}
              take={page.take}
              onPageChange={(e) => setPage(e.page)}
            >
              <GridColumn title="Profile" cells={{ data: ProfileCell }} />
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
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupMembers;

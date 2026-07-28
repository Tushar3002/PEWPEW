import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivities } from "../../api/EndUsers/endUserViewApi";
import { Tooltip } from "@progress/kendo-react-tooltip";
import StatusCell from "../../components/GridCells/StatusCell";
import { DateCell } from "../../components/GridCells/DateCell";
import { updatePostStatus } from "../../api/Activity/activity";
import AttachmentCell from "../../components/GridCells/AttachmentCell";
import { TextCell } from "../../components/GridCells/TextCell";

function GroupActivity() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupActivity();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchInput);

    setPage((prev) => ({
      ...prev,
      skip: 0,
    }));
  };

  const fetchGroupActivity = async () => {
    const body = {
      Page: page.skip / page.take + 1,
      pageSize: page.take,
      search,
      Filters: [
        {
          Field: "groupId",
          OperatorType: 2,
          Value: id,
        },
      ],
    };
    try {
      const res = await getActivities(body);
      console.log(res.data);
      setData(res.data.data);
      setTotal(res.data.totalRecord);
    } catch (error) {
      console.log(error.response);
    }
  };

  const ActionCell = (props) => {
    const isVerified = Boolean(props.dataItem.isVerify);

    return (
      <td className="text-center align-middle">
        <div className="d-flex justify-content-center align-items-center gap-2">

          <button
            type="button"
            className="eye-btn"
            title="View"
            onClick={() =>
              navigate(`/activity/view/${props.dataItem.postId}`)
            }
          >
            <i className="fa fa-eye"></i>
          </button>
          
        </div>
      </td>
    );
  };

  const updateStatusToggle = async (postId, isActive) => {
      try {
        const res = await updatePostStatus(postId, isActive);
        fetchGroupActivity();
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

    const isSuccess = await updateStatusToggle(id, nextValue);

    if (!isSuccess) {
      alert("Failed to update status.");
    }
  };


  return (
    <div className="row">
      <div className="row align-items-center gap-3">
        <h3>Group Activity</h3>
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
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
                data={data}
                pageable={{
                  buttonCount: 4,
                  pageSizes: [5, 10, 20],
                  info: true,
                  previousNext: true,
                }}
                skip={page.skip}
                take={page.take}
                total={total}
                onPageChange={(e) => setPage(e.page)}
              >
                <GridColumn
                  title="Action"
                  headerClassName="text-center"
                  cells={{
                    data: ActionCell,
                  }}
                />
                <GridColumn
                  // width={"180px"}
                  field="userName"
                  title="Uploaded By"
                  cells={{ data: TextCell }}
                />
                <GridColumn title="Uploaded Date" cells={{ data: DateCell }} />
                <GridColumn
                  width={"250px"}
                  field="attachmentList"
                  title="Image/Video"
                  cells={{ data: AttachmentCell }}
                />
                <GridColumn
                  field="post"
                  title="Description"
                  cells={{ data: TextCell }}
                />
                
                <GridColumn
                  field="totalLike"
                  title="Likes"
          
                />
                <GridColumn
                  field="totalComment"
                  title="Comments"

                />
                <GridColumn
                  field="totalShare"
                  title="Share"

                />
               
                <GridColumn
                  field="totalReport"
                  title="Reported"
                //   cells={{ data: ReportedDataCell }}
                /> 

                <GridColumn
                  title="Status"
                  cells={{
                  data: (props) => (
                    <StatusCell
                      {...props}
                      idField="postId"
                      onToggle={handleStatusToggle}
                    />
                  ),
                }}
                />
              </Grid>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupActivity;

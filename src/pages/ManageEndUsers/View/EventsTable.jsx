import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Tooltip } from "@progress/kendo-react-tooltip";
import React, { useEffect, useState } from "react";
import { eventListByUser } from "../../../api/EndUsers/endUserViewApi";

function EventsTable({userId}) {
  const [data,setData]=useState([])
  const [total,setTotal]=useState(0)
  const [page,setPage]=useState({
    skip:0,
    take:10
  })

    useEffect(() => {
      fetchEvent();
    }, [page, userId]);
  
    const fetchEvent = async () => {
      console.log("UserID", userId);
  
      const body = {
        pageNumber: page.skip / page.take + 1,
        pageSize: page.take,
        search: "",
        statusId:null,
        isUpcomingEvent: true,
        userId,
      };
      try {
        const res = await eventListByUser(body);
        setData(res.data.data);
        setTotal(res.data.totalRecord);
        console.log("Event Data", res.data);
      } catch (error) {
        console.log(error?.response);
      }
    };
  

  return (
    <div className="tabbar-section">
      <div className="row">
        <div className="col-12 mt-3 mt-xxl-4">
          <div className="table-responsive" style={{ overflow: "visible" }}>
            <Tooltip
              anchorElement="target"
              position="top"
              openDelay={100}
              className="grid-tooltip"
            >
              <Grid
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
              >
                <GridColumn />
              </Grid>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsTable;

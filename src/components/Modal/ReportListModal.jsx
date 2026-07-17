import React, { useEffect, useState } from "react";
import { getReportList } from "../../api/EndUsers/endUserViewApi";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

function ReportListModal({ reportTypeId = 3, show, reportedId, onClose }) {
    if (!show) return null;
  const [page, setPage] = useState({
    take: 10,
    skip: 0,
  });

  const [reportList,setReportList]=useState([])

  useEffect(() => {
    if (!show || !reportedId) return;

    getReportListData();
  }, [show, reportedId, page]);

  const getReportListData = async () => {
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: 10,
      reportTypeId,
      reportedId,
      search: "",
    };
    try {
      console.log("ReportedId", reportedId);
      console.log(show);

      console.log(typeof reportedId);

      const res = await getReportList(body);
        setReportList(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">ABD</h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          {/* Body */}
          <div
            className="modal-body"
            style={{
              minHeight: "500px",
            }}
          >
            <Grid data={reportList}>
                <GridColumn 
                    field="reportedByUserName"
                    title="Reported By"
                />
                <GridColumn 
                    field="reportDate"
                    title="Reported Date"
                />
                <GridColumn 
                    field="comment"
                    title="Comment"
                />
            </Grid>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportListModal;

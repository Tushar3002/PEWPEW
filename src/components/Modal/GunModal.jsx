import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React from "react";

const GunModal = ({ show, onClose, title = "Gun List", data }) => {
  if (!show) return null;

  console.log(data);

  const GunImageCell = (props) => (
    <td>
      <img src={props.dataItem.gunImage.imageFullPath} alt="Gun" width={80} />
    </td>
  );

  const ManufacturerCell = (props) => (
    <td>
      <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginBottom: 0 }}>
      {props.dataItem.manufacturers?.map((m, index) => (
        <li key={index}>{m.name}</li>
      ))}
    </ul>
    </td>
  );

  const AmmunitionCell = (props) => (
  <td>
    <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginBottom: 0 }}>
      {props.dataItem.ammunitions?.map((a, index) => (
        <li key={index}>{a.name}</li>
      ))}
    </ul>
  </td>
);
  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.7)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          {/* Body */}
          <div
            className="modal-body"
            style={{
              minHeight: "500px",
            }}
          >
            <Grid data={data}>
              <GridColumn field="gunName" title="Gun Name" />
              <GridColumn
                // field="gunImage"
                title="Gun Image"
                cells={{ data: GunImageCell }}
              />
              <GridColumn
                // field="ammunitions"
                title="Ammunation"
                cells={{ data: AmmunitionCell }}
              />
              <GridColumn
                // field="manufacturers"
                title="Manufacturer"
                cells={{ data: ManufacturerCell }}
              />
            </Grid>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GunModal;

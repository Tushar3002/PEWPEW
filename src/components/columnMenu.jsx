import * as React from "react";
import {
  GridColumnMenuFilter,
  GridColumnMenuSort,
} from "@progress/kendo-react-grid";

export const ColumnMenu = (props) => {
  return (
    <div>
      {/* <GridColumnMenuSort {...props} /> */}

      <GridColumnMenuFilter
        {...props}
        expanded={true}
      />
    </div>
  );
};
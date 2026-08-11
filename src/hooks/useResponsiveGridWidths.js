import { useEffect, useRef, useState } from "react";

const ADJUST_PADDING = 4;
const COLUMN_MIN = 4;

export default function useResponsiveGridWidths(columns) {
  const gridRef = useRef(null);

  const grid = useRef(null);
  const minGridWidth = useRef(0);

  const [applyMinWidth, setApplyMinWidth] = useState(false);
  const [gridCurrent, setGridCurrent] = useState(0);

  useEffect(() => {

    grid.current = gridRef.current?.querySelector(".k-grid");

    if (!grid.current) return;

    minGridWidth.current = columns.reduce(
      (sum, column) => sum + (column.minWidth || 0),
      0
    );

    const handleResize = () => {
      if (!grid.current) return;

      const width = grid.current.offsetWidth;

      if (width < minGridWidth.current) {
        setApplyMinWidth(true);
      } else {
        setGridCurrent(width);
        setApplyMinWidth(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getWidth = (field) => {
    const column = columns.find((c) => c.field === field);

    if (!column) {
      console.warn(`No responsive width found for "${field}"`);
      return undefined;
    }

    let width = applyMinWidth
      ? column.minWidth
      : column.minWidth +
        (gridCurrent - minGridWidth.current) / columns.length;

    if (width >= COLUMN_MIN) {
      width -= ADJUST_PADDING;
    }

    return width;
  };

  return {
    gridRef,
    getWidth,
  };
}
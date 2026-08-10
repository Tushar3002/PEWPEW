import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import "./CustomPager.css";

import { SvgIcon } from "@progress/kendo-react-common";

import {
  chevronLeftIcon,
  chevronRightIcon,
  caretAltToLeftIcon,
  caretAltToRightIcon,
} from "@progress/kendo-svg-icons";

const CustomPager = ({
  skip,
  take,
  total,
  pageSizes = [5, 10, 20, 50, 100, 500],
  buttonCount = 5,
  onPageChange,
  previousNext = true,
  firstLast = true,
  info = true,
}) => {
  const totalPages = Math.max(1, Math.ceil(total / take));
  const currentPage = Math.floor(skip / take) + 1;

  const start = total === 0 ? 0 : skip + 1;
  const end = Math.min(skip + take, total);

  const changePage = (page) => {
    page = Math.max(1, Math.min(page, totalPages));

    if (page === currentPage) return;

    onPageChange({
      page: {
        skip: (page - 1) * take,
        take,
      },
    });
  };

  const changePageSize = (size) => {
    onPageChange({
      page: {
        skip: 0,
        take: Number(size),
      },
    });
  };

  const blockIndex = Math.floor((currentPage - 1) / buttonCount);

  const startPage = blockIndex * buttonCount + 1;

  const endPage = Math.min(startPage + buttonCount - 1, totalPages);

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="custom-pager">
      <div className="pager-left">
        <DropDownList
          data={pageSizes}
          value={take}
          onChange={(e) => changePageSize(e.value)}
          popupSettings={{
            appendTo: typeof window !== "undefined" ? document.body : undefined,
            positionMode: "fixed",
            popupClass: "k-dropdown-popup",
          }}
          style={{ width: 90 }}
        />

        <span>Items per page</span>

        {info && (
          <span className="pager-info">
            {start} - {end} of {total} items
          </span>
        )}
      </div>

      <div className="pager-right">
        {firstLast && (
          <button
            className="pager-btn"
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
          >
            <SvgIcon icon={caretAltToLeftIcon} />
          </button>
        )}

        {previousNext && (
          <button
            className="pager-btn"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <SvgIcon icon={chevronLeftIcon} />
          </button>
        )}

        {startPage > 1 && (
          <>
            <button
              className="page-more"
              onClick={() => changePage(startPage - buttonCount)}
            >
              ...
            </button>
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={page === currentPage ? "page-number" : "page-btn"}
            onClick={() => changePage(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <button className="page-more" onClick={() => changePage(startPage + buttonCount)}>
            ...
          </button>
        )}

        {previousNext && (
          <button
            className="pager-btn"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <SvgIcon icon={chevronRightIcon} />
          </button>
        )}

        {firstLast && (
          <button
            className="pager-btn"
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <SvgIcon icon={caretAltToRightIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomPager;

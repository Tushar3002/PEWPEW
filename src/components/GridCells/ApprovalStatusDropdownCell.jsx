import { DropDownList } from "@progress/kendo-react-dropdowns";

export const ApprovalStatusDropdownCell = ({
  dataItem,
  tdProps,
  approvalStatusDropdown,
  onStatusChange,
}) => {
  return (
    <td {...tdProps}>
      <DropDownList
        title={
          approvalStatusDropdown.find(
            (item) => item.id === dataItem.approvalStatus,
          )?.description || ""
        }
        data={approvalStatusDropdown}
        textField="description"
        dataItemKey="id"
        value={
          approvalStatusDropdown.find(
            (item) => item.id === dataItem.approvalStatus,
          ) || null
        }
        disabled={dataItem.isAdminAdd}
        popupSettings={{
          appendTo: typeof window !== "undefined" ? document.body : undefined,
          positionMode: "fixed",
          popupClass: "k-dropdown-popup",
        }}
        style={{ width: "100%" }}
        onChange={(e) => {
          onStatusChange(dataItem.gunId, e.value.id);
        }}
      />
    </td>
  );
};

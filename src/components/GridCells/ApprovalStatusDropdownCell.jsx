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
        data={approvalStatusDropdown}
        textField="description"
        dataItemKey="id"
        value={
          approvalStatusDropdown.find(
            (item) => item.id === dataItem.approvalStatus
          ) || null
        }
        disabled={dataItem.isAdminAdd}
        onChange={(e) => {
          onStatusChange(
            dataItem.gunId,
            e.value.id
          );
        }}
      />
    </td>
  );
};
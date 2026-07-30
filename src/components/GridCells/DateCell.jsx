export const DateCell = ({
  dataItem,
  tdProps,
  field = "createdOn",
}) => {
  const date = dataItem[field];

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US")
    : "-";

  return (
    <td {...tdProps}>
      <span title={formattedDate}>{formattedDate}</span>
    </td>
  );
};
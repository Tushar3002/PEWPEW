export const DateCell = (props) => {
    const date = props.dataItem.createdOn;

    const formattedDate = date
      ? new Date(date).toLocaleDateString("en-US")
      : "-";

    return (
      <td {...props.tdProps}>
        <span title={formattedDate}>{formattedDate}</span>
      </td>
    );
  };
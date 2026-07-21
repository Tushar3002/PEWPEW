
const StatusCell = ({ dataItem, tdProps, onToggle, idField = "id" }) => {
  return (
    <td {...tdProps} className="text-center align-middle">
      <div className="form-check form-switch d-inline-flex align-items-center m-0">
        <input
          className="form-check-input"
          type="checkbox"
          checked={Boolean(dataItem.isActive)}
          onChange={() =>
            onToggle(
              dataItem[idField],
              Boolean(dataItem.isActive)
            )
          }
        />
      </div>
    </td>
  );
};

export default StatusCell;
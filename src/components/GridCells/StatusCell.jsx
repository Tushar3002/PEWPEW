
const StatusCell = ({ dataItem, tdProps, onToggle, idField = "id" ,statusField = "isActive",}) => {

  return (
    <td {...tdProps} className="text-center align-middle">
      <div className="form-check form-switch d-inline-flex align-items-center m-0">
        <input
          className="form-check-input"
          type="checkbox"
          checked={Boolean(dataItem[statusField])}
          onChange={() =>
            onToggle(
              dataItem[idField],
              Boolean(dataItem[statusField])
            )
          }
        />
      </div>
    </td>
  );
};

export default StatusCell;
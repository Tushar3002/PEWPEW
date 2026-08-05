export const ActionCell = ({
  dataItem,
  tdProps,
  permission,
  idField = "id",
  onView,
  onEdit,
  onDelete,
}) => {
  const id = dataItem[idField];
    
  return (
    <td {...tdProps} className="text-center align-middle">
      <div className="d-flex justify-content-center align-items-center gap-2">

        {permission.canUpdate && onView && (
          <button
            className="eye-btn"
            title="View"
            onClick={() => onView(id)}
          >
            <i className="fa fa-eye"></i>
          </button>
        )}

        {permission.canCreate && onEdit && (
          <button
            className="edit-btn"
            title="Edit"
            onClick={() => onEdit(id)}
          >
            <i className="icon-edit-1"></i>
          </button>
        )}

        {permission.canDelete && onDelete && (
          <button
            className="delete-btn"
            title="Delete"
            onClick={() => onDelete(id)}
          >
            <i className="icon-delete-1"></i>
          </button>
        )}

      </div>
    </td>
  );
};
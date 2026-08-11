import { useNavigate } from "react-router-dom";

const UserCountCell = (props) => {
  const navigate = useNavigate();

  const { dataItem, tdProps, field } = props;

  const handleClick = () => {
    navigate("/manage-users", {
      state: {
        roleId: dataItem.id,
      },
    });
  };

  return (
    <td {...tdProps}>
      <button
        type="button"
        className="btn btn-link p-0 fw-semibold"
        onClick={handleClick}
      >
        {dataItem[field]}
      </button>
    </td>
  );
};

export default UserCountCell;
export const GunCountCell = (props) => {
  const count = props.dataItem.totalGun;
  const venueId = props.dataItem.venueId;

  return (
    <td {...props.tdProps}>
      <button
        type="button"
        className="btn btn-link p-0"
        onClick={() => handleGunClick(venueId)}
      >
        {count}
      </button>
    </td>
  );
};

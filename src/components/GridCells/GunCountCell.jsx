// export const GunCountCell = (props) => {
//   const count = props.dataItem.totalGun;
//   const venueId = props.dataItem.venueId;

//   return (
//     <td {...props.tdProps}>
//       <button
//         type="button"
//         className="btn btn-link p-0"
//         onClick={() => handleGunClick(venueId)}
//       >
//         {count}
//       </button>
//     </td>
//   );
// };
export const GunCountCell = ({
  dataItem,
  tdProps,
  onClick,
  field = "totalGun",
  idField = "venueId",
}) => {
  const count = dataItem[field];
  const id = dataItem[idField];

 return (
  <td {...tdProps}>
    {count > 0 ? (
      <button
        title={count}
        type="button"
        className="btn btn-link p-0"
        onClick={() => onClick(id)}
      >
        {count}
      </button>
    ) : (
      count
    )}
  </td>
);
};
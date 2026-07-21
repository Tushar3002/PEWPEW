export const DetailsCell = (props) => {
  const value = props.dataItem?.[props.field] ?? "-";

  return (
    <td {...props.tdProps}>
      <span
        title={value}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </td>
  );
};
export const DetailsCell = (props) => {
  const value = props.dataItem?.[props.field] ?? "-";

  return (
    <td {...props.tdProps} style={{ width: "100%", maxWidth: "100%" }}>
      <span
        title={value}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "100%",
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
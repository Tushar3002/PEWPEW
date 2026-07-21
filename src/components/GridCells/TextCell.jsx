export const TextCell = (props) => {
    const value = props.dataItem[props.field] ?? "";

    return (
      <td {...props.tdProps}>
        <span
          title={value}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "100%" }}
        >
          {value}
        </span>
      </td>
    );
  };
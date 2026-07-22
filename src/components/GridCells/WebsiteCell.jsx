const WebsiteCell = ({
  dataItem,
  tdProps,
  field = "website",
}) => {
  const url = dataItem[field];

  if (!url) {
    return <td {...tdProps}>-</td>;
  }

  const href =
    url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

  return (
    <td {...tdProps}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        title={url}
        style={{
          color: "#0d6efd",
          textDecoration: "underline",
        }}
      >
        {url}
      </a>
    </td>
  );
};

export default WebsiteCell;
const AttachmentCell = ({ dataItem, tdProps, onOpen, field }) => {
  const value = dataItem[field];

  const attachments = Array.isArray(value) ? value : value ? [value] : [];

  const isVideo = (url) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  return (
    <td {...tdProps}>
      {attachments.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
            gap: "6px",
          }}
        >
          {attachments.slice(0, 3).map((file, index) =>
            isVideo(file) ? (
              <div
                key={index}
                onClick={
                  onOpen ? () => onOpen?.(attachments, index) : undefined
                }
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <video
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    pointerEvents: "none",
                    borderRadius: "12px"
                  }}
                >
                  <source src={file} />
                </video>

                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    fontSize: "24px",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius:"12px"
                  }}
                >
                  ▶
                </div>
              </div>
            ) : (
              <img
                key={index}
                src={file}
                // alt={`Attachment ${index + 1}`}
                alt={`#`}
                onClick={onOpen ? () => onOpen(attachments, index) : undefined}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              />
            ),
          )}
        </div>
      ) : (
        "-"
      )}
    </td>
  );
};

export default AttachmentCell;

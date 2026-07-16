import React from "react";

const AttachmentViewerModal = ({
  show,
  onClose,
  attachments = [],
  currentIndex,
  setCurrentIndex,
}) => {
  if (!show) return null;

  const currentFile = attachments[currentIndex];

  const isVideo = (url) => /\.(mp4|mov|webm)$/i.test(url);

  const previous = () => {
    setCurrentIndex((prev) => (prev === 0 ? attachments.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === attachments.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "rgba(0,0,0,.8)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}

          <div className="modal-header">
            <h5 className="modal-title">
              Attachment {currentIndex + 1} / {attachments.length}
            </h5>

            <button className="btn-close" onClick={onClose} />
          </div>

          {/* Body */}

          <div
            className="modal-body"
            style={{
              minHeight: "70vh",
              position: "relative",
            }}
          >
            {/* Main Preview */}

            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                minHeight: "60vh",
                position: "relative",
              }}
            >
              {attachments.length > 1 && (
                <button
                  className="btn btn-dark position-absolute start-0 ms-3"
                  onClick={previous}
                >
                  ❮
                </button>
              )}

              {isVideo(currentFile) ? (
                <video
                  controls
                  autoPlay
                  style={{
                    maxHeight: "60vh",
                    maxWidth: "100%",
                  }}
                >
                  <source src={currentFile} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={currentFile}
                  alt=""
                  style={{
                    maxHeight: "60vh",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              )}

              {attachments.length > 1 && (
                <button
                  className="btn btn-dark position-absolute end-0 me-3"
                  onClick={next}
                >
                  ❯
                </button>
              )}
            </div>

            {/* Thumbnails */}

            <div
              className="d-flex justify-content-center gap-2 mt-4"
              style={{
                overflowX: "auto",
                paddingBottom: "10px",
              }}
            >
              {attachments.map((file, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    cursor: "pointer",
                    border:"2px solid #ddd",
                    borderRadius: "6px",
                    padding: "2px",
                    flexShrink: 0,
                  }}
                >
                  {isVideo(file) ? (
                    <video
                      muted
                      style={{
                        width: "90px",
                        height: "70px",
                        objectFit: "cover",
                        pointerEvents: "none",
                        borderRadius: "4px",
                      }}
                    >
                      <source src={file} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={file}
                      alt=""
                      style={{
                        width: "90px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentViewerModal;

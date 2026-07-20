import React, { useEffect, useState } from "react";
import { getPostComments } from "../../api/EndUsers/endUserViewApi";

function ActivityComments({ postId }) {
  const [comments, setComments] = useState([]);

  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  useEffect(() => {
    if (!postId) return;

    getCommentsData();
  }, [postId]);

  const getCommentsData = async () => {
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      postId,
      search: "",
    };
    try {
      const res = await getPostComments(body);
      console.log(res.data);

      setComments(res.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const CommentItem = ({ item, isReply = false }) => {
    return (
      <div className={`mb-3 ${isReply ? "ms-5" : ""}`}>
        <div className="d-flex gap-3">
          <img
            src={item.profileImagePath}
            alt={item.userName}
            width="45"
            height="45"
            className="rounded-circle"
            style={{
              objectFit: "cover",
            }}
          />

          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-bold">{item.userName}</span>

                {item.isVerify && <span className="ms-1">✓</span>}
              </div>

              <small className="text-muted">
                {new Date(item.createdOn).toLocaleString()}
              </small>
            </div>

            {item.comment && <p className="mb-1 mt-1">{item.comment}</p>}

            {/* {item.gifUrl && (
              <img
                src={item.gifUrl}
                alt="GIF"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            )} */}

            <div className="d-flex gap-3">
              <small className="text-muted">{item.totalLike || 0} Likes</small>

              <small className="text-muted">
                {item.replies?.length || 0} Replies
              </small>
            </div>

            {/* Replies */}
            {item.replies?.length > 0 && (
              <div className="mt-3">
                {item.replies.map((reply) => (
                  <CommentItem key={reply.commentId} item={reply} isReply />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="border rounded p-3"
      style={{
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      {comments.length > 0 ? (
        comments.map((item) => <CommentItem key={item.commentId} item={item} />)
      ) : (
        <p className="mb-0">No comments available.</p>
      )}
    </div>
  );
}

export default ActivityComments;

import React, { useEffect, useState } from "react";
import { getPostComments } from "../../api/EndUsers/endUserViewApi";

const CommentItem = ({ item, isReply = false }) => {
  const formatDateTime = (date) => {
    if (!date) return "";

    const formatted = new Date(`${date}Z`).toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return formatted.replace(",", "");
  };
  return (
    <div className={`mb-3 ${isReply ? "ms-5" : ""}`}>
      <div>
        <h2>Comments:</h2>
        <hr />
      </div>
      <div className="d-flex gap-3">
        <img
          src={item.profileImagePath}
          alt={item.userName || "User"}
          width="45"
          height="45"
          className="rounded-circle"
          style={{ objectFit: "cover" }}
        />

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="fw-bold text-dark">{item.userName}</span>

            {item.isVerify && (
              <span>
                <i className="demo-icon icon-verified ng-star-inserted"></i>
              </span>
            )}

            <small className="text-muted">
              {formatDateTime(item.createdOn)}
            </small>
          </div>

          {item.comment && (
            <p className="mb-1 mt-2 fw-bold text-dark" style={{ fontSize: "17px" }}>
              {item.comment}
            </p>
          )}

          <div className="d-flex gap-3">
            <small className="text-muted">{item.totalLike || 0} Likes</small>

            <small className="text-muted">
              {item.replies?.length || 0} Replies
            </small>
          </div>

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

function ActivityComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState({
    skip: 0,
    take: 10,
  });

  useEffect(() => {
    if (!postId) return;

    getCommentsData();
  }, [postId, page.skip, page.take]);

  const getCommentsData = async () => {
    const body = {
      pageNumber: page.skip / page.take + 1,
      pageSize: page.take,
      postId,
      search: "",
    };

    try {
      setLoading(true);

      const res = await getPostComments(body);

      console.log("Comments Data:", res.data);

      setComments(res.data?.data || []);
    } catch (error) {
      console.log("Failed to fetch comments:", error.response);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="border rounded p-3">
        <p className="mb-0">Loading comments...</p>
      </div>
    );
  }

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
        <p className="mb-0 text-muted">No comments available.</p>
      )}
    </div>
  );
}

export default ActivityComments;

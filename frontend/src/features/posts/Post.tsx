import { IPost } from "../../types";
import { Link } from "react-router-dom";
import React from "react";
import { apiUrl } from "../../globalConstants.ts";
import dayjs from "dayjs";

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div
      className="w-75 p-3 mb-4 row d-flex shadow rounded border-0"
      style={{ maxWidth: "700px" }}
    >
      <div
        className={
          post.post.image
            ? "col-sm-12 col-md-6 col-lg-6 col-xl-6"
            : "col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex align-items-center justify-content-center text-primary"
        }
        style={{ minWidth: "200px" }}
      >
        {post.post.image ? (
          <img
            src={post.post.image ? `${apiUrl}/${post.post.image}` : undefined}
            alt={post.post.title}
            className="w-100 h-auto mb-3 rounded col-6"
          />
        ) : (
          <i className="bi bi-chat-left-text-fill"></i>
        )}
      </div>
      <div
        className={"col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex flex-column"}
      >
        <h5 className="fs-4 mb-1">{post.post.user.username}</h5>
        <p className="text-muted">
          {dayjs(post.post.datetime).format("DD.MM.YYYY в HH:mm")}
        </p>
        <h5 className="fw-semibold my-auto fs-3 fs-sm-6 mb-4">
          {post.post.title}
        </h5>
        <div className="mt-auto mb-3">
          <span className={"mb-2 d-inline-block"}>
            {" "}
            {post.commentNumber} коментария(ев)
          </span>
          <Link to={`/posts/${post.post._id}`} className="btn btn-primary">
            Читать полностью
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;

import { IPost } from "../../types";
import { Link } from "react-router-dom";
import React from "react";
import { apiUrl } from "../../globalConstants.ts";

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
  return (
    <div
      className="card mb-4 d-flex flex-column shadow rounded border-0"
      style={{ maxWidth: "400px" }}
    >
      <div className="card-header bg-white">
        <h4 className="card-title m-0 p-0">{post.user.username}</h4>
      </div>
      <div className="card-body d-flex flex-column pb-4">
        <img
          src={post.image ? `${apiUrl}/${post.image}` : undefined}
          alt={post.title}
          className="w-100 h-auto card-img mb-3"
        />
        <h5 className="card-text fw-bold mb-4">{post.title}</h5>

        <div className="mt-auto">
          <Link to={`/posts/${post._id}`} className="btn btn-primary">
            Читать полностью
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;

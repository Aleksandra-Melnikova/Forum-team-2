import { IComment } from "../../types";
import React from "react";

interface Props {
  comment: IComment;
}

const CommentItem: React.FC<Props> = ({ comment }) => {
  return (
    <div>
      <div className="text-start bg-white border rounded-4 p-3 mb-2">
        <p>{comment.text}</p>
        <hr />
        <p>Автор: {comment.user.username}</p>
      </div>
    </div>
  );
};

export default CommentItem;

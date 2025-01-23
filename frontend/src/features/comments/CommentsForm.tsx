import React, { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/UserSlice.ts";
import { addComment, getAllCommentsByPost } from "./CommentThunk.ts";

interface Props {
  postId: string | undefined;
}

const CommentsForm: React.FC<Props> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [text, setText] = useState("");

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Комментарий не может быть пустым!");
      return;
    }

    if (postId && text.trim().length > 0) {
      try {
        await dispatch(addComment({ post_id: postId, comment: text }));
        await dispatch(getAllCommentsByPost(postId));
        setText("");
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    postId &&
    user && (
      <div>
        <div
          style={{ maxWidth: "100%" }}
          className="container mt-5 bg-white p-4 shadow rounded"
        >
          <h3 className="text-center mb-5 mt-2">Новый комментарий</h3>

          <form onSubmit={formSubmit}>
            <div className="mb-3">
              <label htmlFor="title">Коментарий</label>
              <input
                type="text"
                className="form-control"
                name="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="d-flex gap-3 justify-content-center mb-3">
              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center"
              >
                <span className="me-2">Добавить комментарий</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CommentsForm;

import { selectOnePost } from "./PostSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { getPost } from "./PostThunk.ts";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../globalConstants.ts";
import CommentsForm from '../comments/CommentsForm.tsx';
import Comments from '../comments/Comments.tsx';
import { getAllCommentsByPost } from '../comments/CommentThunk.ts';

const DetailedPost = () => {
  const post = useAppSelector(selectOnePost);
  const dispatch = useAppDispatch();
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
      dispatch(getAllCommentsByPost(postId))
    }
  }, [dispatch, postId]);

  return (
    post && (
      <div className="container mt-5">
        <div className="my-5 shadow rounded">
          <div className="card shadow-sm rounded border-0">
            <div className="card-body">
              <h3>{post.user.username}</h3>
              <hr />
              <h5 className="card-title my-4">{post.title}</h5>
              <img
                src={post.image ? `${apiUrl}/${post.image}` : undefined}
                alt={post.title}
                className="w-25 card-img mb-4"
              />
              <p className="card-text">
                {post.description ? post.description : null}
              </p>
              <p className="text-muted">
                {dayjs(post.datetime).format("DD.MM.YYYY, в HH:mm")}
              </p>
            </div>
          </div>
        </div>
        <hr/>
        <CommentsForm postId={postId}/>
        <hr/>
        <Comments/>
      </div>
    )
  );
};

export default DetailedPost;

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
      <div className="container mt-5 ">
        <div className="my-5 shadow rounded">
          <div className=" shadow-sm  p-3 rounded border-0">
            <div className="d-flex flex-column">
              <h3>{post.user.username}</h3>
              <hr />
              <h5 className=" fw-semibold fs-4 my-2">{post.title}</h5>
              <div className={"row d-flex mt-2"}>
                <div className={"col-lg-6 col-xl-6 col-md-6 col-sm-12"}>
                  <img
                    src={post.image ? `${apiUrl}/${post.image}` : undefined}
                    alt={post.title}
                    className="w-100 mb-4 rounded"
                  />
                </div>
                <div
                  className={
                    "col-lg-6 col-xl-6 col-md-6 col-sm-12 d-flex flex-column"
                  }
                >
                  <p className=" flex-grow-1">
                    {post.description ? post.description : null}
                  </p>
                  <p className="text-muted">
                    {dayjs(post.datetime).format("DD.MM.YYYY, в HH:mm")}
                  </p>
                </div>
              </div>
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

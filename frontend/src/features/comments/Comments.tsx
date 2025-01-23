import { useAppSelector } from "../../app/hooks.ts";
import { selectComment, selectCommentLoading } from "./CommentSlice.ts";
import CommentItem from "./CommentItem.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";

const Comments = () => {
  const comments = useAppSelector(selectComment);
  const loadingComment = useAppSelector(selectCommentLoading);

  return (
    <div>
      {loadingComment ? (
        <Loader />
      ) : (
        <>
          <h4>Комментарии:</h4>
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </>
          ) : (
            <p>Нет комментариев</p>
          )}
        </>
      )}
    </div>
  );
};

export default Comments;

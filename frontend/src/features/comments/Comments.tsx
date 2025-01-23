import { useAppSelector } from '../../app/hooks.ts';
import { selectComment } from './CommentSlice.ts';
import CommentItem from './CommentItem.tsx';

const Comments = () => {
  const comments = useAppSelector(selectComment);

  return (
    <div>
      <h4>Комментарии:</h4>
        {comments.length > 0 ?
          <>
            {comments.map(comment => (
              <CommentItem key={comment._id} comment={comment}/>
            ))}
          </>
          : <p>Нет комментариев</p>
        }
    </div>
  );
};

export default Comments;
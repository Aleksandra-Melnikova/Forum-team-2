import { useAppSelector } from '../../app/hooks.ts';
import { selectComment } from './CommentSlice.ts';
import CommetItem from './CommetItem.tsx';

const Comments = () => {
  const comments = useAppSelector(selectComment);

  return (
    <div>
      <h4>Комментарии:</h4>
        {comments.length > 0 ?
          <>
            {comments.map(comment => (
              <CommetItem key={comment._id} comment={comment}/>
            ))}
          </>
          : <p>Нет комментариев</p>
        }
    </div>
  );
};

export default Comments;
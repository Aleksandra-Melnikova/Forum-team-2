import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectFetching, selectPosts } from "./PostSlice.ts";
import { useEffect } from "react";
import { fetchPosts } from "./PostThunk.ts";
import { IPost } from "../../types";
import Post from "./Post.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isLoading = useAppSelector(selectFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-column align-items-center mt-5">
          <>
            {posts.map((post: IPost) => (
              <Post post={post} key={post.post._id} />
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default Posts;

import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectPosts } from "./PostSlice.ts";
import { useEffect } from "react";
import { fetchPosts } from "./PostThunk.ts";
import { IPost } from "../../types";
import Post from "./Post.tsx";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <>
        {posts.map((post: IPost) => (
          <Post post={post} key={post._id} />
        ))}
      </>
    </div>
  );
};

export default Posts;

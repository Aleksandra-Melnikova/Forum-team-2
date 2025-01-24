import { createSlice } from "@reduxjs/toolkit";
import { IDetailedPost, IPost, ValidationError } from "../../types";
import { addPost, fetchPosts, getPost } from "./PostThunk.ts";
import { RootState } from "../../app/store.ts";

interface PostState {
  posts: IPost[];
  post: IDetailedPost | null;
  isFetching: boolean;
  isCreating: boolean;
  fetchingError: boolean;
  creatingError: ValidationError | null;
}

const initialState: PostState = {
  posts: [],
  post: null,
  isFetching: false,
  isCreating: false,
  fetchingError: false,
  creatingError: null,
};

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectOnePost = (state: RootState) => state.posts.post;

export const selectFetching = (state: RootState) => state.posts.isFetching;
export const selectCreating = (state: RootState) => state.posts.isCreating;

export const selectCreatingError = (state: RootState) =>
  state.posts.creatingError;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.isFetching = false;
        state.posts = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      })
      .addCase(addPost.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(addPost.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.creatingError = error || null;
      })
      .addCase(getPost.pending, (state) => {
        state.isFetching = true;
        state.fetchingError = false;
      })
      .addCase(getPost.fulfilled, (state, { payload: post }) => {
        state.isFetching = false;
        state.post = post || null;
      })
      .addCase(getPost.rejected, (state) => {
        state.isFetching = false;
        state.fetchingError = true;
      });
  },
});

export const postsReducer = postsSlice.reducer;

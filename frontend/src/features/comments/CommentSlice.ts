import { IComment, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store.ts";
import { addComment, getAllCommentsByPost } from "./CommentThunk.ts";

interface CommentState {
  comments: IComment[];
  loading: boolean;
  error: boolean;
  addError: ValidationError | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: false,
  addError: null,
};

export const selectComment = (state: RootState) => state.comments.comments;
export const selectCommentLoading = (state: RootState) =>
  state.comments.loading;
export const selectCommentErrorAdd = (state: RootState) =>
  state.comments.addError;

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentsByPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getAllCommentsByPost.fulfilled,
        (state, { payload: comment }) => {
          state.loading = false;
          state.comments = comment;
        },
      )
      .addCase(getAllCommentsByPost.rejected, (state) => {
        state.error = true;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.addError = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, { payload: error }) => {
        state.addError = error || null;
      });
  },
});

export const commentsReducer = commentSlice.reducer;

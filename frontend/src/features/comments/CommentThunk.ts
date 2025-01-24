import { createAsyncThunk } from "@reduxjs/toolkit";
import { IComment, ValidationError } from "../../types";
import axiosApi from "../../axiosApi.ts";
import { isAxiosError } from "axios";
import { RootState } from "../../app/store.ts";

export const getAllCommentsByPost = createAsyncThunk<IComment[], string>(
  "comments/getAllCommentsByPost",
  async (postId: string) => {
    const { data: comments } = await axiosApi.get(`comments?post_id=${postId}`);
    return comments || [];
  },
);

export const addComment = createAsyncThunk<
  string,
  { post_id: string; comment: string },
  { state: RootState; rejectValue: ValidationError }
>(
  "comment/add-by-post",
  async (
    data: { post_id: string; comment: string },
    { getState, rejectWithValue },
  ) => {
    const token = getState().users?.user?.token;
    try {
      if (token) {
        const response = await axiosApi.post(
          `comments?post_id=${data.post_id}`,
          { text: data.comment },
          { headers: { Authorization: token } },
        );
        return response.data.id;
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  },
);

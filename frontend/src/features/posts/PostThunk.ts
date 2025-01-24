import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IDetailedPost,
  IPost,
  IPostMutation,
  ValidationError,
} from "../../types";
import axiosApi from "../../axiosApi.ts";
import { RootState } from "../../app/store.ts";
import { isAxiosError } from "axios";

export const fetchPosts = createAsyncThunk<IPost[], void>(
  "posts/fetchPosts",
  async () => {
    const response = await axiosApi.get<IPost[]>("/posts");
    return response.data;
  },
);

export const addPost = createAsyncThunk<
  IPost,
  { postMutation: IPostMutation },
  { state: RootState; rejectValue: ValidationError }
>("posts/addPost", async ({ postMutation }, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  try {
    const formData = new FormData();
    const keys = Object.keys(postMutation) as (keyof IPostMutation)[];

    keys.forEach((key) => {
      const value: string | File | null = postMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post<IPost>("/posts", formData, {
      headers: { Authorization: token },
    });
    return response.data;
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
});

export const getPost = createAsyncThunk<IDetailedPost, string>(
  "posts/getPost",
  async (postId) => {
    const response = await axiosApi.get<IDetailedPost>(`/posts/${postId}`);
    return response.data;
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IComment } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getAllCommentsByPost = createAsyncThunk<IComment[], string>(
  'comments/getAllCommentsByPost',
  async (postId:string) =>{
    const {data: comments} = await axiosApi.get(`comments?post_id=${postId}`);
    return comments || [];
  }
)

import React, { useEffect, useState } from "react";
import FileInput from "./FileInput.tsx";
import { IPostMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../users/UserSlice.ts";
import { useNavigate } from "react-router-dom";
import { selectCreating, selectCreatingError } from "./PostSlice.ts";
import { addPost } from "./PostThunk.ts";
import ButtonLoading from "../../components/UI/ButtonLoading/ButtonLoading.tsx";

const initialState = {
  title: "",
  description: "",
  image: null,
};

const PostForm = () => {
  const [form, setForm] = useState<IPostMutation>({ ...initialState });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const creatingError = useAppSelector(selectCreatingError);
  const isCreating = useAppSelector(selectCreating);

  useEffect(() => {
    if (!user) navigate("/register");
  }, [navigate, user]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(addPost({ postMutation: form })).unwrap();
      setForm({ ...initialState });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState: IPostMutation) => ({ ...prevState, [name]: value }));
  };

  const onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState: IPostMutation) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <>
      <div
        style={{ maxWidth: "500px" }}
        className="container mt-5 bg-white p-4 shadow rounded"
      >
        <h3 className="text-center mb-5 mt-2">Новый пост</h3>

        <form onSubmit={onFormSubmit}>
          {creatingError && (
            <div className="alert alert-danger" role="alert">
              {creatingError.error}
            </div>
          )}

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={form.title}
              onChange={onInputChange}
            />
            <label htmlFor="title">Заголовок</label>
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={onInputChange}
              className="form-control"
            />
            <label htmlFor="description">Описание</label>
          </div>

          <div className="mb-3">
            <FileInput
              name="image"
              label="Изображение"
              onGetFile={onFileChange}
              file={form.image}
            />
          </div>

          <div className="d-flex gap-3 justify-content-center mb-3">
            <ButtonLoading
              isLoading={isCreating}
              isDisabled={isCreating}
              text="Опубликовать"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default PostForm;

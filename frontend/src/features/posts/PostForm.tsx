import React, { useState } from "react";
import FileInput from "./FileInput.tsx";
import { IPostMutation } from "../../types";

const initialState = {
  title: "",
  description: "",
  image: null,
};

const PostForm = () => {
  const [form, setForm] = useState<IPostMutation>({ ...initialState });

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
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
    <div
      style={{ maxWidth: "500px" }}
      className="container mt-5 bg-white p-4 shadow rounded"
    >
      <h3 className="text-center mb-5 mt-2">Новый пост</h3>

      <form onSubmit={onFormSubmit}>
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
            className="form-control"
            name="description"
            id="description"
            value={form.description}
            onChange={onInputChange}
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
          <button
            type="submit"
            className="btn btn-primary d-flex align-items-center"
          >
            <span className="me-2">Опубликовать</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

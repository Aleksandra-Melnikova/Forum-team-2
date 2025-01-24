import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";
import PostForm from "./features/posts/PostForm.tsx";
import Posts from "./features/posts/Posts.tsx";
import DetailedPost from "./features/posts/DetailedPost.tsx";
import Layout from "./components/UI/Layout/Layout.tsx";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/add-post" element={<PostForm />} />
          <Route path="/posts/:postId" element={<DetailedPost />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<h1 className={"text-center mt-5"}>Not found</h1>}
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

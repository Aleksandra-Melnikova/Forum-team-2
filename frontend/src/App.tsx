import "./App.css";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./features/users/RegisterPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={<h1 className={"text-center mt-5"}>Not found</h1>}
        />
      </Routes>
    </>
  );
}

export default App;

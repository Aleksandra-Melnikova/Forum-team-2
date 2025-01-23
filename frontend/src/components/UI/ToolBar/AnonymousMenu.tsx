import { NavLink } from "react-router-dom";
import "./ToolBar.css";
const AnonymousMenu = () => {
  return (
    <div>
      <li className="nav-item fs-4">
        <NavLink
          className={`nav-link mb-2 mt-2 text-white d-inline-block link-tool`}
          to={"/register"}
        >
          Регистрация
        </NavLink>
        <span className={"text-white "}> или </span>
        <NavLink
          to={"/login"}
          className={`nav-link mb-2 mt-2 text-white d-inline-block link-tool`}
        >
          Вход
        </NavLink>
      </li>
    </div>
  );
};

export default AnonymousMenu;

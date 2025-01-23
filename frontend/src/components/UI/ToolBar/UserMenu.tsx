import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks.ts";
import { logout } from "../../../features/users/UserThunk.ts";
import { unsetUser } from "../../../features/users/UserSlice.ts";
import "./ToolBar.css";

export interface UserMenuProps {
  username: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ username }) => {
  const dispatch = useAppDispatch();
  const HandleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
  };
  return (
    <div>
      <li className="nav-item fs-5">
        <p className={"d-block text-white ms-2 mt-3 mb-0"}>
          Привет, <strong>{username}! </strong>
        </p>
        <NavLink
          className={`mb-2 mt-1 d-inline-block nav-link btn button-add text-primary bg-white p-2`}
          to={"/add-post"}
        >
          Добавить новый пост
        </NavLink>
        <span className={"text-white "}> или </span>
        <button
          type={"button"}
          onClick={HandleLogout}
          className={`mb-2 mt-1 d-inline-block nav-link btn button-add text-primary bg-white p-2`}
        >
          Выйти
        </button>
      </li>
    </div>
  );
};

export default UserMenu;

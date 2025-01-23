import { useNavigate } from "react-router-dom";
import { RegisterMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { login } from "./UserThunk.ts";
import { selectLoginError, selectLoginLoading } from './UserSlice.ts';

//
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ButtonLoading from '../../components/UI/ButtonLoading/ButtonLoading.tsx';

const Register = () => {
  const [form, setForm] = useState<RegisterMutation>({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoginLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black ">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Войти
                    </p>
                    <form onSubmit={submitFormHandler} className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          {loginError ? (
                            <div
                              className="alert alert-danger w-100 text-center p-1 mx-auto"
                              role="alert"
                            >
                              {loginError.error}
                            </div>
                          ) : null}
                          <input
                            type="text"
                            id="username"
                            className={"form-control"}
                            onChange={inputChangeHandler}
                            value={form.username}
                            name="username"
                          />
                          <label className="form-label" htmlFor={"username"}>
                            Ваше имя
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            className={"form-control"}
                            onChange={inputChangeHandler}
                            value={form.password}
                            name="password"
                          />
                          <label htmlFor={"password"} className="form-label">
                            Пароль
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <ButtonLoading
                          type="submit"
                          text={" Войти"}
                          isLoading={loading}
                          isDisabled={loading}
                        />
                      </div>
                      <NavLink to={"/register"} className={"d-block text-center"}>
                        Еще нет аккаунта? Зарегистрироваться
                      </NavLink>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;

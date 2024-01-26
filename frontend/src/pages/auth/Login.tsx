import React from "react";
import { useForm } from "react-hook-form";

import { ILoginData } from "../../interfaces/AuthInterface";

import CommonButton from "../../commonComponent/CommonButton";
import CommonInput from "../../commonComponent/CommonInput";

import "./auth.scss";
import { loginUser } from "../../store/authSlice";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constant/routes";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({});

  const handleLogin = async (data: ILoginData) => {
    const result = await dispatch(loginUser(data));

    if (result.payload.success === true) {
      navigate(ROUTES.CHAT);
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login into ConnectChat</h2>
      <form onSubmit={handleSubmit((data) => handleLogin(data as ILoginData))}>
        <CommonInput
          type="text"
          control={control}
          name="email"
          className="login-field"
          placeholder="enter your email"
        />
        <CommonInput
          type="password"
          control={control}
          name="password"
          className="login-field"
          placeholder="password"
        />
        <CommonButton type="submit" className="login-btn">
          submit
        </CommonButton>
      </form>
    </div>
  );
};

export default Login;

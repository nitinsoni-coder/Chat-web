import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";

import ROUTES from "./constant/routes";
import Chat from "./pages/chat/Chat";
import Register from "./pages/auth/Register";

import "./styles/styles.scss";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      <Route path={ROUTES.REGISTER} element={<Register />}></Route>
      <Route path={ROUTES.CHAT} element={<Chat />}></Route>
    </Routes>
  );
}

export default App;

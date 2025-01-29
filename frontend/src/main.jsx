import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Home />} path="/home" />
        <Route element={<Cadastro />} path="/cadastro" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

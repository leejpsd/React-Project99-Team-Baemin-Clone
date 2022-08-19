import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Goods from "../pages/Goods";
import GoodsDetail from "../pages/GoodsDetail";
import Login from "../pages/Login";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="goods" element={<Goods />} />
                <Route path="goods-detail" element={<GoodsDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
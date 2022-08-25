import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Goods from '../pages/jungpyo/Goods';
import GoodsDetail from '../pages/jungpyo/GoodsDetail';
import Login from "../pages/Login";
import Main from "../pages/Main";
import SignUp from "../pages/SignUp";
import Basket from '../pages/jungpyo/Basket';
import Living from '../pages/jungpyo/Living';
import Stationery from '../pages/jungpyo/Stationery';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="gd" element={<Goods />} />
                <Route path="lv" element={<Living />} />
                <Route path="st" element={<Stationery />} />
                <Route path="/gsd/:id" element={<GoodsDetail />} />
                <Route path="bas" element={<Basket />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
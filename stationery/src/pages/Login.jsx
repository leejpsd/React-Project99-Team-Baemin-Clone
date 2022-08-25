import React, { useEffect, useState } from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/modules/loginSlice";
import { __loginUsers } from "../redux/modules/loginSlice";

// bootstrap - login form
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

// component
import Header from "../components/Header";
import Footer from "../components/Footer"
import axios from "axios";


const Login = () => {
    // dispatch
    const dispatch = useDispatch();

    // Slice
    const { login } = useSelector((state) => state.login);

    console.log(login)

    // navigate
    const navigate = useNavigate();

    const MoveSignUp = () => {
        navigate("/signup")
    }

    // login useState
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    // const [user, setUser] = useState('');
    const loginUser = { id, pw };

    const loginSubmit = () => {
        console.log(loginUser)
        dispatch(__loginUsers(loginUser))
    }




    return (
        <>
            <Header />
            <LoginTitle>
                로그인
            </LoginTitle>
            <LoginForm>
                <InputText type="text" name="id" id="id" onChange={e => setId(e.target.value)} placeholder="아이디" />
                <InputText type="password" name="pw" id="pw" onChange={e => setPw(e.target.value)} placeholder="비밀번호" />
                <SubmitButton
                    onClick={loginSubmit}
                    style={id === "" || pw === "" ? { backgroundColor: '#eee', color: '#ccc', pointerEvents: 'none', border: '1px solid #eee' } : {}}
                >
                    로그인
                </SubmitButton>
            </LoginForm>
            <SignUpWrap>아직 회원이 아니신가요? &nbsp; &nbsp;
                <SignUpLink onClick={MoveSignUp}>회원가입</SignUpLink>
            </SignUpWrap>
            <Footer />
        </>
    )
}

const LoginTitle = styled.div`
    padding: 180px 0 60px 0;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
`;

const LoginForm = styled.div`
    width: 400px;
    margin: 0 auto;
`;

const SubmitButton = styled.button`
    width: 400px;
    padding: 16px 0;
    border: 1px solid #2AC1BC;
    border-radius: 6px;
    background-color: #2AC1BC;
    color: #fff;
    transition: 0.4s;
    &:hover {
        background-color: #fff;
        color: #2AC1BC;
        border: 1px solid #2AC1BC;
        
    }
`;

const SignUpWrap = styled.div`
    text-align: center;
    font-size: 16px;
    color: #999;
    margin-top: 50px;
`;

const SignUpLink = styled.span`
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
`;

// const FocusText = styled.label`
//     font-size: 20px;
//     font-weight: 300;
//     color: #ddd;
//     position: absolute;
//     top: 15px;
//     left: 12px;

//     &:focus {
//         color:red;
//     }
// `;

const InputText = styled.input`
    width: 100%;
    height: 62px;
    padding: 0 12px;
    margin-bottom: 24px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-weight: 300;
    // html 기본 focus css 삭제
    outline: none;
    transition: 0.2s;
    &:focus {
        border: 1px solid #2AC1BC;
    }
`;
export default Login;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/modules/loginSlice";
import { __loginUsers } from "../redux/modules/loginSlice";

// component
import Head from "./jungpyo/Head";
import Foot from "./jungpyo/Foot";
import axios from "axios";

const Login = () => {
  // dispatch
  const dispatch = useDispatch();

  // Slice
  const { login } = useSelector((state) => state.login);

  // navigate
  const navigate = useNavigate();

  const MoveSignUp = () => {
    navigate("/signup");
  };

  // login useState
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  // const [user, setUser] = useState('');
  const loginUser = { id, pw };

  const loginSubmit = () => {
    dispatch(__loginUsers(loginUser));
  };

  return (
    <>
      <Head />
      <LoginTitle>로그인</LoginTitle>
      <LoginForm>
        <InputText
          type="text"
          name="id"
          id="id"
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
        />
        <InputText
          type="password"
          name="pw"
          id="pw"
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
        />
        <SubmitButton
          onClick={loginSubmit}
          style={
            id === "" || pw === ""
              ? {
                  backgroundColor: "#eee",
                  color: "#ccc",
                  pointerEvents: "none",
                  border: "1px solid #eee",
                }
              : {}
          }
        >
          로그인
        </SubmitButton>
      </LoginForm>
      <SignUpWrap>
        아직 회원이 아니신가요? &nbsp; &nbsp;
        <SignUpLink onClick={MoveSignUp}>회원가입</SignUpLink>
      </SignUpWrap>
      <Foot />
    </>
  );
};

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
  border: 1px solid #2ac1bc;
  border-radius: 6px;
  background-color: #2ac1bc;
  color: #fff;
  transition: 0.4s;
  &:hover {
    background-color: #fff;
    color: #2ac1bc;
    border: 1px solid #2ac1bc;
  }
`;

const SignUpWrap = styled.div`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin-top: 50px;
  margin-bottom: 230px;
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
    border: 1px solid #2ac1bc;
  }
`;
export default Login;

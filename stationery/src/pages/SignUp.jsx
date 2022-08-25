import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpSlice } from "../redux/modules/signUpSlice";
import { addUser } from "../redux/modules/signUpSlice";
import axios from "axios";

// bootstrap - login form
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

// component
import Head from "./jungpyo/Head";
import Foot from "./jungpyo/Foot";

// image
import moreBtn from "../images/ic_btn_more.png";
import closeBtn from "../images/ic_btn_close.png";

const SignUp = () => {
  // dispatch
  const dispatch = useDispatch();

  // reducer
  const signUpSlice = useSelector((state) => state.signUp.signUp);

  // checkbox state
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPersonalInfo, setAgreedPersonalInfo] = useState(false);
  const [marketingAgreement, setMarketingAgreement] = useState(false);
  const [marketingSms, setMarketingSms] = useState(false);
  const [marketingEmail, setMarketingEmail] = useState(false);

  // stepState
  const [firstStep, setFirstStep] = useState(true);
  const [secondStep, setSecondStep] = useState(false);

  // checkbox custom
  const [AllChecked, setAllChecked] = useState(false);

  // checkbox required inspection
  const stepHandler = (e) => {
    if (agreedTerms && agreedPersonalInfo === true) {
      setFirstStep(false);
      setSecondStep(true);
    } else {
      alert("필수 항목을 체크해 주세요");
    }
  };

  // signup input state
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");

  const [userInfo, setUserInfo] = useState("");

  const SendUserInfo = { id, pw, pwConfirm, email, birth };

  // warning text state
  const [pwWarning, setPwWarning] = useState(false);
  const [idWarning, setIdWarning] = useState(false);

  // submit handler
  const signUpSubmitHandler = () => {
    if (pw !== pwConfirm) {
      setPwWarning(true);
      return;
    } else if (id.length < 6 || id.length > 15) {
      setIdWarning(true);
      return;
    }
    setUserInfo({
      username: id,
      password: pw,
      passwordConfirm: pwConfirm,
      email: email,
      birthday: birth,
    });
    dispatch(addUser(userInfo));
    console.log(SendUserInfo);
  };
  console.log(userInfo);

  return (
    <>
      <Head />
      <SignUpTitle>회원가입</SignUpTitle>

      {/* 1단계 */}
      <SignupFirstStep
        className={firstStep}
        style={firstStep ? {} : { display: "none" }}
      >
        <SignUpContent>
          <SignUpContentTitle>약관동의</SignUpContentTitle>
          <SignUpStateWrap>
            <SignUpState
              style={firstStep ? { backgroundColor: "#2AC1BC" } : {}}
            >
              01
            </SignUpState>
            <SignUpState>02</SignUpState>
          </SignUpStateWrap>
        </SignUpContent>
        <AgreeList>
          {/* 전체 동의 */}
          <AllCheckBox>
            <CheckBoxWrapContainer>
              <CheckBox
                id="allcheckbox"
                type="checkbox"
                onClick={() => {
                  setAllChecked(!AllChecked);
                  setAgreedTerms(!agreedTerms);
                  setAgreedPersonalInfo(!agreedPersonalInfo);
                  setMarketingAgreement(!marketingAgreement);
                  setMarketingSms(!marketingSms);
                  setMarketingEmail(!marketingEmail);
                }}
              />
              <CheckBoxLable
                htmlFor="allcheckbox"
                style={
                  AllChecked
                    ? {
                        borderRadius: "2px",
                        backgroundColor: "#2AC1BC",
                        border: "1px solid ##2AC1BC",
                      }
                    : {}
                }
              />
              <label
                htmlFor="allcheckbox"
                style={{ fontWeight: "700", fontSize: "16px" }}
              >
                전체 동의합니다.
              </label>
            </CheckBoxWrapContainer>
            <Cautions>
              선택 항목에 동의하지 않은 경우도 회원가입 및 서비스
              <br />
              이용이 가능합니다.
            </Cautions>
          </AllCheckBox>

          {/* 이용약관 동의 */}
          <CheckBoxWrap>
            <CheckBoxWrapContainer>
              <CheckBox
                id="agreedTerms"
                type="checkbox"
                onClick={(e) => {
                  setAgreedTerms(!agreedTerms);
                }}
              />
              <CheckBoxLable
                htmlFor="agreedTerms"
                style={
                  agreedTerms
                    ? {
                        borderRadius: "2px",
                        backgroundColor: "#2AC1BC",
                        border: "1px solid ##2AC1BC",
                      }
                    : {}
                }
              />
              <label
                htmlFor="agreedTerms"
                style={{ fontWeight: "400", fontSize: "16px" }}
              >
                (필수) 이용약관 동의
              </label>
            </CheckBoxWrapContainer>
            <img src={moreBtn} alt="" />
          </CheckBoxWrap>

          {/* 개인정보 수집 및 이용 동의 */}
          <CheckBoxWrap>
            <CheckBoxWrapContainer>
              <CheckBox
                id="agreedPersonalInfo"
                type="checkbox"
                onClick={() => {
                  setAgreedPersonalInfo(!agreedPersonalInfo);
                }}
              />
              <CheckBoxLable
                htmlFor="agreedPersonalInfo"
                style={
                  agreedPersonalInfo
                    ? {
                        borderRadius: "2px",
                        backgroundColor: "#2AC1BC",
                        border: "1px solid ##2AC1BC",
                      }
                    : {}
                }
              />
              <label
                htmlFor="agreedPersonalInfo"
                style={{ fontWeight: "400", fontSize: "16px" }}
              >
                (필수) 개인정보 수집 및 이용 동의
              </label>
            </CheckBoxWrapContainer>
            <img src={moreBtn} alt="" />
          </CheckBoxWrap>

          {/* 마케팅 정보 수신 동의 */}
          <CheckBoxWrapContainer style={{ marginBottom: "18px" }}>
            <CheckBox
              id="marketingAgreement"
              type="checkbox"
              onClick={() => {
                setMarketingAgreement(!marketingAgreement);
              }}
            />
            <CheckBoxLable
              htmlFor="marketingAgreement"
              style={
                marketingAgreement
                  ? {
                      borderRadius: "2px",
                      backgroundColor: "#2AC1BC",
                      border: "1px solid ##2AC1BC",
                    }
                  : {}
              }
            />
            <label
              htmlFor="marketingAgreement"
              style={{ fontWeight: "400", fontSize: "16px" }}
            >
              (선택) 마케팅 정보 수신 동의
            </label>
          </CheckBoxWrapContainer>

          {/* 마케팅 세부 옵션 */}
          <CheckBoxWrapContainer style={{ marginLeft: "32px" }}>
            {/* sms */}
            <CheckBox
              id="sms"
              type="checkbox"
              onClick={() => {
                setMarketingSms(!marketingSms);
              }}
            />
            <CheckBoxLable
              htmlFor="sms"
              style={
                marketingSms
                  ? {
                      borderRadius: "2px",
                      backgroundColor: "#2AC1BC",
                      border: "1px solid ##2AC1BC",
                    }
                  : {}
              }
            />
            <label
              htmlFor="sms"
              style={{
                fontWeight: "400",
                fontSize: "15px",
                color: "#777",
                marginRight: "20px",
              }}
            >
              SMS
            </label>
            {/* email */}
            <CheckBox
              id="email"
              type="checkbox"
              onClick={() => {
                setMarketingEmail(!marketingEmail);
              }}
            />
            <CheckBoxLable
              htmlFor="email"
              style={
                marketingEmail
                  ? {
                      borderRadius: "2px",
                      backgroundColor: "#2AC1BC",
                      border: "1px solid ##2AC1BC",
                    }
                  : {}
              }
            />
            <label
              htmlFor="email"
              style={{ fontWeight: "400", fontSize: "15px", color: "#777" }}
            >
              이메일
            </label>
          </CheckBoxWrapContainer>
        </AgreeList>
        <NextBtn
          onClick={stepHandler}
          style={
            agreedTerms && agreedPersonalInfo
              ? { backgroundColor: "#2AC1BC", color: "#fff" }
              : {}
          }
        >
          다음 단계
        </NextBtn>
      </SignupFirstStep>

      {/* 2단계 */}
      <SignupSecondStep
        className={secondStep}
        style={secondStep ? {} : { display: "none" }}
      >
        <SignUpContent>
          <SignUpContentTitle>회원정보</SignUpContentTitle>
          <SignUpStateWrap>
            <SignUpState>01</SignUpState>
            <SignUpState
              style={firstStep ? {} : { backgroundColor: "#2AC1BC" }}
            >
              02
            </SignUpState>
          </SignUpStateWrap>
        </SignUpContent>

        <FloatingLabel
          controlId="id"
          label="6 - 15자 사이의 아이디를 입력해 주세요"
          className="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          <Form.Control type="text" placeholder="아이디" />
        </FloatingLabel>
        <WarningText
          className={idWarning}
          style={idWarning ? { display: "block" } : { display: "none" }}
        >
          아이디 형식을 확인해 주세요
        </WarningText>
        <FloatingLabel
          controlId="pw"
          label="비밀번호를 입력해 주세요"
          className="pw"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        >
          <Form.Control type="password" placeholder="비밀번호" />
        </FloatingLabel>
        <FloatingLabel
          controlId="pwconfirm"
          label="비밀번호 확인"
          className="pwConfirm"
          value={pwConfirm}
          onChange={(e) => setPwConfirm(e.target.value)}
        >
          <Form.Control type="password" placeholder="비밀번호 확인" />
        </FloatingLabel>
        <WarningText
          className={pwWarning}
          style={pwWarning ? { display: "block" } : { display: "none" }}
        >
          비밀번호가 일치하지 않습니다.
        </WarningText>
        <FloatingLabel
          controlId="email"
          label="이메일을 입력해 주세요"
          className="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <Form.Control type="email" placeholder="이메일" />
        </FloatingLabel>
        <FloatingLabel
          controlId="birth"
          label="생일정보를 입력해 주세요"
          className="birth"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        >
          <Form.Control type="date" placeholder="생일정보" />
        </FloatingLabel>
        <NextBtn
          onClick={signUpSubmitHandler}
          style={
            id && pw && pwConfirm && email && birth !== ""
              ? { backgroundColor: "#2AC1BC", color: "#fff" }
              : { pointerEvents: "none" }
          }
        >
          가입하기
        </NextBtn>
      </SignupSecondStep>
      <Foot />
    </>
  );
};

const SignUpTitle = styled.div`
  padding: 180px 0 60px 0;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

const SignupFirstStep = styled.div`
  width: 400px;
  border-top: 1px solid #e9e9e9;
  margin: 0 auto;
`;

const SignUpContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
`;

const SignUpContentTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const SignUpStateWrap = styled.div`
  width: 66px;
  display: flex;
  justify-content: space-between;
`;

const SignUpState = styled.div`
  width: 24px;
  height: 24px;
  font-size: 12px;
  border-radius: 50%;
  background-color: #ddd;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupSecondStep = styled.div`
  width: 400px;
  border-top: 1px solid #e9e9e9;
  margin: 0 auto;
`;

const AgreeList = styled.div``;

const AllCheckBox = styled.div`
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e9e9e9;
`;

const CheckBox = styled.input`
  display: none;
`;

const CheckBoxLable = styled.label`
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-right: 12px;
`;

const checked = styled.label`
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  margin-right: 12px;
  background-color: #2ac1bc;
`;

const Cautions = styled.div`
  color: #999;
  font-size: 14px;
  margin-top: 8px;
  margin-left: 32px;
  font-weight: 400;
`;

const CheckBoxWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const CheckBoxWrapContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NextBtn = styled.div`
  width: 400px;
  padding: 20px 0;
  background-color: #eee;
  color: #ccc;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 50px;
  transition: 0.15s;
  margin-bottom: 150px;
`;

const WarningText = styled.div`
  color: red;
  margin-left: 12px;
  margin-top: -16px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 14px;
`;

export default SignUp;

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

// image
import Logo from "../images/logo.png";
import Github from "../images/github.png"

const Footer = () => {

    const MoveFrontGit = () => {
        window.open("https://github.com/bita5000/week6-FE", "_blank");
    }

    const MoveBackGit = () => {
        window.open("https://github.com/hosunghan-0821/hanghae99-clone_project", "_blank")
    }

    return (
        <>
            <FooterWrap>
                <div style={{ marginRight: '160px' }}><LogoImg src={Logo} alt="" /></div>
                <FooterInfoWrap>
                    <BackEnd>
                        <FooterTitle onClick={MoveBackGit}>
                            <GitHubImg src={Github} alt="" />
                            Back-End
                        </FooterTitle>
                        <FooterInfo>이호재</FooterInfo>
                        <FooterInfo>한호성</FooterInfo>
                        <FooterInfo>장창균</FooterInfo>
                        <FooterInfo>이재헌</FooterInfo>
                    </BackEnd>
                    <FrontEnd>
                        <FooterTitle onClick={MoveFrontGit}>
                            <GitHubImg src={Github} alt="" />
                            Front-End
                        </FooterTitle>
                        <FooterInfo>조다솜</FooterInfo>
                        <FooterInfo>이중표</FooterInfo>
                    </FrontEnd>
                </FooterInfoWrap>
            </FooterWrap>
        </>
    );
};

const FooterWrap = styled.div`
    margin-top: 200px;
    padding: 70px 0 100px 0;
    background-color: #FAFAFA;
    display: flex;
    justify-content: center;
`;

const LogoImg = styled.img`
    width: 172px;
`;

const FooterInfoWrap = styled.div`
    display: flex;
    width: 320px;
    justify-content: space-between;
`;

const GitHubImg = styled.img`
    width: 32px;
    margin-right: 16px;
`;

const FooterTitle = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    color: #333;
`;

const FooterInfo = styled.div`
    margin-left: 46px;
    margin-bottom: 8px;
    color: #393939;
`;

const FrontEnd = styled.div``;


const BackEnd = styled.div``;

export default Footer;
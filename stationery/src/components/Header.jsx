import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

// image

// logo
import logo from "../images/logo.png";
// ic
import ic_cart from "../images/ic_cart.png";
import ic_hamburger from "../images/ic_hamburger.png";
import ic_mypage from "../images/ic_mypage.png";
import ic_search from "../images/ic_search.png";


const Header = () => {

    // set navigate
    const navigate = useNavigate();

    const moveMain = () => {
        navigate("/");
        window.location.reload();
    }

    const moveLogin = () => {
        navigate('/login')
    }

    const prepare = () => {
        alert('준비 중입니다.');
    }


    // nav scroll css
    const [scrollNav, setScrollNav] = useState(true);

    const ChangeColor = () => {
        if (window.scrollY <= 100) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }
    }
    window.addEventListener('scroll', ChangeColor);


    return (
        <>
            {/* header color change when scrolling */}
            <HeaderWrap style={scrollNav ? {} : { backgroundColor: 'white', borderBottom: '1px solid #e9e9e9' }}>
                <HeaderLeft>
                    <img
                        src={logo}
                        alt="logo"
                        onClick={moveMain}
                        style={{ width: '172px', cursor: 'pointer' }}
                    />
                    <CategoryWrap>
                        <Menu onClick={prepare}>전체</Menu>
                        <Menu>문구</Menu>
                        <Menu>리빙</Menu>
                        <Menu onClick={prepare}>책/매거진F</Menu>
                        <Menu onClick={prepare}>배민그린</Menu>
                        <Menu onClick={prepare}>배달이친구들</Menu>
                        <Menu onClick={prepare}>콜라보레이션</Menu>
                        <Menu onClick={prepare}>명예의 전당</Menu>
                    </CategoryWrap>
                </HeaderLeft>

                <HeaderRight>
                    <IconCustom src={ic_search} onClick={prepare} alt="search" />
                    <IconCustom src={ic_cart} onClick={prepare} alt="cart" />
                    <RoundBtn onClick={moveLogin}>로그인</RoundBtn>
                    <IconCustom src={ic_hamburger} onClick={prepare} alt="hamburger" />
                </HeaderRight>
            </HeaderWrap>
        </>
    );
};

const HeaderWrap = styled.div`
    transition: 0.4s;
    z-index: 999;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    border-bottom: 0px;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    margin-left: 40px;
`;

const HeaderRight = styled.div`
    width: 238px;
    margin-right: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Menu = styled.div`
    margin-right: 24px;
`;

const IconCustom = styled.img`
    width: 32px;
    cursor: pointer;
`;

const RoundBtn = styled.div`
    font-size: 14px;
    font-weight: 700;
    padding: 6px 20px;
    border: 2px solid rgb(68, 68, 68);
    border-radius: 20px;
    cursor: pointer;
`;

const CategoryWrap = styled.div`
    display: flex;
    margin-left: 56px;
    cursor: pointer;
`;

export default Header;
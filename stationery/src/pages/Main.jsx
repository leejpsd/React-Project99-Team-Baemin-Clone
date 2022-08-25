import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// image

// arrow
import main_arrow_before from "../images/main_arrow_before.png";
import main_arrow_after from "../images/main_arrow_after.png";
import sub_arrow_before from "../images/sub_arrow_before.png";
import sub_arrow_after from "../images/sub_arrow_after.png";

//banner
import main_banner1 from "../images/main_banner1.png";
import main_banner2 from "../images/main_banner2.png";
import main_banner3 from "../images/main_banner3.png";
import sub_banner from "../images/sub_banner.png";

// component
import Head from "./jungpyo/Head";
import Foot from "./jungpyo/Foot";

const Main = () => {
  // set navigate
  const navigate = useNavigate();

  const moveProduct = () => {
    navigate("/Goods");
  };

  // main carousel
  const totalSlide = 2;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(totalSlide);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const NextSlide = () => {
    if (currentSlide >= totalSlide) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // goods carousel
  const goodsTotalSlide = 1;
  const [goodsCurrentSlide, setGoodsCurrentSlide] = useState(0);
  const subSlideRef = useRef(null);

  const goodsPrevSlide = () => {
    if (goodsCurrentSlide === 0) {
      setGoodsCurrentSlide(goodsTotalSlide);
    } else {
      setGoodsCurrentSlide(0);
    }
  };
  const goodsNextSlide = () => {
    if (goodsCurrentSlide === goodsTotalSlide) {
      setGoodsCurrentSlide(0);
    } else {
      setGoodsCurrentSlide(goodsTotalSlide);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  useEffect(() => {
    subSlideRef.current.style.transition = "all 0.5s ease-in-out";
    subSlideRef.current.style.transform = `translateX(-${goodsCurrentSlide}00%)`;
  }, [goodsCurrentSlide]);

  // main goods axios
  const [goods, setGoods] = useState([]);

  const goodsAPI = () => {
    const url = "https://hosung.shop/api/v1/products/mainitems";
    axios
      .get(url)
      .then(function (response) {
        setGoods(response.data.data);
      })
      .catch(function (error) {
        alert("error");
      });
    // hover image props
    return <propsImage name="image" />;
  };

  useEffect(() => {
    goodsAPI();
  }, []);

  // prepare alert
  const prepare = () => {
    alert("준비 중입니다.");
  };

  return (
    <>
      <Head />
      <MainWrap>
        <MainBanner ref={slideRef}>
          <MainBannerImage src={main_banner1} alt="" />
          <MainBannerImage src={main_banner2} alt="" />
          <MainBannerImage src={main_banner3} alt="" />
        </MainBanner>
        <MainBannerArrow1 src={main_arrow_before} onClick={PrevSlide} alt="" />
        <MainBannerArrow2 src={main_arrow_after} onClick={NextSlide} alt="" />
        <SubBanner onClick={moveProduct}>
          <img src={sub_banner} alt="" />
        </SubBanner>
        <MainTitle>요즘 잘 나가요</MainTitle>
        <GoodsFlexContainer>
          <SubArrow src={sub_arrow_before} onClick={goodsPrevSlide} alt="" />
          <GoodsListWrap>
            <SwiperWrap ref={subSlideRef}>
              {goods.map((goods) => {
                return (
                  <GoodsList key={goods.productId} onClick={prepare}>
                    <GoodsListImage src={goods.mainImageUrl[0]} alt="" />
                    <GoodsText style={{ marginTop: "40px" }}>
                      {goods.title}
                    </GoodsText>
                    <GoodsText style={{ marginTop: "10px" }}>
                      {goods.price}
                    </GoodsText>
                  </GoodsList>
                );
              })}
            </SwiperWrap>
          </GoodsListWrap>
          <SubArrow src={sub_arrow_after} onClick={goodsNextSlide} alt="" />
        </GoodsFlexContainer>
      </MainWrap>
      <Foot />
    </>
  );
};

const MainWrap = styled.div`
  overflow-x: hidden;
`;

const MainBanner = styled.div`
  display: flex;
`;

const MainBannerImage = styled.img`
  width: 100%;
  height: 100%;
`;

const MainBannerArrow1 = styled.img`
  cursor: pointer;
  &:hover {
    filter: invert(48%) saturate(3207%) hue-rotate(130deg) brightness(95%)
      contrast(80%);
  }
  position: absolute;
  top: 280px;
  left: 40px;
`;

const MainBannerArrow2 = styled.img`
  cursor: pointer;
  &:hover {
    filter: invert(48%) saturate(3207%) hue-rotate(130deg) brightness(95%)
      contrast(80%);
  }
  position: absolute;
  top: 280px;
  right: 40px;
`;

const SubBanner = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 120px;
  cursor: pointer;
`;

const MainTitle = styled.div`
  font-size: 30px;
  font-weight: 700;
  padding: 120px 0 40px 0;
  text-align: center;
`;

const GoodsListWrap = styled.div`
  width: 1016px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
`;

const SwiperWrap = styled.div`
  display: flex;
  width: 1016px;
  margin: 0 auto;
`;

const GoodsList = styled.div`
  margin: 0 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  transition: 0.17s;
  &:hover {
    color: #2ac1bc;
  }
`;

const GoodsListImage = styled.img`
  width: 312px;
  height: 312px;
  &:hover {
    background-image: "";
  }
`;

const GoodsText = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const SubArrow = styled.img`
  width: 32px;
  height: 58px;
  z-index: 999;
  cursor: pointer;
  filter: invert(90%) saturate(3207%) hue-rotate(130deg) brightness(11111%)
    contrast(90%);
  &:hover {
    filter: invert(48%) saturate(3207%) hue-rotate(130deg) brightness(95%)
      contrast(80%);
  }
`;

const GoodsFlexContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export default Main;

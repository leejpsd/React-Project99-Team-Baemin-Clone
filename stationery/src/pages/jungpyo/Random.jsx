import React, { memo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getList } from "../../redux/modules/list";

const Random = ({ randomHandler }) => {
  const { list } = useSelector((state) => state.list);

  const selfList = [...list];
  const randomList = selfList.sort(() => Math.random() - 0.5).splice(0, 4);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getList());
  }, []);

  return (
    <>
      <ItemRecommend>
        <ItemRecommendTitle>이건 어때요?</ItemRecommendTitle>
        <ItemList>
          <ListSwiper>
            <ListSwiperWrapper>
              {randomList.map((randomItem) => (
                <Item
                  key={randomItem.productId}
                  onClick={() => {
                    navigate(`/gsd/${randomItem.productId}`);
                  }}
                >
                  <a>
                    <p>
                      <img
                        src={randomItem.mainImageUrl[0]}
                        alt="제품이미지사진"
                      />
                    </p>
                    <ItemInfo>
                      <span></span>
                      <InfoName>{randomItem.title}</InfoName>
                      <InfoPrice>
                        {randomItem.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </InfoPrice>
                    </ItemInfo>
                  </a>
                </Item>
              ))}
            </ListSwiperWrapper>
          </ListSwiper>
        </ItemList>
      </ItemRecommend>
    </>
  );
};

export default React.memo(Random);

const ItemRecommend = styled.div`
  position: relative;
  margin-top: 120px;
  padding-top: 120px;
  border-top: 1px solid #ddd;
`;
const ItemRecommendTitle = styled.div`
  font-weight: 800;
  text-align: center;
  margin-top: 0;
  font-size: 30px;
  line-height: 36px;
`;
const ItemList = styled.div`
  width: 1076px;
  margin: 0 auto;
`;
const ListSwiper = styled.div`
  flex-wrap: nowrap;
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const ListSwiperWrapper = styled.div`
  transform: translate3d(0px, 0px, 0px);
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  transition-property: transform;
  z-index: 1;
  flex-wrap: nowrap;
  flex-direction: row;
`;
const Item = styled.div`
  width: 246.5px;
  margin-right: 30px;
  margin-left: 0;
  margin: 60px 0 0 24px;
  font-size: 16px;
  text-align: center;
  transition: 0.3s ease color;
  display: flex;
  flex-direction: column;
  a {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    p:first-child {
      position: relative;
      width: 100%;
      height: 282px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 100%;
        max-height: 100%;
        display: block;
        object-fit: cover;
      }
    }
  }
`;
const ItemInfo = styled.div`
  position: relative;
  margin-top: 20px;
  padding-top: 22px;
  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 15px;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const InfoName = styled.p`
  line-height: 24px;
  font-weight: 500;
  word-break: keep-all;
`;
const InfoPrice = styled.p`
  margin-top: 10px;
  font-weight: 500;
  justify-content: center;
  display: inline-flex;
  flex-wrap: wrap;
`;

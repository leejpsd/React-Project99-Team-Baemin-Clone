import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import Foot from "./Foot";
import Head from "./Head";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../../redux/modules/list";
import { highPrice } from "../../redux/modules/list";
import { lowPrice } from "../../redux/modules/list";
import { newItem } from "../../redux/modules/list";
import { useState, useEffect } from "react";

const Goods = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.list);

  const [selectVisible, setSelectVisible] = useState(false);

  useEffect(() => {
    dispatch(getList());
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Body>
        <Head />
        <MainBox>
          <MainHeader>
            <Title>
              전체
              <sup>총 {list.length}개</sup>
            </Title>
            <p>
              사랑을 쓸려거든 연필로 쓰세요.
              <br />
              사랑을 쓰다가 쓰다가 틀리면 지우개로 깨끗이 지워야 하니까.
              <br />- &#60; 사랑은 연필로 쓰세요 &#62; 전영록, 1983
            </p>
          </MainHeader>
          <SelectBox>
            <Select>
              <div onClick={() => setSelectVisible(!selectVisible)}>
                <div>추천순</div>
                <label></label>
                <input type="checkbox" />
                <SelectImg
                  selectVisible={selectVisible}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAYUlEQVR4Ae2UQQ5AEQxE5yhz/0s5yv8WXSAStLOiL2kiTF83AJLkKlirWBFiaOLPSjqEjbwMayIIJ8LZnky+cxaWn2Tcck/W13DSsx309C4D0SGqu83B1Q2QPBz0X0ryAj9fvT8BBg0rqgAAAABJRU5ErkJggg=="
                  alt=""
                />
              </div>
            </Select>
          </SelectBox>
          <SelectListBox>
            {selectVisible && (
              <SelectList>
                <ul>
                  <li>추천순</li>
                  <li onClick={() => dispatch(newItem())}>최신순</li>
                  <li onClick={() => dispatch(highPrice())}>높은가격순</li>
                  <li onClick={() => dispatch(lowPrice())}>낮은가격순</li>
                </ul>
              </SelectList>
            )}
          </SelectListBox>
          <ListBox>
            {list.map((item) => (
              <Box
                key={item.productId}
                onClick={() => {
                  navigate(`/gsd/${item.productId}`, {
                    state: {
                      mainImageUrl: item.mainImageUrl,
                    },
                  });
                }}
              >
                <a>
                  <p>
                    <img src={item.mainImageUrl[0]} alt="gif" />
                    <Hover>
                      <img src={item.mainImageUrl[1]} alt="png" />
                    </Hover>
                  </p>
                  <InfoBox>
                    <span>
                      {Math.floor(Math.random() * 100) % 2 == 0 ? (
                        <i>best</i>
                      ) : null}
                    </span>
                    <div>{item.title}배달이친구들 팝업카드 2종</div>
                    <div style={{ marginTop: "10px" }}>
                      {item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </div>
                  </InfoBox>
                </a>
              </Box>
            ))}
          </ListBox>
        </MainBox>
        <Foot />
      </Body>
    </>
  );
};
export default Goods;

const Body = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 16px;
  color: #000;
  font-weight: 400;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 16px;
  margin: 0;
  padding: 0;
`;

const MainBox = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0px auto;
  padding: 80px 0px 200px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const MainHeader = styled.header`
  padding-bottom: 60px;
  border-bottom: 1px solid rgb(221, 221, 221);
  height: 216px;
  display: block;
  p {
    margin-top: 23px;
    font-size: 16px;
    line-height: 29px;
  }
`;

const Title = styled.h2`
  margin: 0;
  padding: 0;
  font-family: BM-HANNA-11yrs-old;
  font-size: 55px;
  font-weight: 400;
  line-height: 74px;
  display: flex;
  align-items: flex-start;
  color: inherit;

  sup {
    margin: 8px 0px 0px 14px;
    font-size: 12px;
    font-weight: 600;
    line-height: 22px;
  }
`;

const SelectBox = styled.div`
  margin-top: 80px;
  padding-bottom: 6px;
  display: flex;
`;
const Select = styled.div`
  width: 120px;
  margin-left: auto;
  position: relative;
  min-width: 120px;
  max-width: 300px;
  color: rgb(0, 0, 0);
  z-index: 1;
  div {
    position: relative;
    width: 100%;
    font-size: 16px;
    div {
      width: 100%;
      height: 41px;
      padding-right: 24px;
      font-size: inherit;
      color: inherit;
      font-weight: 500;
      line-height: 41px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: block;
    }
    label {
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translate(0px, -50%);
      cursor: pointer;
      width: 100px;
      height: 20px;
      max-width: 110px;
      z-index: 10;
    }
    input {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translate(0px, -50%);
      cursor: pointer;
      opacity: 0;
      z-index: 10;
    }
  }
`;

const SelectListBox = styled.div`
  position: relative;
  width: 120px;
  margin-left: auto;
  position: relative;
  min-width: 120px;
  max-width: 300px;
  color: rgb(0, 0, 0);
  z-index: 1;
`;

const SelectImg = styled.img`
  position: absolute;
  top: 50%;
  right: 0px;
  width: 12px;
  height: 12px;
  margin-top: -7px;
  display: block;
  transform: ${({ selectVisible }) =>
    selectVisible ? "rotate(0deg)" : "rotate(180deg)"};
`;

const SelectList = styled.div`
  position: absolute;
  width: 120px;
  top: 100%;
  left: 0px;
  font-size: 16px;
  line-height: 17px;
  overflow: hidden;
  cursor: pointer;
  height: 200px;
  ul {
    right: 0px;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(221, 221, 221);
    border-radius: 6px;
    overflow: hidden;
    transition: opacity 0.3s ease 0s;
    width: 100%;
    display: flex;
    flex-direction: column;
    li {
      width: 120px;
      margin-left: -30px;
      min-height: 49px;
      padding: 10px 16px;
      font-size: inherit;
      display: flex;
      align-items: center;
      &:first-child {
        color: rgb(42, 193, 188);
      }
      &:hover {
        color: rgb(42, 193, 188);
      }
    }
  }
`;

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Box = styled.div`
  width: 282px;
  font-size: 16px;
  text-align: center;
  margin: 0px 0px 0px 24px;
  :nth-child(4n + 1) {
    margin-left: 0px;
  }
  :hover {
    color: rgb(42, 193, 188);
  }
  a {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    p {
      position: relative;
      width: 100%;
      height: 282px;
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`;
const Hover = styled.span`
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  opacity: 0;
  transition: all 0.2s ease 0s;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  :hover {
    opacity: 1;
  }
`;

const InfoBox = styled.div`
  position: relative;
  margin-top: 20px;
  padding-top: 22px;
  span {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 15px;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: center;
    justify-content: center;
    i {
      margin-left: 0px;
      color: rgb(98, 54, 255);
      position: relative;
      vertical-align: middle;
      font-style: normal;
      border-bottom: solid rgb(98, 54, 255) 1px;
    }
  }
  div {
    line-height: 24px;
    word-break: keep-all;
    transition: all 0.2s ease 0s;
  }
`;

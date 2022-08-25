import React from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import Foot from "./Foot";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListLv } from "../../redux/modules/list";
import { highPrice } from "../../redux/modules/list";
import { lowPrice } from "../../redux/modules/list";
import { newItem } from "../../redux/modules/list";
import { useState, useEffect } from "react";

const Living = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector((state) => state.list);
  const login = window.localStorage.getItem("id");

  const [visible, setVisible] = useState(false);

  const [selectVisible, setSelectVisible] = useState(false);

  const visibleHandler = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    dispatch(getListLv());
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Body>
        <Header>
          <NavBox>
            <Logo>
              <LogoLink
                onClick={() => {
                  navigate(`/`);
                  window.scrollTo(0, 0);
                }}
              ></LogoLink>
            </Logo>
            <NavBar>
              <ul>
                <li>
                  <Search></Search>
                </li>
                <li>
                  <Basket></Basket>
                </li>
                <LoginBtn>
                {login == null ? (
                  <a
                    onClick={() => {
                      navigate(`/login`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    로그인
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      window.localStorage.removeItem("id");
                      window.location.reload();
                      window.scrollTo(0, 0);
                    }}
                  >
                    로그아웃
                  </a>
                )}
                </LoginBtn>
                <li>
                  <Burger onClick={() => visibleHandler()}></Burger>
                </li>
              </ul>
            </NavBar>
          </NavBox>
          <Nav>
            <ul>
              <li>
                <a
                  onClick={() => {
                    navigate(`/gd`);
                  }}
                >
                  전체
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate(`/st`);
                  }}
                >
                  문구
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    navigate(`/lv`);
                    window.scrollTo(0, 0);
                  }}
                  style={{ color: "rgb(42, 193, 188)" }}
                >
                  리빙
                </a>
              </li>
              <li>
                <a>책/매거진F </a>
              </li>
              <li>
                <a>배민그린 </a>
              </li>
              <li>
                <a>콜라보레이션 </a>
              </li>
              <li>
                <a>명예의 전당 </a>
              </li>
            </ul>
          </Nav>
        </Header>
        {visible && <SideBar visibleHandler={visibleHandler} />}
        <MainBox>
          <MainHeader>
            <Title>
              리빙
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
export default Living;

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
const Header = styled.div`
  z-index: 15;
  position: sticky;
  top: 0px;
  left: 0px;
  padding-top: 0px;
  background-color: rgba(255, 255, 255, 0.98);
  transition: border 0.4s ease 0s, background-color 0.4s ease 0s,
    top 0.2s ease 0s;
  border-bottom: 1px solid transparent;
`;
const NavBox = styled.div`
  border-bottom: 1px solid rgb(221, 221, 221);
  width: 100%;
  padding: 0px 40px;
  display: flex;
  height: 90px;
  -webkit-box-align: center;
  align-items: center;
`;

const Logo = styled.h1`
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;
const LogoLink = styled.a`
  width: 172px;
  height: 40px;
  position: relative;
  text-indent: -1000em;
  display: block;
  background: url(data:image/png;base64,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)
    0% 0% / 100% no-repeat;
  overflow: hidden;
  cursor: pointer;
`;
const NavBar = styled.div`
  margin-right: -2px;
  margin-left: auto;
  ul {
    display: flex;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    li {
      margin-left: 16px;
      list-style: none;
    }
  }
`;
const Search = styled.button`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABACAMAAAB4KUSAAAAAVFBMVEUAAABAQEBCQkJAQEBAQEBFRUVERERDQ0NCQkJCQkJERERERERDQ0NFRUVDQ0NFRUVDQ0NFRUVDQ0NERERERERERERERERDQ0NFRUVDQ0NEREREREQFpop6AAAAG3RSTlMAEB8gMDBAX2BwcI+QkJ+foKCvr7C/z9/f7+9/aHYhAAABUElEQVRIx+2WzXKDMAyE5UKoa1I3IcU2fO//nj2ENkxiGcrkkhn2Kq/+WSGyY8fTUDmfRhjDxVX/oNmeGYJdSWsSd0hrqKYlg9YsFheuL3tXGxHTuCnrtFBqdU3Tz55VpxVMkwBifectAoRSti3A+eGF6QDawhgAupzlDNCoxATEbEYmAqkYUOlBDaCNMwBe83oCemUUhYCT9S1rcrpPEZEecFlLp1r+/Hq1RL3jUqt9HYDCdhhgzFoASvuo2jcTN6eagENBGICg7sbCOL6fuwArVq7SfapL7tUSp8/qUAioqmQEklHFKBY7nk+2KwYUOQJcHsXqC+CzJI8hJ6H1VWxdUZDjoyD73zvwvoJJ7xojYg5ufriKTHPMHZ3Pj2Wm2HhPi8005AWm2DCn9fa2HktMqVwXBhiSv53ydUx1JV+LOcpGZtz062TjYGXHjpfCD5znMAKBlXgTAAAAAElFTkSuQmCC)
    0% 0% / 28px no-repeat;
  width: 32px;
  height: 32px;
  position: relative;
  text-indent: -1000em;
  display: block;
  border: none;
  outline: none !important;
  cursor: pointer;
`;

const Basket = styled.a`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABACAMAAAB4KUSAAAAAV1BMVEUAAABAQEBCQkJAQEBAQEBFRUVERERDQ0NDQ0NCQkJFRUVFRUVCQkJERERERERERERERERDQ0NFRUVDQ0NDQ0NERERERERERERDQ0NFRUVDQ0NEREREREQfR2jqAAAAHHRSTlMAEB8gMDBAUF9gYG9wcH+Aj5CQn6+vv8/f3+/vHa+H/gAAATNJREFUSMftlt1ygyAQhaEkpLRVazSocN7/OXth6sRxfwZmelW/q5idQ5ZzFqIxJyfVvGcAwDS4QuGCJ/lWJkzY8EXCMG/CbMt3ar8AINSY1AEYaoQ3AFON0AHI29PnIx54BMfa++tOAMkSuECvz88NGBpCOL7Y6mZOeT0KewDdtmN/pE+08R9qHn7nX0keCcCbkodq/Augv973NCt5kAyMC6My5jYxR2+XB3UAmU5No+QxcnUlDwfOAyUPtlMtj8jMuJaHAwDH7z5InUamJuYxCas2wqJSp2uxJat+ERZdjRPg59ElSXeX7si5TmeMDROpSqM3/5xLxNKSnrUZkX9JcBkAvplrCouVbjHySF7WQqdMnCf/HaQLqV/rrvgX11G9c73MgjsRiVzW9kly9eTkj/kBkEQ2R+qEUX8AAAAASUVORK5CYII=)
    0% 0% / 28px no-repeat;
  width: 32px;
  height: 32px;
  position: relative;
  text-indent: -1000em;
  display: block;
  cursor: pointer;
`;
const LoginBtn = styled.li`
  margin-left: 16px;
  display: list-item;
  text-align: -webkit-match-parent;

  a {
    cursor: pointer;
    min-width: 69px;
    height: 33px;
    margin: 0px 2px;
    padding: 0px 16px;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    border: 2px solid rgb(68, 68, 68);
    border-radius: 17px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    transition: border 0.4s ease 0s, background-color 0.4s ease 0s,
      top 0.2s ease 0s;
    text-decoration: none;
    color: inherit;
  }
`;
const Burger = styled.button`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABABAMAAAC92amBAAAAGFBMVEUAAABDQ0NCQkJDQ0NFRUVDQ0NEREREREQpeijrAAAAB3RSTlMAX2Df3+/vID/sPwAAADBJREFUOMtjYBgFww6IlWMAR7ikO6ZkGVwyHFOyGC6pjCkZNBrYo7EyGiujsTJSAQA5zGtiTEs+RQAAAABJRU5ErkJggg==)
    0% 0% / 28px no-repeat;
  width: 32px;
  height: 32px;
  position: relative;
  text-indent: -1000em;
  display: block;
  border: none;
  outline: none !important;
  cursor: pointer;
  color: #000;
`;

const Nav = styled.nav`
  position: absolute;
  top: 0px;
  left: 272px;
  width: calc(100% - 622px);
  z-index: 1;
  height: 90px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  ul {
    list-style: none;
    font-weight: 500;
    display: flex;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    li {
      line-height: 19.9px;
      margin-right: 22px;
      font-size: 18px;
      list-style: none;
      display: list-item;
      text-align: -webkit-match-parent;
      white-space: nowrap;
      a {
        cursor: pointer;
        margin: 0;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        text-decoration: none;
        &:hover {
          color: rgb(42, 193, 188);
        }
      }
    }
  }
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

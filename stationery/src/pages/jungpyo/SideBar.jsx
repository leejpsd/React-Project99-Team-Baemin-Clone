import React from "react";
import styled from "styled-components";

const SideBar = ({ visibleHandler }) => {
  return (
    <>
      <HiddenNav>
        <HiddenNavBar>
          <HiddenHeader>
            <h2>
              앗!
              <br />
              <a>
                로그인이필요해요
                <div> </div>
              </a>
            </h2>
          </HiddenHeader>
          <HiddenNavBarNav>
            <h2>테마</h2>
            <ul>
              <li>
                <a>전체보기</a>
              </li>
              <li>
                <a>쉿! 비밀이야 내 마음 속 원픽은...</a>
              </li>
              <li>
                <a >양자택일 당신의 선택은?</a>
              </li>
              <li>
                <a>왜 갑티슈를 만들었을까?</a>
              </li>
            </ul>
            <h2 style={{ marginTop: "40px" }}>카테고리</h2>
            <ul>
              <li>
                <a href="">전체보기</a>
              </li>
              <li>
                <a href="" style={{ color: "rgb(42, 193, 188)" }}>
                  문구
                </a>
              </li>
              <li>
                <a >리빙</a>
              </li>
              <li>
                <a>책/매거진F</a>
              </li>
              <li>
                <a>배민그린</a>
              </li>
              <li>
                <a>배달이친구들</a>
              </li>
              <li>
                <a>콜라보레이션</a>
              </li>
              <li>
                <a>명예의 전당</a>
              </li>
            </ul>
          </HiddenNavBarNav>
          <HiddenNavBarFooter>
            <div>
              <h2></h2>
              <ul>
                <li>
                  <a>1:1문의</a>
                </li>

                <li>
                  <div></div>
                  <a href="">이메일문의</a>
                </li>
              </ul>
            </div>
          </HiddenNavBarFooter>
          <HiddenNavBarLink onClick={visibleHandler}></HiddenNavBarLink>
        </HiddenNavBar>
      </HiddenNav>
      <Opacity onClick={visibleHandler}></Opacity>
    </>
  );
};

export default SideBar;

const HiddenNav = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transition: z-index 0s ease 0s;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 1;
`;
const HiddenNavBar = styled.div`
  position: fixed;
  right: 0px;
  position: absolute;
  top: 0px;
  width: 380px;
  height: 100%;
  padding-top: 60px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
  transition: right 0.4s ease 0s;
`;
const HiddenHeader = styled.header`
  padding: 0px 40px 60px;
  & > h2 {
    width: 260px;
    font-family: BM-HANNA-11yrs-old, sans-serif;
    font-size: 32px;
    line-height: 42px;
    font-weight: 400;
    letter-spacing: -1px;
    color: rgb(68, 68, 68);
    a {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin: 0;
      padding: 0;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      text-decoration: none;
      div {
        width: 9px;
        height: 16px;
        display: block;
        margin-left: 8px;
        background: url("https://brandstore.baemin.com/assets/image/web/arr_login.png")
          center center / 100% no-repeat;
        content: "";
      }
    }
  }
`;
const HiddenNavBarNav = styled.nav`
  height: 100%;
  padding: 0px 40px 40px;
  overflow-y: auto;
  &:first-child {
    margin-top: 0px;
  }
  h2 {
    font-size: 16px;
    color: rgb(153, 153, 153);
    font-weight: 400;
    line-height: 19px;
  }
  ul {
    list-style: none;
    margin-bottom: 0;
    li:first-child {
      margin-top: 14px;
    }
    li:hover {
      color: rgb(42, 193, 188);
    }
    li {
      margin-top: 16px;
      font-size: 24px;
      color: rgb(68, 68, 68);
      line-height: 29px;
      font-weight: 700;
      a {
        color: inherit;
        display: inline-block;
        transition: color 0.3s ease 0s;
        margin: 0;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        text-decoration: none;
      }
    }
  }
`;
const HiddenNavBarFooter = styled.footer`
  margin-top: auto;
  padding: 27px 40px;
  background-color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  div {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    h2 {
      width: 34px;
      height: 34px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAMAAAAPzWOAAAAApVBMVEUAAABAQEBCQkJAQEBAQEBFRUVERERDQ0NCQkJFRUVFRUVCQkJERERERERERERERERDQ0NFRUVDQ0NDQ0NDQ0NERERERERERERERERDQ0NFRUVDQ0NERERERERPT09QUFBbW1tmZmZnZ2dycnJzc3N+fn5/f3+KioqWlpahoaGioqKtra25ubnExMTFxcXQ0NDR0dHc3Nzd3d3o6Ojz8/P09PT///8isx6WAAAAHXRSTlMAEB8gMDBAX2Bgb3Bwf4CPkJCfoK+vsL/P39/v74v0xfwAAAKsSURBVFjDvZh/e5owEIBhOgvbREq1UCBIGQUZVOpAvv9HGwGFBC4h0D67/0zOl0vuRy6RJKas1N3BtlEttmXulO/SXJFVw0UDcQ+KPAOx2Y0INzFE7dmYiCPmRgCx5iKwHFZTe7FFArLlMlYWEhKbY8yDiwTF/cVibNEM2X4Bg0GZyQApsxkA5QdaIA8D37pLIC7taRvWCtPLtaquefobnrfkyQ2Ji6qTIgZVNGIx0Lx/qSgpfEirz+o9ZMa1Gkj5BiV1l/vA5Fvzv2sa1d8PoqzFQEu6VwYg+f3GjrPX/W4wpc80ZQ3wmy09kSN/8MiFaYoBbAj+R0KPnRgLemzqEMOQbDh4xi4CIg7HigLEGP7oaP3Hsh4Fok6B/ZtChrTDKXAC1BCHGgmS96LArgGCImpi7pIntJHuwDfeuQutV8Dv3WRGYb5RW+ITyQLFOCMHFEmHGRMQivJIhmsTlXns+zyIH7TJnffDz5JFOza9K7MgXfT2zraJcpR1cT0FQR+Us22pV/nb4SchIR28Eq1yFIMcaQ0JUJmGICakEF9OgIsLAbGpLE3FINgH76B3oq5gTEFiurRYZBI3QYSziw/xkop2jkmGfXiL6IIHKW65EZBhrw6roljuxFQCUgdX1KVgyYUU4eAAo4tS/NGqJRxIfvIGRUl6GtWeWjzEzOLR3HMNUcVbCXivcKGWnU9CmvZCF2WE4IYbzPMcZIBH2r254HTzowYjYPUWHFOKASNhthYcU8opxqG/nrCXQ7ZtWThWIPpHDS0UjbzmWMsYL3Qz7CxhOINrj7IEMrr0aJ/bkKUUDbrwaF/AmEnRWJfAn8I+chTOlfZFjGHx79dCS9KmHh5W+ymEuf4/Dw5NVj+x9lPfzHmEUfYjTzmGKs9+zVkrumm1z0H2Xlc5DvkHGInQgH7LSIgAAAAASUVORK5CYII=)
        center center / 100% no-repeat;
      display: block;
      text-indent: -1000em;
      overflow: hidden;
      font-size: inherit;
      color: inherit;
      margin-bottom: 0;
    }
    ul {
      font-size: 16px;
      font-weight: 700;
      line-height: 19px;
      display: flex;
      li {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        div {
          width: 1px;
          height: 16px;
          margin: 0px 10px;
          background-color: rgb(221, 221, 221);
          display: block;
          content: "";
        }
        a {
          padding: 0px 20px;
          display: flex;
          -webkit-box-pack: center;
          justify-content: center;
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          text-decoration: none;
        }
      }
    }
  }
`;
const HiddenNavBarLink = styled.a`
  position: absolute;
  cursor: pointer;
  top: 30px;
  right: 40px;
  width: 28px;
  height: 28px;
  display: block;
  text-indent: -1000em;
  overflow: hidden;
  z-index: 1;
  ::before {
    opacity: 1;
    transition-delay: 0.2s;
    transform: rotate(45deg);
    position: absolute;
    top: 13px;
    left: 3px;
    width: 23px;
    height: 2px;
    background-color: rgb(68, 68, 68);
    opacity: 1;
    display: block;
    content: "";
    transition: transform 0.4s ease 0s, opacity 0.4s ease;
  }
  ::after {
    opacity: 1;
    transition-delay: 0.2s;
    transform: rotate(-45deg);
    position: absolute;
    top: 13px;
    left: 3px;
    width: 23px;
    height: 2px;
    background-color: rgb(68, 68, 68);
    display: block;
    content: "";
    transition: transform 0.4s ease 0s, opacity 0.4s ease;
  }
`;
const Opacity = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: calc(100% - 380px);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  content: "";
  transition: opacity 0.4s ease 0s;
  z-index: 100;
  opacity: 1;
`;

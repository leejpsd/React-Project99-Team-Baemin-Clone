import React from "react";
import styled from "styled-components";
const Foot = () => {
  return (
    <>
      <Footer>
        <FooterBox>
          <h2>
            <span>배민문방구</span>
          </h2>
          <FooterInfo>
            <FooterNav>
              <ul>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">공지사항</a>
                </li>
                <li>
                  <a href="">이용약관</a>
                </li>
                <li>
                  <a href="" style={{ fontWeight: "700" }}>
                    개인정보처리방침
                  </a>
                </li>
                <li>
                  <a href="">대량구매/제휴안내</a>
                </li>
              </ul>
              <p>
                <a href="">
                  <div></div>
                  @baemin_store
                </a>
              </p>
            </FooterNav>
            <FooterData>
              <p>상호 : C반 3조</p>
              <p>대표 : 이중표 조다솜 이호재 한호성 장창균 이재헌 </p>
              <p>사업자등록번호 : 120-87-65763</p>
              <p>통신판매업신고번호 : 2021-서울송파-0515</p>
              <div>사업자정보확인</div>
              <p>대표번호 : 1670-9902</p>
              <p>이메일 : marketing_store@woowahan.com</p>
              <p>주소 : 서울특별시 송파구 위례성대로 2 장은빌딩</p>
              <div>호스팅제공 : (주)우아한형제들</div>
              <p>© Woowa Brothers Corp. All rights reserved</p>
            </FooterData>
          </FooterInfo>
        </FooterBox>
      </Footer>
    </>
  );
};

export default Foot;

const Footer = styled.div`
  margin-top: auto;
  padding: 70px 0 100px 0;
  background-color: #fafafa;
`;

const FooterBox = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  h2 {
    margin-right: 180px;
    span {
      width: 172px;
      height: 40px;
      position: relative;
      text-indent: -1000em;
      display: block;
      background: url(data:image/png;base64,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)
        0% 0% / 100% no-repeat;
      overflow: hidden;
    }
  }
`;

const FooterInfo = styled.div`
  padding-top: 4px;
`;
const FooterNav = styled.nav`
  font-size: 16px;
  color: rgb(68, 68, 68);
  line-height: 24px;
  display: flex;
  ul {
    display: flex;
    list-style: none;
    li {
      margin-right: 24px;
      a {
        display: block;
        margin: 0;
        padding: 0;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        text-decoration: none;
      }
    }
  }
  p {
    a {
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      white-space: nowrap;
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
      div {
        width: 24px;
        height: 24px;
        margin-right: 6px;
        background: url("https://brandstore.baemin.com/assets/image/web/icon_footer_insta.png")
          no-repeat;
        background-size: 24px auto;
        display: inline-block;
        content: "";
      }
    }
  }
`;
const FooterData = styled.div`
  margin-top: 14px;
  color: rgb(153, 153, 153);
  display: flex;
  flex-wrap: wrap;
  p {
    margin-top: 12px;
    font-size: 13px;
    line-height: 16px;
    display: inline-block;
    ::after {
      width: 1px;
      height: 10px;
      margin: 0px 11px;
      background-color: rgb(204, 204, 204);
      display: inline-block;
      content: "";
    }
  }
  div {
    margin-top: 12px;
    font-size: 13px;
    line-height: 16px;
    display: inline-block;
  }
`;

import React, { useCallback } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import Random from "./Random";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { getDetail } from "../../redux/modules/detail";
import { getComment } from "../../redux/modules/comment";
import { postComment } from "../../redux/modules/comment";
import { deleteComment } from "../../redux/modules/comment";
import { editComment } from "../../redux/modules/comment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/swiper.css";

const GoodsDetail = () => {
  const [visible, setVisible] = useState(false);
  const [reviewVisible, setReviewVisible] = useState(false);
  const [selectVisible, setSelectVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [basketVisible, setBasketVisible] = useState(false);
  //커스텀훅으로 만들기

  const tabRef = useRef();
  const topRef = useRef();
  const mainRef = useRef();

  const visibleHandler = () => {
    setVisible(!visible);
  };

  const reviewHandler = () => {
    setReviewVisible(true);
    setInfoVisible(true);
    tabRef.current.scrollIntoView();
    topRef.current.scrollIntoView();
  };

  const infoHandler = () => {
    setInfoVisible(false);
    setReviewVisible(false);
    tabRef.current.scrollIntoView();
    topRef.current.scrollIntoView();
  };

  const listHandler = () => {
    setSelectVisible(!selectVisible);
    setListVisible(true);
  };

  // const randomHandler = useCallback(() => mainRef.current.scrollIntoView(), []);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { detail } = useSelector((state) => state.detail);
  const { comment } = useSelector((state) => state.comment);

  const category = detail.category;

  console.log(category);

  const [count, setCount] = useState(1);

  const onDecrease = () => {
    if (count === 1) {
      return setCount(1);
    }
    setCount(count - 1);
  };

  const [review, setReview] = useState("");

  const reviewData = {
    id: id,
    content: review,
  };

  const reviewPostHandler = () => {
    if (review.length < 10) {
      alert("10자 이상 작성해주세요.");
    } else if (review.length > 1000) {
      alert("1000자 이내로 작성해주세요.");
    } else {
      dispatch(postComment(reviewData));
      setPopupVisible(false);
    }
  };

  const [editReview, setEditReview] = useState("");

  const reviewEditHandler = (cmt) => {
    if (editReview.length < 10) {
      alert("10자 이상 작성해주세요.");
    } else if (editReview.length > 1000) {
      alert("1000자 이내로 작성해주세요.");
    } else {
      dispatch(
        editComment({
          id: cmt.id,
          content: editReview,
        })
      );
      setEditPopupVisible(false);
    }
  };

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getComment(id));
    window.scrollTo(0, 0);
    setInfoVisible(false);
    setReviewVisible(false);
  }, [id]);

  return (
    <>
      <Body ref={mainRef}>
        <div>
          <Header>
            <NavBox>
              <Logo>
                <LogoLink></LogoLink>
              </Logo>
              <NavBar>
                <ul>
                  <li>
                    <Search></Search>
                  </li>
                  <li>
                    <Basket>{basketVisible && <span>{count}</span>}</Basket>
                  </li>
                  <LoginBtn>
                    <a>로그인</a>
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
                  <a>전체 </a>
                </li>
                <li>
                  <StBtn category={category}>문구</StBtn>
                </li>
                <li>
                  <LivingBtn category={category}> 리빙 </LivingBtn>
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
          <OderBox>
            <ViewHeader>
              <ViewInfo>
                <span></span>
                <h3>{detail.title}</h3>
                <p>
                  {detail.price &&
                    detail.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </p>
              </ViewInfo>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {detail.mainImageUrl &&
                  detail.mainImageUrl.map((img) => (
                    <SwiperSlide>
                      <img src={img} alt="이미지" />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <ViewOder>
                <dl>
                  <dt>배송정보</dt>
                  <dd>
                    3,000원 (30,000원 이상 구매 시 무료)
                    <br />
                    오후 1시 당일배송마감
                  </dd>
                </dl>
                <SelectBox>
                  <SelectText>
                    <SelectBtn
                      selectVisible={selectVisible}
                      onClick={() => setSelectVisible(!selectVisible)}
                    >
                      옵션
                      <div></div>
                    </SelectBtn>
                  </SelectText>
                  <OptionBox>
                    {selectVisible && (
                      <SelectOptions>
                        <div>
                          <ul>
                            <li>
                              <button onClick={() => listHandler()}>
                                {detail.title}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </SelectOptions>
                    )}
                  </OptionBox>
                  {/* 구매목록 */}
                  {listVisible && (
                    <BuyList>
                      <BuyListBox>
                        <h4>{detail.title}</h4>
                        <BuyOption>
                          <div>
                            <input type="number" value={count} />
                            <Minus onClick={() => onDecrease()}></Minus>
                            <Plus onClick={() => setCount(count + 1)}></Plus>
                          </div>
                          <ListDelete
                            onClick={() => setListVisible(false)}
                          ></ListDelete>
                        </BuyOption>
                      </BuyListBox>
                    </BuyList>
                  )}
                </SelectBox>
                <div style={{ marginTop: `16px` }}></div>
                <Price>
                  <li>총 금액</li>
                  <dd>
                    <span>
                      {(detail.price * count)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </span>
                  </dd>
                </Price>
                <OderFooter>
                  <button onClick={() => setBasketVisible(true)}></button>
                  <button>바로 구매하기</button>
                </OderFooter>
              </ViewOder>
            </ViewHeader>
          </OderBox>
        </div>
        {visible && <SideBar visibleHandler={visibleHandler} />}
        <MainBox>
          <MainView>
            <ViewContent>
              <ViewTab ref={tabRef}>
                <ul>
                  <ViewTabList reviewVisible={reviewVisible}>
                    <InfoBtn onClick={() => infoHandler()}>상품정보</InfoBtn>
                  </ViewTabList>
                  <ViewTabList>
                    <div></div>
                    <a>기본정보</a>
                  </ViewTabList>
                  <ViewTabList>
                    <div></div>
                    <ReiviewBtn
                      reviewVisible={reviewVisible}
                      onClick={() => reviewHandler()}
                    >
                      상품후기({comment.length})<span></span>
                    </ReiviewBtn>
                  </ViewTabList>
                </ul>
              </ViewTab>

              {/* 후기 */}
              {reviewVisible && (
                <CommentShow ref={topRef}>
                  <CommentHeader>
                    <h3>
                      상품후기
                      <span>({comment.length})</span>
                    </h3>
                    <a onClick={() => setPopupVisible(true)}>후기작성하기</a>
                    {/* 유저아이디없으면숨기기 */}
                  </CommentHeader>
                  <CommentList>
                    {/* 상품후기리스트 */}
                    {comment.map((cmt) => (
                      <>
                        <ReviewBox key={cmt.id}>
                          <ReviewInfo>
                            <span>{cmt.username}</span>
                            <span>
                              <div></div>
                              {cmt.createdAt.slice(0, 10)}
                            </span>
                            <ReviewDelete
                              onClick={() => dispatch(deleteComment(cmt.id))}
                            >
                              닫기
                            </ReviewDelete>
                            <ReviewEdit
                              onClick={() => setEditPopupVisible(true)}
                            >
                              편집
                            </ReviewEdit>
                          </ReviewInfo>
                          <ReviewText>
                            <div>{cmt.content}</div>
                          </ReviewText>
                        </ReviewBox>
                        {/* 후기수정 */}
                        {editPopupVisible && (
                          <>
                            <LayerShow> </LayerShow>
                            <LayerPopup>
                              <h2>후기 수정</h2>
                              <PopupContent>
                                <div>
                                  <PopupList>
                                    <PopupImg>
                                      <a>
                                        <img
                                          src={detail.mainImageUrl[0]}
                                          alt=""
                                        />
                                      </a>
                                    </PopupImg>
                                    <PopupInfo>
                                      <p>
                                        <a>{detail.title}</a>
                                      </p>
                                    </PopupInfo>
                                  </PopupList>
                                  <PopupText>
                                    <textarea
                                      Value={editReview}
                                      onChange={(e) =>
                                        setEditReview(e.target.value)
                                      }
                                      maxLength="1000"
                                      placeholder="배민문방구 써보니 어떠셨나요?
                                      나누고 싶은 후기를 작성해주세요.(10자 이상, 1,000자 이내)"
                                    ></textarea>
                                  </PopupText>
                                </div>
                              </PopupContent>
                              <PopupFooter>
                                <PopupFooterBtn
                                  review={editReview}
                                  onClick={() => reviewEditHandler(cmt)}
                                >
                                  수정하기
                                </PopupFooterBtn>
                              </PopupFooter>
                              <PopupDelete
                                onClick={() => setEditPopupVisible(false)}
                              >
                                닫기
                              </PopupDelete>
                            </LayerPopup>
                          </>
                        )}
                      </>
                    ))}
                  </CommentList>
                </CommentShow>
              )}

              {/* 후기작성 */}
              {popupVisible && (
                <>
                  <LayerShow> </LayerShow>
                  <LayerPopup>
                    <h2>후기 작성</h2>
                    <PopupContent>
                      <div>
                        <PopupList>
                          <PopupImg>
                            <a>
                              <img src={detail.mainImageUrl[0]} alt="" />
                            </a>
                          </PopupImg>
                          <PopupInfo>
                            <p>
                              <a>{detail.title}</a>
                            </p>
                          </PopupInfo>
                        </PopupList>
                        <PopupText>
                          <textarea
                            Value={review}
                            onChange={(e) => setReview(e.target.value)}
                            maxLength="1000"
                            placeholder="배민문방구 써보니 어떠셨나요?
                      나누고 싶은 후기를 작성해주세요.(10자 이상, 1,000자 이내)"
                          ></textarea>
                        </PopupText>
                      </div>
                    </PopupContent>
                    <PopupFooter>
                      <PopupFooterBtn
                        review={review}
                        onClick={() => reviewPostHandler()}
                      >
                        등록하기
                      </PopupFooterBtn>
                    </PopupFooter>
                    <PopupDelete onClick={() => setPopupVisible(false)}>
                      닫기
                    </PopupDelete>
                  </LayerPopup>
                </>
              )}
              {/* 상세페이지 */}
              {!infoVisible && (
                <DetailShow ref={topRef}>
                  <div></div>
                  <div>
                    <figure>
                      <img src={detail.detailImageUrl} alt="" />
                    </figure>
                  </div>
                  <RequiredInfo>
                    <h4>상품상세정보</h4>
                    <table>
                      <tbody>
                        <tr>
                          <th>제품명</th>
                          <td>{detail.title}</td>
                        </tr>
                        <tr>
                          <th>
                            법에 의한 인증 허가 등을 받았음을 확인할 수 있는
                            경우 그에 대한 사항
                          </th>
                          <td>해당없음</td>
                        </tr>
                        <tr>
                          <th>크기</th>
                          <td>123x181mm</td>
                        </tr>
                        <tr>
                          <th>제조사 및 수입자명</th>
                          <td>한림문화사</td>
                        </tr>
                        <tr>
                          <th>제조국</th>
                          <td>한국</td>
                        </tr>
                        <tr>
                          <th>사용연령</th>
                          <td>8세 이상</td>
                        </tr>
                        <tr>
                          <th>상품문의</th>
                          <td>1:1 문의게시판으로 문의해주세요</td>
                        </tr>
                      </tbody>
                    </table>
                  </RequiredInfo>
                </DetailShow>
              )}
            </ViewContent>
          </MainView>
          <Random />
        </MainBox>
        <Footer>
          <FooterBox>
            <h2>
              <span>배민문방구</span>
            </h2>
            <FooterInfo>
              <FooterNav>
                <ul>
                  <li>
                    <a>About</a>
                  </li>
                  <li>
                    <a>공지사항</a>
                  </li>
                  <li>
                    <a>이용약관</a>
                  </li>
                  <li>
                    <a style={{ fontWeight: "700" }}>개인정보처리방침</a>
                  </li>
                  <li>
                    <a>대량구매/제휴안내</a>
                  </li>
                </ul>
                <p>
                  <a>
                    <div></div>
                    @baemin_store
                  </a>
                </p>
              </FooterNav>
              <FooterData>
                <p>상호 : 우아한형제들</p>
                <p>대표 : 이중표</p>
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
      </Body>
    </>
  );
};

export default React.memo(GoodsDetail);

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
  position: sticky;
  z-index: 5;
  top: 0px;
  left: 0px;
  padding-top: 0px;
  background-color: rgba(255, 255, 255, 0.98);
  border-bottom: 1px solid transparent;
`;

const OderBox = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 80px 0 50px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
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
  span {
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 19px;
    height: 16px;
    border-radius: 10px;
    font-size: 11px;
    color: rgb(255, 255, 255);
    font-weight: 700;
    line-height: 16px;
    text-indent: 0px;
    text-align: center;
    background-color: rgb(42, 193, 188);
    display: block;
  }
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
      /* a {
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
      } */
    }
  }
`;

const LivingBtn = styled.a`
  cursor: pointer;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: ${({ category }) =>
    category == "리빙" ? "rgb(42, 193, 188)" : "inherit"};
  text-decoration: none;
  &:hover {
    color: rgb(42, 193, 188);
  }
`;
const StBtn = styled.a`
  cursor: pointer;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: ${({ category }) =>
    category == "문구" ? "rgb(42, 193, 188)" : "inherit"};
  text-decoration: none;
  &:hover {
    color: rgb(42, 193, 188);
  }
`;

//메인
const MainBox = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 0 200px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const MainView = styled.div``;

const ViewHeader = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;
const ViewInfo = styled.div`
  width: 250px;
  color: #000;
  flex: 0 0 250px;
  span {
    margin-bottom: 10px;
    justify-content: flex-start;
  }
  h3 {
    font-size: 29px;
    line-height: 42px;
    font-weight: 700;
    letter-spacing: -0.5px;
    word-break: keep-all;
    color: inherit;
    margin-bottom: 0;
  }
  p {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    display: flex;
  }
`;

const ViewOder = styled.div`
  width: 300px;
  flex: 0 0 300px;
  dl {
    padding: 16px 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
    list-style: none;

    dt {
      color: #000;
      font-weight: 500;
      line-height: 19px;
    }
    dd {
      margin-top: 10px;
      color: #999;
      line-height: 24px;
    }
  }
`;
const BuyList = styled.div`
  position: relative;
  margin-top: 16px;
`;
const BuyListBox = styled.div`
  &:first-child {
    margin-top: 0;
  }
  position: relative;
  margin-top: 8px;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 6px;
  h4 {
    width: 228px;
    font-size: 14px;
    color: #000;
    font-weight: 400;
    line-height: 17px;
  }
`;
const BuyOption = styled.div`
  margin-top: 14px;
  display: flex;
  div {
    position: relative;
    width: 108px;
    height: 26px;
    padding: 0 30px;
    input {
      width: 100%;
      height: 100%;
      font-size: 16px;
      line-height: 19px;
      font-weight: 400;
      text-align: center;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      outline: none;
    }
  }
`;

const Minus = styled.button`
  left: 0;
  background: #fff
    url("https://brandstore.baemin.com/assets/image/web/icon_minus.png") center
    center no-repeat;
  background-size: 12px auto;
  position: absolute;
  width: 26px;
  height: 26px;
  text-indent: -1000em;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
`;
const Plus = styled.button`
  right: 0;
  background: #fff
    url("https://brandstore.baemin.com/assets/image/web/icon_plus.png") center
    center no-repeat;
  background-size: 12px auto;
  position: absolute;
  width: 26px;
  height: 26px;
  text-indent: -1000em;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
`;

const ListDelete = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  background: url("	https://brandstore.baemin.com/assets/image/web/btn_delete_s.png")
    no-repeat;
  background-size: 20px auto;
  text-indent: -1000em;
  overflow: hidden;
  display: block;
  margin-bottom: 0;
  border: none;
  outline: none !important;
  cursor: pointer;
`;

const SelectBox = styled.div`
  margin-top: -1px;
  position: relative;
  min-width: 120px;
  color: #000;
`;
const SelectText = styled.div`
  border: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
  position: relative;
  width: 100%;
  font-size: 16px;
`;

const SelectBtn = styled.button`
  padding: 0 27px 0 0;
  font-weight: 500;
  height: 52px;
  text-align: left;
  position: relative;
  width: 100%;
  font-size: inherit;
  color: inherit;
  line-height: 41px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-bottom: 0;
  background: none;
  border: none;
  outline: none !important;
  cursor: pointer;
  div {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 12px;
    height: 12px;
    margin-top: -6px;
    background: url("	https://brandstore.baemin.com/assets/image/web/arr_select.png")
      center center no-repeat;
    background-size: 100% auto;
    display: block;
    content: "";
    transform: ${({ selectVisible }) =>
      selectVisible ? "rotate(0deg)" : "rotate(180deg)"};
  }
`;

const OptionBox = styled.div`
  position: relative;
`;

const SelectOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0;
  font-size: 14px;
  line-height: 19px;
  overflow: hidden;
  height: auto;
  z-index: 4;
  div {
    border-top: 1px solid #ddd;
    border-radius: 6px;
    opacity: 1; //0에서 1
    background-color: #fff;
    border: 1px solid #ddd;
    overflow: hidden;
    transition: 0.3s ease opacity;
    ul {
      width: 100%;
      max-height: 255px;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      li {
        margin-bottom: 0;
        list-style: none;
        button {
          width: 100%;
          min-height: 52px;
          padding: 16px 20px;
          font-size: inherit;
          color: inherit;
          text-align: left;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          background: none;
          border: none;
          outline: none !important;
          cursor: pointer;
          &:hover {
            color: rgb(42, 193, 188);
          }
        }
      }
    }
  }
`;

const Price = styled.ul`
  margin-top: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  list-style: none;
  li {
    margin-right: 40px;
    font-weight: 500;
    flex: 0 0 auto;
  }
  dd {
    margin-left: auto;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
  }
`;
const OderFooter = styled.footer`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  button:first-child {
    margin: 0;
    width: 52px;
    height: 52px;
    flex: 0 0 52px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: url("	https://brandstore.baemin.com/assets/image/web/btn_cart.png")
      center center no-repeat;
    background-size: 28px auto;
    text-indent: -1000em;
    overflow: hidden;
    display: block;
    transition: 0.3s ease background-image;
    outline: none !important;
    cursor: pointer;
  }
  button {
    height: 52px;
    margin-left: 10px;
    font-weight: 500;
    width: 100%;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    background-color: #2ac1bc;
    border-radius: 6px;
    position: relative;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #2ac1bc;
    transition: 0.3s ease color, 0.3s ease background-color,
      0.3s ease border-color;
    :hover {
      background-color: #fff;
      color: #2ac1bc;
    }
  }
`;
const ViewContent = styled.div`
  position: relative;
`;
const ViewTab = styled.div`
  position: sticky;
  top: -1px;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
  ul {
    cursor: pointer;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    display: flex;
    div {
      width: 1px;
      height: 16px;
      background-color: #ddd;
      display: block;
      content: "";
      box-sizing: border-box;
    }
  }
`;

const ViewTabList = styled.li`
  a:first-child {
    color: ${({ reviewVisible }) => (reviewVisible ? "#ccc" : "#000")};
  }
  width: 100%;
  font-size: 16px;
  color: #ccc;
  line-height: 19px;
  display: flex;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    text-decoration: none;
  }
`;
const InfoBtn = styled.a`
  width: 100%;
  height: 100%;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: ${({ reviewVisible }) => (reviewVisible ? "#000" : "#ccc")};
  text-decoration: none;
  border: none;
  cursor: pointer;
`;
const ReiviewBtn = styled.a`
  width: 100%;
  height: 100%;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  color: ${({ reviewVisible }) => (reviewVisible ? "#000" : "#ccc")};
  text-decoration: none;
  border: none;
  cursor: pointer;
  span {
    margin-left: 4px;
    color: #2ac1bc;
    display: inline-block;
    font-weight: 400;
  }
`;

const CommentShow = styled.section`
  display: block;
  padding: 80px 0 0 0;
`;

const LayerShow = styled.div`
  opacity: 0.6;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 16;
`;

const LayerPopup = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 460px;
  max-height: calc(100% - 50px);
  padding: 40px 30px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 4px 4px 50px rgb(0 0 0 / 15%);
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  z-index: 100;
  h2 {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: inherit;
    margin-bottom: 0;
  }
`;
const PopupContent = styled.div`
  margin-top: 30px;
`;

const PopupList = styled.div`
  display: flex;
  align-items: center;
`;

const PopupImg = styled.p`
  width: 90px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    img {
      max-width: 100%;
      max-height: 100%;
      border: none;
      vertical-align: middle;
    }
  }
`;

const PopupInfo = styled.div`
  margin-left: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  p {
    width: 100%;
    font-size: 16px;
    color: #000;
    font-weight: 500;
    line-height: 22px;
    word-break: keep-all;
    a {
      margin: 0;
      padding: 0;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      text-decoration: none;
    }
  }
`;

const PopupText = styled.div`
  margin-top: 20px;
  height: 200px;
  padding: 20px 6px 20px 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  transition: 0.2s ease border;
  textarea {
    width: 100%;
    height: 100%;
    padding: 0 14px 0 0;
    font-size: 14px;
    line-height: 24px;
    text-align: left;
    white-space: pre-wrap;
    -webkit-appearance: none;
    border-radius: 0;
    resize: none;
    color: #000;
    vertical-align: middle;
    border-radius: 0;
    outline: none;
    border: none;
  }
`;
const PopupFooter = styled.footer`
  min-width: 400px;
  flex: 0 0 auto;
  margin: 40px auto 0 auto;
  display: flex;
  justify-content: center;
`;

const PopupFooterBtn = styled.button`
  height: 62px;
  margin-left: 0;
  font-weight: 500;
  width: 100%;
  font-size: 16px;
  line-height: 19px;
  color: ${({ review }) => (review.length > 0 ? "#fff" : "#ccc")};
  background-color: ${({ review }) => (review.length > 0 ? "#2ac1bc" : "#eee")};
  border-radius: 6px;
  position: relative;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: ${({ review }) =>
    review.length > 0 ? "1px solid #2ac1bc" : "1px solid #fff;"};
  transition: 0.3s ease color, 0.3s ease background-color,
    0.3s ease border-color;
  :hover {
    background-color: ${({ review }) => (review.length > 0 ? "#eee" : "#eee")};
    color: ${({ review }) => (review.length > 0 ? "#2ac1bc" : "#ccc")};
  }
`;

const PopupDelete = styled.button`
  top: 28px;
  right: 28px;
  background: url("https://brandstore.baemin.com/assets/image/web/btn_close.png")
    center center no-repeat;
  background-size: 24px auto;
  position: absolute;
  width: 28px;
  height: 28px;
  display: block;
  text-indent: -1000em;
  overflow: hidden;
  z-index: 1;
  border: none;
  outline: none !important;
  cursor: pointer;
  color: #000;
  vertical-align: middle;
  border-radius: 0;
`;
const CommentHeader = styled.header`
  padding-bottom: 24px;
  display: flex;
  align-items: center;
  h3 {
    font-size: 20px;
    line-height: 24px;
    font-weight: 700;
    color: inherit;
    margin-bottom: 0;
    span {
      padding-left: 2px;
      font-weight: 400;
      display: inline-block;
    }
  }
  a {
    cursor: pointer;
    margin-left: auto;
    font-size: 16px;
    color: #000;
    line-height: 16px;
    text-decoration: none;
    font-weight: 400;
    white-space: nowrap;
    display: flex;
    align-items: center;
    &::after {
      width: 12px;
      height: 12px;
      margin-left: 2px;
      background: url("https://brandstore.baemin.com/assets/image/web/arr_btn_right.png")
        center center no-repeat;
      background-size: 100% auto;
      display: inline-block;
      content: "";
      box-sizing: border-box;
    }
  }
`;

const CommentList = styled.div`
  border-top: 1px solid #ddd;
`;
const ReviewBox = styled.div`
  padding: 24px 0;
  font-size: 16px;
  color: #777;
  line-height: 30px;
  border-top: 1px solid #ddd;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 1px solid #ddd;
  }
`;
const ReviewInfo = styled.div`
  margin-bottom: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  span:first-child {
    color: #000;
    display: flex;
    align-items: center;
  }
  span {
    color: #999;
    display: flex;
    align-items: center;
    div {
      margin: 0 12px;
      width: 1px;
      height: 10px;
      background-color: #ddd;
      display: block;
      content: "";
    }
  }
`;

const ReviewText = styled.div`
  position: relative;
`;

const DetailShow = styled.section`
  text-align: center;
  display: block;
  padding: 80px 0 0 0;
  div:first-child {
    margin-bottom: 80px;
  }
  figure {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
    img {
      border: none;
      vertical-align: middle;
    }
  }
`;
const ReviewDelete = styled.button`
  background: url("https://brandstore.baemin.com/assets/image/web/btn_close.png")
    center center no-repeat;
  background-size: 24px auto;
  position: relative;
  left: 5px;
  width: 28px;
  height: 28px;
  display: block;
  text-indent: -1000em;
  overflow: hidden;
  z-index: 1;
  border: none;
  outline: none !important;
  cursor: pointer;
  color: #999;
  vertical-align: middle;
  border-radius: 0;
`;

const ReviewEdit = styled.button`
  background: url("https://www.flaticon.com/svg/vstatic/svg/3917/3917376.svg?token=exp=1661323818~hmac=7522f8e88f460ba22bd78eb197df99db")
    center center no-repeat;
  background-size: 15px auto;
  position: relative;
  left: 10px;
  width: 15px;
  height: 15px;
  display: block;
  text-indent: -1000em;
  overflow: hidden;
  z-index: 1;
  border: none;
  outline: none !important;
  cursor: pointer;
  color: #999;
  vertical-align: middle;
  border-radius: 0;
`;

const RequiredInfo = styled.div`
  width: 900px;
  margin: 200px auto 0 auto;
  h4 {
    padding-bottom: 24px;
    font-size: 20px;
    color: #000;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
  }
  table {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    tbody {
      display: table-row-group;
      vertical-align: middle;
      tr {
        display: table-row;
        vertical-align: inherit;
        th {
          width: 180px;
          color: #000;
          font-weight: 400;
          word-break: keep-all;
          background-color: #fafafa;
          padding: 16px;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
        td {
          color: #999;
          padding: 16px;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          border-bottom: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
    }
  }
`;
//푸터
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

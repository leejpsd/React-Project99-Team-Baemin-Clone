import React from "react";
import styled from "styled-components";

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
import Header from "../components/Header";


const Main = () => {
    return (
        <>
            <Header />
            <MainWrap>
                <MainBanner></MainBanner>
            </MainWrap>
        </>
    )
}

const MainWrap = styled.div`

`;

const MainBanner = styled.div`

`;

export default Main;
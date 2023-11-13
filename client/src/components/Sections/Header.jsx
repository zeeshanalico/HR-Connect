import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import "./Style/Header.css";

// Components
import FullButton from "../Buttons/FullButton";
// Assets
import HeaderImage from "../../assets/img/header-img.png";
// import QuotesIcon from "../../assets/svg/Quotes";
// import Dots from "../../assets/svg/Dots";
import HRimage from '../../assets/img/img-1.jpg';

export default function Header() {
  return (
    <Wrapper id="home" className="container flexSpaceCenter">
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold ">HR Connect.</h1>
          <HeaderP className="font13 semiBold drop-from-above blue-color">
          Welcome to HR Connect, your one-stop destination for comprehensive HR 
          solutions. Discover the power of streamlined processes, enhanced communication, and efficient workforce management.
          </HeaderP>
          <RouterLink to="/Login">
          <BtnWrapper >
            <button className="submit-btn">Log in</button>
           
          </BtnWrapper>
          </RouterLink>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img className="radius8" src={HRimage} height={578} width={436} alt="office" style={{zIndex: 9}} />
          {/* <QuoteWrapper className="flexCenter darkBg radius8">
            <QuotesWrapper> */}
              {/* <QuotesIcon /> */}
            {/* </QuotesWrapper> */}
            {/* <div>
              <p className="font15 whiteColor">
                <em>Friends, such as we desire, are dreams and fables. Friendship demands the ability to do without it.</em>
              </p>
              <p className="font13 orangeColor textRight" style={{marginTop: '10px'}}>Ralph Waldo Emerson</p>
            </div> */}
          {/* </QuoteWrapper> */}
          {/* <DotsWrapper> */}
            {/* <Dots />
          </DotsWrapper> */}
        </ImageWrapper>
        <GreyDiv className="lightBg"></GreyDiv>
      </RightSide>
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding-top: 10px;
  width: 100%;
  min-height: 750px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  top-margin: 5px !imp;

  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 20px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 650px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  background-color: white;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  @media (max-width: 560px) {
    width: 80%;
    height: auto;
  }
`;
// const QuoteWrapper = styled.div`
//   position: absolute;
//   left: 0;
//   bottom: 50px;
//   max-width: 330px;
//   padding: 30px;
//   z-index: 99;
//   @media (max-width: 960px) {
//     left: 20px;
//   }
//   @media (max-width: 560px) {
//     bottom: -50px;
//   }
// `;
// const QuotesWrapper = styled.div`
//   position: absolute;
//   left: -20px;
//   top: -10px;
// `;
// const DotsWrapper = styled.div`
//   position: absolute;
//   right: -100px;
//   bottom: 100px;
//   z-index: 2;
//   @media (max-width: 960px) {
//     right: 100px;
//   }
//   @media (max-width: 560px) {
//     display: none;
//   }
// `;



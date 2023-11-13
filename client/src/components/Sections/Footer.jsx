import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import hrconnect from "../../assets/img/HR_Connect.jpg.jpg";

// Assets
import LogoImg from "../../assets/svg/Logo";

export default function Contact() {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <Wrapper>
      <div className="darkBg" style={{backgroundColor: "black"}}>
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
            <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
            <img src={hrconnect} alt="logo" height={45} width={52} style={{ marginLeft: "15px" }} className="font20 extraBold" />
              <h5 className="whiteColor" style={{ marginLeft: "15px" }}>
                  HR Connect
              </h5>
            </Link>
            <StyleP className="whiteColor font13">
              © {getCurrentYear()} - <span className="purpleColor font13">HR Connect</span> All Right Reserved
            </StyleP>

            <Link className="whiteColor animate pointer font13" to="home" smooth={true} offset={-80}>
              Back to top
            </Link>
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;
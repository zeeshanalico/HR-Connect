import React from "react";
import styled from "styled-components";
// Assets
import RollerIcon from "../../assets/svg/Services/RollerIcon";
import MonitorIcon from "../../assets/svg/Services/MonitorIcon";
import BrowserIcon from "../../assets/svg/Services/BrowserIcon";
import PrinterIcon from "../../assets/svg/Services/PrinterIcon";

export default function ServiceBox({icon, title, subtitle}) {
  let getIcon;

  switch (icon) {
    case "Hiring":
      getIcon = "fas fa-users fa-5x";
      break;
    case "Onboard":
      getIcon = "fas fa-user-plus fa-5x";
      break;
    case "Management":
      getIcon = "fa fa-briefcase fa-5x";
      break;
    case "Analytics":
      getIcon = "far fa-chart-bar fa-5x";
      break;
    default:
      getIcon = <RollerIcon />;
      break;
  }


  return (
    <Wrapper className="flex flexColumn">
      <IconStyle><i className={getIcon}></i></IconStyle>
     {/* <IconStyle>{getIcon}</IconStyle>*/}
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13 secondary-text">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }

width: 100%;

`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
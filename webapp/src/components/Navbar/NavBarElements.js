import styled from "styled-components";
//Styled-components is a library built for React and React Native developers. It allows you to use component-level styles in your applications.
//Styled-components leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS.
//React Router DOM is an npm package that enables you to implement dynamic routing in a web app
//React component for animating vertical scrolling.
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

//  margin-top: -80px;

export const Nav = styled.nav`
  background: ${({ scrollNav }) => (scrollNav ? "#DBD2EE" : "transparent")};

  background: #dbd2ee;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
  color: red;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  text-decoration: none;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #5b059e;
  }
`;

export const NavMenu = styled.ul`
display: flex;
align-items: center;
list-style: none;
text-align: center;
margin-right: -22px: 

@media screen and (max-width: 768px){
    display: none;
}
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  font-weight: medium;

  @media screen and (max-width: 768px) {
    display: none;
  }

  &.active {
    border-bottom: 5px solid #5b059e;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBarRegister = styled(LinkR)`
  display: flex;
  padding: 10px 22px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBarLogout = styled.div`
  display: flex;
  padding: 10px 22px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBarcontact = styled(LinkR)`
display: flex;
padding: 10px 22px;
align-items: center;
cursor: pointer;
text-decoration: none;
color: black;

@media screen and (max-width: 768px) {
  display: none;
}
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #5b059e;
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: white;
    color: #5b059e;
    border: #5b059e;
  }
`;

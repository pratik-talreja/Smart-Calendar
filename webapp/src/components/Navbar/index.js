import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavBarRegister,
  NavBarLogout,
  NavBarcontact,
} from "./NavBarElements";
import { FaBars } from "react-icons/fa";
import Donna_logo from "./../../images/Donna_logo.png";

const Navbar = (props) => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  const history = useNavigate();
  const [scrollNav, setScrollNav] = useState(false);
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const onLogutButtonClick = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    handleLogout();
    history("/signin");
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const unauthenticatedNavBar = () => {
    // return(
    //   <>
    //    <NavLogo to="/" onClick={toggleHome}>

    return (
      <>
        {/* <Nav scrollNav={scrollNav}>
        <NavbarContainer> */}
        <NavLogo to="/" onClick={toggleHome}>
          <img src={Donna_logo} width={120} height={70} alt="Logo" />
        </NavLogo>
        <MobileIcon onClick={props.toggle}>
            <FaBars />
          </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              activeClass="active"
            >
              Why Donna?
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="calendar"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
              className="nav-button"
            >
              Calendar
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="features"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Features
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="notifications"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Notifications
            </NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
          <NavBarRegister to="/register">Register</NavBarRegister>
          <NavBarcontact to="/donna/contacts">Contact</NavBarcontact>
        </NavBtn>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <NavLogo to="/" onClick={toggleHome}>
          <img src={Donna_logo} width={120} height={70} alt="Logo" />
        </NavLogo>
        <NavMenu>
          <NavItem>
            <NavLinks
              onClick={() => {
                history("/donna/managetasks");
              }}
              // smooth={true}
              // duration={500}
              // spy={true}
              // exact="true"
              // offset={-80}
              // activeClass="active"
            >
              Tasks
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              onClick={() => {
                history("/donna/profile");
              }}
            >
              Profile
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              onClick={() => {
                history("/donna/calendar");
              }}
              smooth={true}
              duration={500}
              spy={true}
              exact={true}
              offset={-80}
            >
              Calendar
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              onClick={() => {
                history("/donna/habits");
              }}
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Habits Tracker
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              onClick={() => {
                history("/donna/contacts");
              }}
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Contact
            </NavLinks>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <NavBarLogout onClick={() => onLogutButtonClick()}>
            Logout
          </NavBarLogout>
        </NavBtn>
      </>
    );
  };

  return (
    <>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          {localStorage.getItem("isAuthenticated")
            ? authenticatedNavBar()
            : unauthenticatedNavBar()}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;

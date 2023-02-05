import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';

import {FaTimes} from 'react-icons/fa';

export const SidebarContainer = styled.aside`
position: fixed:
z-index: 999;
width: 100%;
height: 100%;
background: #5B059E;
display: grid;
top: 0;
align-items: center;
left: 0;
transition: 0.3s ease-in-out;
display: ${({isOpen}) => (isOpen ? "grid" : "none")};
opacity: ${({isOpen}) => (isOpen ? '100%' : '0')};
width: ${({isOpen}) => (isOpen ? '100%' : '0')};
top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};

`;

export const CloseIcon = styled(FaTimes)`
color: white;
`;

export const Icon = styled.div`
position: absolute;
top: 1.2rem;
right: 1.5rem;
background: transparent;
font-size: 2rem;
cursor: pointer;
outline: none;
`;

export const SidebarWrapper = styled.div`
color: #5B059E ;
`;

export const SidebarMenu = styled.ul`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(6, 80px);
text-align: center;

@media screen and (max-width: 480px){
   grid-template-rows: repeat(6, 60px);
}

`;

export const SidebarLink = styled(LinkS)`
    display: flex;
    align-items: center;
    list-style: none;
    text-decoration: none;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    line-style: none;
    color: white;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: white;
        color:#5B059E;
        border:#5B059E;
    }

`;

export const SideBtnWrap = styled.div`
display: flex;
justify-content: center;
    
`;

export const SidebarRoute = styled(LinkR)`
border-radius: 50px;
background: #DBD2EE;
white-space: nowrap;
padding: 16px 64px;
color: black;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;


&:hover {
    transition: all 0.2s ease-in-out;
    background: white;
    color:#5B059E;
    border:#5B059E;
}

`;




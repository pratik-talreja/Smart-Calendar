import styled  from "styled-components";
import {Link} from 'react-scroll';


export const Button = styled(Link)`
border-radius: 50px;
background: ${({primary}) => (primary ? '#5B059E' : '#DBD2EE')};
white-space: nowrap;
padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
color: ${({dark}) => (dark ? 'white' : '#5B059E')};
font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
outline: none;
border: none;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.2s ease-in-out;

&:hover {
    transition: all 0.2s ease-in-out;
    background: ${({primary}) => (primary ? '#DBD2EE' : '#5B059E')};
    color: ${({dark}) => (dark ? '#5B059E' : '#DBD2EE')};

}
`
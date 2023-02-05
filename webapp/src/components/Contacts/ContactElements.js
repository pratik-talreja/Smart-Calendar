import styled from 'styled-components';


export const ServicesContainer = styled.div`
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(91,5,158,1) 0%, rgba(219,210,238,1) 97%);

    @media screen and (max-width: 768px){
        height: 1100px;
    }

    @media screen and (max-width: 480px){
        height: 1300px;
    }

`;

export const ServicesWrapper = styled.div`
max-width: 1000px;
margin: 0 auto;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
align-items: center;
grid-gap: 16px;
padding: 0 50px;


@media screen and (max-width: 1000px){
    grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 768px){
    grid-template-columns: 1fr;
    padding: 0 20px;
}
`;

export const ServicesCard = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

`;

export const ServicesIcon = styled.img`
height: 180px;
width: 160px;
margin-bottom: 10px;
`;

export const ServicesH1 = styled.h1`
font-size: 2.5rem;
color: white;
margin-bottom: 64px;

@media screen and (max-width: 480px){
    font-size: 2rem;
}
`;

export const ServicesH2 = styled.h2`
    font-size: 1rem;
    margin-bottom: 10px;
`;

export const Fab = styled.div`
    position: relative;
    float: right;
    margin-right: 10px;
    color: #5B059E;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 4%, rgba(91,5,158,1) 44%, rgba(219,210,238,1) 97%);
    border: none;
    width: 36px;
    height: 36px;
    cursor: pointer;
    outline: none;
`;
// .note button {
//     position: relative;
//     float: right;
//     margin-right: 10px;
//     color: #5B059E;
//     border: none;
//     width: 36px;
//     height: 36px;
//     cursor: pointer;
//     outline: none;
//   }

export const ServicesP = styled.p`
    font-size: 1rem;
    text-align: center;
`;
import React, {useState} from 'react'
import Video from '../../videos/video.mp4'
import { useNavigate } from "react-router-dom";

import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
} from './MainElements'
import {Button} from '../ButtonElements'

const MainSection = () => {
const [hover, setHover] = useState(false)
const history = useNavigate();
const onHover = () =>
{
    setHover(!hover)
}
  return (
    <HeroContainer>
        <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mp4'> </VideoBg>
        </HeroBg>
        <HeroContent>
            <HeroH1> Task Managing Made Easy</HeroH1>
            <HeroP>
            Register online and have all of your activities manage at your fingertips!
            </HeroP>
            <HeroBtnWrapper>
                <Button to="Register" onMoouseEnter={onHover} onMouseLeave={onHover} onClick={history("/signin")} primary='true' dark='true'>
                    Get started {hover ? <ArrowForward/> : <ArrowRight/>}
                </Button>
            </HeroBtnWrapper>
        </HeroContent>

    </HeroContainer>
  );
};

export default MainSection

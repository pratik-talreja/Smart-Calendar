import React, {useState} from 'react'
import Video from '../../videos/demo.mov'
import Navbar from '../Navbar'
import Footer from '../Footer'
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
} from './DemoElements'
import {Button} from '../ButtonElements'

const DemoVideo = () => {
const [hover, setHover] = useState(false)

const onHover = () =>
{
    setHover(!hover)
}
  return (
    <div>
        <Navbar></Navbar>
    <HeroContainer>
        <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mov'> </VideoBg>
        </HeroBg>

    </HeroContainer>
    <Footer></Footer>
    </div>
  );
};

export default DemoVideo

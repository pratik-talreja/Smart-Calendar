import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'
import MainSection from '../components/MainSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from '../components/InfoSection/Data';
import Services from '../components/Features';
import Footer from '../components/Footer';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
    const[isOpen,  setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
        setIsLoading(current => !current);
        
    };
    useEffect( () => {
     
  }, [isLoading]);
  

  return (
   <>
  
  <Sidebar isOpen={isOpen}  toggle={toggle}/>
   <Navbar toggle={(e) => toggle(e)} isOpen={isOpen} nav={"pannaga"}/>
   
   {/* <Sidebar isOpen={isOpen}  toggle={toggle}/> */}

   <MainSection />
   <InfoSection {...homeObjOne}/>
   <InfoSection {...homeObjTwo}/>
   <InfoSection {...homeObjThree}/>
   <InfoSection {...homeObjFour}/>
   <Services/>
    <Footer/>
   
   </>
  );
};

export default Home;

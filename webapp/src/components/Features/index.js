import React from 'react';
import Icon1 from '../../images/Schedule-amico.svg';
import Icon2 from '../../images/Timeline-amico.svg';
import Icon3 from '../../images/success.svg';




import {
    ServicesCard,
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesIcon,
    ServicesH2,
    ServicesP
} from  './ServicesElements';

const Services = () => {
  return (
    <ServicesContainer id="features">
        <ServicesH1> Features </ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>
                        Schedule in you calendar
                    </ServicesH2>
                  <ServicesP> Explore the best features available</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>
                        Track your habits
                    </ServicesH2>
                  <ServicesP> You can access our platform online anywhere in the world</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>
                       Notify the customer
                    </ServicesH2>
                  <ServicesP> Don't miss a task, Help at every step of your way.</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
       

    </ServicesContainer>
  )
}

export default Services;

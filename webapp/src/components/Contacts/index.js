import React, { useState } from "react";
import Icon1 from "../../images/pannaga.jpg";
import EmailIcon from "@mui/icons-material/Email";
import Fab from "@material-ui/core/Fab";
import Navbar from "../Navbar";
import Icon2 from "../../images/pratik.png";
import Icon3 from "../../images/nidhi.png";
import Icon4 from "../../images/rikin.png";

import {
  ServicesCard,
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ContactElements";
import Footer from "../Footer";

const Contact = () => {
  const [newMail, setnewmail] = useState({});

  const onSubmitButtonClick = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    const useremail = value;
    setnewmail(useremail);

    // Simple POST request with a JSON body using fetch
    const userIdval = localStorage.getItem("userId");
    const userId = userIdval ? userIdval : "guest";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useremail, userId }),
    };
    fetch("http://localhost:9000/sendmail/toadmins", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("data response", data), alert("Mail sent"));
  };

  return (
    <div>
      <Navbar />
      <ServicesContainer>
        <ServicesH1> How can we help you ? </ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon src={Icon1} />
            <ServicesH2>Pannaga Veeramohan</ServicesH2>
            <ServicesP> Hyper active developer with no life</ServicesP>
            <Fab
              //(e) => onInputChangeHandler(e, "firstName")
              onClick={(e) => onSubmitButtonClick(e, "pannaga3009@gmail.com")}
            >
              <EmailIcon Send mail />
            </Fab>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Pratik Talreja</ServicesH2>
            <ServicesP> Cool kid and brilliant developer</ServicesP>
            <Fab
              onClick={(e) => onSubmitButtonClick(e, "talreja9191@gmail.com")}
            >
              <EmailIcon Send mail />
            </Fab>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Nidhi Tiwari</ServicesH2>
            <ServicesP>
              {" "}
              Outstanding problem solver and Geek Programmer
            </ServicesP>
            <Fab onClick={(e) => onSubmitButtonClick(e, "nidhi.14t@gmail.com")}>
              <EmailIcon Send mail />
            </Fab>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon4} />
            {/* <br></br> */}
            <ServicesH2>Rikin Parekh</ServicesH2>
            <ServicesP>
              {" "}
              Pro design developer and monster addict yesssss
            </ServicesP>

            <Fab
              onClick={(e) =>
                onSubmitButtonClick(e, "rikinparekh3478@gmail.com")
              }
            >
              <EmailIcon Send mail />
            </Fab>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
      <Footer></Footer>
    </div>
  );
};

export default Contact;

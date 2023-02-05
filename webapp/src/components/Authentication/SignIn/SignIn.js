import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import Icon from "../../../images/signin.svg";
import GoogleLogin from "react-google-login";
import Navbar from "../../Navbar";

const SigninPage = () => {
  const insertGapiScript = (e) => {
    e.preventDefault();
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.onload = () => {
      intializeGoogleSignIn();
    };
    document.body.appendChild(script);
  };

  //The React useState Hook allows us to track state in a function component.
  // State generally refers to data or properties that need to be tracking in an application.

  const intializeGoogleSignIn = () => {
    window.gapi.load("auth2", () => {
      window.gapi.auth2.init({
        client_id:
          "498596702762-qg4dhptqcdbomm9ud405ti2119avj9fe.apps.googleusercontent.com",
      });

      window.gapi.load("signin2", () => {
        const params = {
          scope: "profile email",
          width: 240,
          height: 50,
          longtitle: true,
          prompt: "select_account",
          theme: "light",
          onSuccess: () => {
            console.log("User successfully signed in");
          },
          onFailure: () => {
            localStorage.removeItem("isAuthenticated");
          },
        };
        window.gapi.signin2.render("googleloginButton", params);
        localStorage.setItem("isAuthenticated", true);

        {
          localStorage.getItem("isAuthenticated")
            ? history("/donna/manageTasks")
            : history("/signin");
        }
      });
    });
  };

  const history = useNavigate();
  const [loginUser, setLoginUser] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const onInputChangeHandler = (e, fieldName) => {
    const userField = e.target.value;
    setLoginUser((prev) => {
      return { ...prev, [fieldName]: userField };
    });
  };

  const onLoginButtonClick = (e) => {
    e.preventDefault();

    // Simple POST request with a JSON body using fetch for Login
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    };

    fetch("http://localhost:9000/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data[0]._id) {
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userId", data[0]._id);
          localStorage.setItem("emailId", data[0].emailId);
          history("/donna/manageTasks");
        } else {
          alert(data);
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("User and Email Combination did not match");
        history("/signin");
      });
  };

  return (
    <div class="container">
      <Navbar />
      {/* <img src ="../../../images/png.png" alt="signin">
      </img> */}

      <div class="formWrap">
        {/* <object data="../../../images/signin.svg" width="300" height="300"> </object> */}

        <form className="sign-in">
          <h1>Sign in</h1>
          <label>Email Id*</label>
          <input
            type="text"
            id="emailId"
            name="emailId"
            onChange={(e) => onInputChangeHandler(e, "emailId")}
          />
          <br />
          <label>Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => onInputChangeHandler(e, "password")}
          />
          <button
            onClick={(e) => onLoginButtonClick(e)}
            className="loginButton"
          >
            Submit
          </button>
          <br></br>
          {/* {
            loginData ? (
              history("/donna/manageTasks")
            ) : (
              <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}>
              </GoogleLogin>
            )
          }
           */}
          {/* <button id="googleloginButton" onClick={(e) => insertGapiScript(e)}>
            Sign in with google
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default SigninPage;

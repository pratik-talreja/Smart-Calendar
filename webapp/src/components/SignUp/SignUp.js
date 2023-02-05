import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/index";
import "./SignUp.scss";


const Register = () => {
  const history = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  useEffect(() => {
    validateForm();
  }, [newUser, formErrors]);

  const onInputChangeHandler = (e, fieldName) => {
    const userField = e.target.value;
    setNewUser((prev) => {
      return { ...prev, [fieldName]: userField };
    });
    const emailRegexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const nameRegexp = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;

    const passRegexp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (
      fieldName === "emailId" &&
      newUser.emailId &&
      !emailRegexp.test(userField)
    ) {
      setFormErrors((prev) => {
        return { ...prev, emailId: "Email Id is not Valid" };
      });
    } else {
      setFormErrors((prev) => {
        return { ...prev, emailId: "" };
      });
    }
    if (
      fieldName === "firstName" &&
      newUser.firstName &&
      !nameRegexp.test(userField)
    ) {
      setFormErrors((prev) => {
        return { ...prev, firstName: "First Name is not Valid" };
      });
    } else {
      setFormErrors((prev) => {
        return { ...prev, firstName: "" };
      });
    }
    if (
      fieldName === "middleName" &&
      newUser.middleName &&
      !nameRegexp.test(userField)
    ) {
      setFormErrors((prev) => {
        return { ...prev, middleName: "Middle Name is not Valid" };
      });
    } else {
      setFormErrors((prev) => {
        return { ...prev, middleName: "" };
      });
    }
    if (
      fieldName === "lastName" &&
      newUser.lastName &&
      !nameRegexp.test(userField)
    ) {
      setFormErrors((prev) => {
        return { ...prev, lastName: "Last Name is not Valid" };
      });
    } else {
      setFormErrors((prev) => {
        return { ...prev, lastName: "" };
      });
    }
    if (
      fieldName === "password" &&
      newUser.password &&
      !passRegexp.test(userField)
    ) {
      setFormErrors((prev) => {
        return {
          ...prev,
          password: `Password is not Valid !!
          Must be a combination of 
          * Minimum 8 characters
          * At least one lower, one upper, a number and one special character`,
        };
      });
    } else {
      setFormErrors((prev) => {
        return { ...prev, password: "" };
      });
    }
    validateForm();
  };

  const validateForm = () => {
    if (
      formErrors.firstName.length > 0 ||
      formErrors.middleName.length > 0 ||
      formErrors.lastName.length > 0 ||
      formErrors.emailId.length > 0 ||
      formErrors.password.length > 0 ||
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.emailId ||
      !newUser.password
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const onSubmitButtonClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:9000/register", requestOptions)
      .then((response) => response.json())
      .then((data) => history("/signin"));
  };

  return (
    <>
       <div class="container">
      <Navbar></Navbar>
      <div class="formWrap">
        <h1>Register</h1>
        <form class="signup">
          <label>First Name*</label>
          <input
            type="text"
            id="fname"
            name="fname"
            onChange={(e) => onInputChangeHandler(e, "firstName")}
          />
          <div>{formErrors.firstName}</div>
          <br />
          <label>Middle Name</label>
          <input
            type="text"
            id="mname"
            name="mname"
            onChange={(e) => onInputChangeHandler(e, "middleName")}
          />
          <div>{formErrors.middleName}</div>
          <br />
          <label>Last Name*</label>
          <input
            type="text"
            id="lname"
            name="lname"
            onChange={(e) => onInputChangeHandler(e, "lastName")}
          />
          <div>{formErrors.lastName}</div>
          <br />
          <label>Email Id*</label>
          <input
            type="text"
            id="emailId"
            name="emailId"
            onChange={(e) => onInputChangeHandler(e, "emailId")}
          />
          <div>{formErrors.emailId}</div>
          <br />
          <label>Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => onInputChangeHandler(e, "password")}
          />
          <div>{formErrors.password}</div>
          <button
            id="submit"
            onClick={(e) => onSubmitButtonClick(e)}
            className={buttonDisabled ? "loginButtonDisabled" : "loginButton"}
            disabled={buttonDisabled}
          >
            Submit
          </button>
        </form>
        </div>
      </div>
    </>
  );
};

export default Register;

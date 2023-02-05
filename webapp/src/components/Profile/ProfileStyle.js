import styled from "styled-components";

//  margin-top: -80px;

export const ProfileContainer = styled.div`
  .btnUpdateProfile {
    border-radius: 50px;
    background: #5b059e;
    white-space: nowrap;
    padding: 10px 22px;
    color: white;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
      transition: all 0.2s ease-in-out;
      background: white;
      color: #5b059e;
      border: #5b059e;
      border-radius: 4px;
    }
  }

  .updateProfileStyle {
    padding-left: 70px;
    padding-top: 50px;
    cursor: pointer;

    .userProfileIcon {
      font-size: 70px;
      color: #5b059e;
    }
  }

  .profileForm {
    width: 80%;
    padding: 30px;
    box-shadow: 0px 0px 10px #5b059e;
    margin-bottom: 40px;
    .labelStyle {
      font-weight: bold;
    }
    .smallLabelStyle {
      margin: 0 5px 0 10px;
      font-size: 15px;
      font-weight: 500px;
    }
    .addedSchedule {
      font-weight: 600;
      margin-bottom: 20px;
      background-color: #e9e0ef;
    }
    .scheduleButtons {
      margin-left: 10px;
      padding: 5px;
      border-radius: 25px;
      background-color: #8658a7;
      color: white;
      cursor: pointer;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .userDetails {
    font-size: 20px;
    padding-left: 10px;
    padding-bottom: 20px;
    .labelStyle {
      font-weight: bold;
    }
  }

  .chartHeadingStyle {
    padding: 30px;
  }

  .taskVisHeading {
    padding-left: 35px;
    color: #5b059e;
    margin-bottom: 10px;
  }
`;

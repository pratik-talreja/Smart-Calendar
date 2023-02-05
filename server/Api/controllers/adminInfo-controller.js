import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import * as MailService from "../services/adminInfo-services.js";

// Function to send email to contact admins for help
 const sendEmail = async (userEmail, userId) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EmailUser, // generated ethereal user
      pass: process.env.EmailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"donnayourassistant@gmail.com', // sender address
    to: userEmail, // list of receivers
    subject: `${userId} Customer is trying to contact you`, // Subject line
    text: `Hello, 
 
    
    You have a new help request from the customer.

    Just leave it upto us!`,
    // html: "<b>Welcome</b>", // html body
  });
};

// Error Response to be returned in case of error
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// Success Response to be returned in case of success
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

/* *
 * Controller to create new task.
 * param request, response
 */
export const post = async (request, response) => {
  let mail;
  let mailArr = [];
  try {
    const payload = request.body;
    if (Array.isArray(payload)) {
      for (let i = 0; i < payload.length; i++) {
        mail = await MailService.save(payload[i]);
        mailArr.push(mail);
        
      }
    } else {
      mail = await MailService.save(payload);
    }
    if (mailArr.length > 0) {
      setSuccessResponse(mailArr, response);
    } else {
      setSuccessResponse(mail, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to create new user.
 * param request, response
 */

export const contactsmail = async (request, response) => {
  let newMail;
  try {
    const payload = request.body;
    if (newMail) {
      setSuccessResponse(newMail, response);
      sendEmail(newMail.useremail, newMail.userId);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const index = async (request, response) => {
  try {
    const userId = request.query.userId;
    const query = {};
    if (userId) {
      query._id = userId;
    }
    const mail = await MailService.search(query);
    setSuccessResponse(mail, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const mail = await MailService.get(id);
    setSuccessResponse(mail, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

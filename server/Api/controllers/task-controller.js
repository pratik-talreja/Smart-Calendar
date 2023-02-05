import bcrypt from "bcrypt";
import * as taskService from "./../services/tasks-service.js";
import nodemailer from "nodemailer";

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
    subject: `New Task Added to ${userId}`, // Subject line
    text: `Hello, 
 
    
    You have a new task.

    Just leave it upto us!`,
    // html: "<b>Welcome</b>", // html body
  });
};

// Error Response to be returned in case of error
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// Success method
const setSuccess = (obj, response) => {
  response.status(200);
  response.json(obj);
};

//Error method if we get error from MongoDB client
const setError = (error, response) => {
  response.status(500);
  response.json(error);
};

// POST method controller for adding new tasks
export const post = async (request, response) => {
  let task;
  try {
    
    const payload = request.body;
    task = await taskService.save(payload);
    if (Array.isArray(task)) {
      setSuccess(task, response);


      sendEmail(task[0].emailId, task[0].userId);
     

      sendEmail(task[0].emailId, task[0].userId);
    } else {
      setSuccess(task, response);
      sendEmail(task.emailId, task.userId);

    }
  } catch (error) {
    setError(error, response);
  }
};

export const postAfterDelete = async (request, response) => {
  try {
    let payload = request.body;
    const task = await taskService.addAfterDelete(payload);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

// //GET method controller for getting all the tasks
export const getNotes = async (request, response) => {
  try {
    const userId = request.body.userId;
    const task = await taskService.get(userId);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

//Delete method controller to remove specified task
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const task = await taskService.remove(id);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

//Update method controller to update entire specified task
export const update = async (request, response) => {
  try {
    const userId = request.params.id;
    const payload = request.body;

    let task = taskService.update(userId, payload);
    task = await taskService.get();
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

export const partUpdate = async (request, response) => {
  try {
    const userId = request.params.id;
    const payload = request.body;
    let task = await taskService.update(userId, payload);
    task = await taskService.get();
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

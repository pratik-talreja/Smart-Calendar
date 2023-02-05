import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import * as taskService from "../services/users-service.js";

// Function to send email on Account Register
 const sendEmail = async (userEmail, userName) => {
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
    subject: "Welcome to Donna!", // Subject line
    text: `Hello ${userName}, 

    You have successfully Registered to Donna - Your Personal Assistant. 
    
    Welcome to a new organized day using our Smart Calendar. 

    Just leave it upto Donna!`,
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
  let todo;
  let todoArr = [];
  try {
    const payload = request.body;
    if (Array.isArray(payload)) {
      for (let i = 0; i < payload.length; i++) {
        todo = await taskService.save(payload[i]);
        todoArr.push(todo);
      }
    } else {
      todo = await taskService.save(payload);
    }
    if (todoArr.length > 0) {
      setSuccessResponse(todoArr, response);
    } else {
      setSuccessResponse(todo, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to create new user.
 * param request, response
 */
export const createUser = async (request, response) => {
  let newUser;
  try {
    const payload = request.body;
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    newUser = await taskService.saveUser({
      ...payload,
      password: hashedPassword,
    });
    if (newUser) {
      setSuccessResponse(newUser, response);
      sendEmail(newUser.emailId, newUser.firstName);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};



/* *
 * Controller to authenticate an existing user.
 * param request, response
 */
export const login = async (request, response) => {
  try {
    const userEmail = request.body.emailId;
    const password = request.body.password;
    const loginUser = await taskService.userLogin(userEmail, password);

    if (loginUser.length == 0) {
      setErrorResponse("User does Not Exist", response);
    } else {
      const loginHashedPassword = loginUser[0].password;
      if (await bcrypt.compare(password, loginHashedPassword)) {
        setSuccessResponse(loginUser, response);
      } else {
        setErrorResponse("Passowrd is Incorrect", response);
      }
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to find an existing.
 * param request, response
 */
export const index = async (request, response) => {
  try {
    const userId = request.query.userId;
    const query = {};
    if (userId) {
      query._id = userId;
    }
    const todos = await taskService.search(query);
    setSuccessResponse(todos, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to find an existing.
 * param request, response
 */
export const userIndex = async (request, response) => {
  try {
    const firstName = request.query.emaiId;
    const query = {};
    if (emaiId) {
      query.firstName = firstName;
    }
    const reg = await taskService.searchUser(query);
    setSuccessResponse(reg, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to get an existing task based on id.
 * param request, response
 */
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const todo = await taskService.get(id);
    setSuccessResponse(todo, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to update an existing task based on id.
 * param request, response
 */
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const _id = request.params._id;
    const updated = { ...request.body };
    updated.id = id ? id : _id;
    const todo = await taskService.update(updated);
    setSuccessResponse(todo, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Controller to update an existing part of task based on id.
 * param request, response
 */
export const patchUpdate = async (request, response) => {
  try {
    const id = request.params.id;
    const _id = request.params._id;
    const updated = { ...request.body };
    updated.id = id ? id : _id;
    const originalTodo = await taskService.get(updated.id);
    if (originalTodo) {
      const patchUpdated = {
        ...updated,
        createdDate: originalTodo._doc.createdDate,
      };
      const todo = await taskService.patchUpdate(patchUpdated);
      setSuccessResponse(todo, response);
    } else {
      setErrorResponse(error, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

/* *
 * Removes an existing task based on id.
 * param request, response
 */
export const remove = async (request, response) => {
  try {
    const todoId = request.params.id ? request.params.id : request.params._id;
    const todoTitle = request.params.title;
    const todo = await taskService.remove(todoId);
    setSuccessResponse(
      {
        message: `Succesfully Removed Todo Item ${todoId}`,
      },
      response
    );
  } catch (error) {
    setErrorResponse(error, response);
  }
};

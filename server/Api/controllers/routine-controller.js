import bcrypt from "bcrypt";
import * as routineService from "./../services/routines-service.js";

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
  try {
    let payload = request.body;
    const task = await routineService.save(payload);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

export const postAfterDelete = async (request, response) => {
  try {
    let payload = request.body;
    const task = await routineService.addAfterDelete(payload);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

// //GET method controller for getting all the tasks
export const getRoutines = async (request, response) => {
  try {
    const userId = request.body.userId;
    const task = await routineService.get(userId);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

//Delete method controller to remove specified task
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const task = await routineService.remove(id);
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

//Update method controller to update entire specified task
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const payload = request.body;
    let task = await routineService.update(id, payload);
    task = await routineService.get();
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

export const partUpdate = async (request, response) => {
  try {
    const id = request.params.id;
    const payload = request.body;
    let task = await routineService.update(id, payload);
    task = await routineService.get();
    setSuccess(task, response);
  } catch (error) {
    setError(error, response);
  }
};

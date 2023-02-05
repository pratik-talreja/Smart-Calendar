import * as habitsService from "./../services/habits-service.js";

const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

export const post = async (request, response) => {
  try {
    const payload = request.body;
    const habit = await habitsService.save(payload);
    setSuccessResponse(habit, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const index = async (request, response) => {
  try {
    // const name = request.query.name;
    // const color = request.query.color;
    // const count = request.query.count;
    const userId = request.query.userId;
    const query = {};
    // if (name) {
    // query.name = name;
    // }
    // if (color) {
    //     query.color = color;
    // }
    // if (count) {
    //     query.count = count;
    // }
    if (userId) {
      query.userId = userId;
    }

    const habits = await habitsService.search(query);
    setSuccessResponse(habits, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const getHabits = async (request, response) => {
  try {
    const userId = request.params.id;
    const habit = await habitsService.get(userId);
    setSuccessResponse(habit, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updated = { ...request.body };
    updated.id = id;
    let habit = await habitsService.update(updated);
    habit = await habitsService.get(habit.id);
    setSuccessResponse(habit, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};

export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const habit = await habitsService.remove(id);
    setSuccessResponse({ message: `Successfully Removed ${id}` }, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
}

export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const habit = await habitsService.get(id);
    setSuccessResponse(habit, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
}

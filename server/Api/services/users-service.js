import userModel from "../models/register.js";
/* *
 * Creates a new to task.
 * return{saavedTodo}
 * param todo tasks
 */
export const save = (newTodo) => {
  const todo = new Task(newTodo);
  return todo.save();
};

/* *
 * Creates a new user.
 * return{savedUser}
 * param todo user
 */
export const saveUser = (newTodo) => {
  const newUser = new userModel(newTodo);
  return newUser.save();
};


/* *
 * Searches for an existing task.
 * return{searched task}
 * param query
 */
export const search = (query) => {
  const params = { ...query };
  return userModel.findOne(params).exec();
};

/* *
 * Searches for an existing task.
 * return{searched task}
 * param query
 */
export const searchUser = (query) => {
  const params = { ...query };
  return userModel.find(params).exec();
};

/* *
 * Searches for an existing task based on id.
 * return{searched task}
 * param id
 */
export const get = (id) => {
  const todo = userModel.findById(id).exec();
  return todo;
};

/* *
 * Authenticates an existing user
 * return{user}
 * param emailId
 */
export const userLogin = (emailId, password) => {
  const userLogin = userModel.find({ emailId: { $eq: emailId } });
  return userLogin;
};

/* *
 * Updates an existing task based on id.
 * return{updated task}
 * param updated task with id
 */
export const update = (updatedTodo) => {
  updatedTodo.lastModifiedDate = new Date();
  const todo = userModel
    .findByIdAndUpdate(updatedTodo.id, updatedTodo, {
      new: true,
    })
    .exec();
  return todo;
};

/* *
 * Updates an existing task values based on id.
 * return{updated task}
 * param updated task with id
 */
export const patchUpdate = (updatedPatchTodo) => {
  updatedPatchTodo.lastModifiedDate = new Date();
  const todo = userModel
    .findByIdAndUpdate(updatedPatchTodo.id, updatedPatchTodo, {
      new: true,
    })
    .exec();
  return todo;
};

/* *
 * Removes an existing task based on id.
 * param task id
 */
export const remove = (id) => {
  const todo = userModel.findByIdAndDelete(id).exec();
  return todo;
};

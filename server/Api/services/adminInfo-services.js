import AdminHelpModel from "../Models/adminInfo.js";
/* *
 * Creates a new to task.
 * return{saavedTodo}
 * param todo tasks
 */
export const save = (newEmail) => {
  const newMail = new AdminHelpModel(newEmail);
  return newMail.save();
};

/* *
 * Creates a new user.
 * return{savedUser}
 * param todo user
 */

export const saveMail = (sendMail) => {
  const newMail = new AdminHelpModel(sendMail);
  const a = newMail.save();
  
  return newMail;
};

/* *
 * Searches for an existing task.
 * return{searched task}
 * param query
 */
export const search = (query) => {
  const params = { ...query };
  return AdminHelpModel.findOne(params).exec();
};

/* *
 * Searches for an existing task.
 * return{searched task}
 * param query
 */
export const searchMail = (query) => {
  const params = { ...query };
  return AdminHelpModel.find(params).exec();
};

/* *
 * Searches for an existing task based on id.
 * return{searched task}
 * param id
 */
export const get = (id) => {
  const mail = AdminHelpModel.findById(id).exec();
  return mail;
};

/* *
 * Authenticates an existing user
 * return{user}
 * param emailId
 */

/* *
 * Updates an existing task based on id.
 * return{updated task}
 * param updated task with id
 */

/* *
 * Updates an existing task values based on id.
 * return{updated task}
 * param updated task with id
 */

/* *
 * Removes an existing task based on id.
 * param task id
 */
export const remove = (id) => {
  const mail = AdminHelpModel.findByIdAndDelete(id).exec();
  return mail;
};

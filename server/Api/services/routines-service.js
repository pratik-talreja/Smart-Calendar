import Task from "../Models/tasks.js";

export const save = async (newRoutine) => {
  let task = await Task.findOne({ userId: newRoutine.userId }).exec();

  if (task.length == 0) {
    task = new Task(newRoutine);
    return task.save();
  } else {
    const a = await Task.findByIdAndUpdate(task._id, newRoutine, {
      new: true,
    }).exec();
  }
};

export const addAfterDelete = async (newArray) => {
  let task = await Task.findOne({ userId: newArray.userId }).exec();
  await Task.findByIdAndUpdate(task._id, {
    routine: newArray.routine,
  }).exec();
};

export const get = async (userIdVal) => {
  const tasks = await Task.findOne({ userId: userIdVal }).exec();
  return tasks;
};

export const update = (id, updatedTask) => {
  const task = Task.findByIdAndUpdate(id, updatedTask).exec();
  return task;
};

export const remove = (id) => {
  Task.findByIdAndDelete(id).exec();
  return { Message: "Successfully Removed the item" };
};

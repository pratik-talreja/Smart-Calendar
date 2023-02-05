import Habit from "./../Models/habits.js";

export const save = (newHabit) => {
  const habitModel = new Habit(newHabit);
  return habitModel.save();
};

export const search = (query) => {
  const params = { ...query };
  return Habit.find(params).exec();
};

export const update = (updatedHabit) => {
  const habit = Habit.findByIdAndUpdate(updatedHabit.id, updatedHabit).exec();
  return habit;
};

export const get = async (userIdVal) => {
  let habits = await Habit.find({ userId: userIdVal }).exec();
  return habits;
};

export const remove = (id) => {
  const habit = Habit.findByIdAndDelete(id).exec();
  return habit;
}


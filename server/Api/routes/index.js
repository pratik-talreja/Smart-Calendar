import taskRouter from "./task-router.js";
import userRouter from "./user-router.js";
import habitsRouter from "./habits-router.js";
import routineRouter from "./routine-router.js";
import adminInfoRouter from "./adminInfo-router.js";

// Export Routes for Todo
export default (app) => {
  app.use("/", taskRouter);
  app.use("/", userRouter);
  app.use("/", habitsRouter);
  app.use("/", routineRouter);
  app.use("/", adminInfoRouter);
};

import express from "express";
import * as taskController from "../controllers/task-controller.js";

const router = express.Router();

//  API route to add new Task
router.route("/addTask").post(taskController.post);



router.route("/addAfterTask").post(taskController.postAfterDelete);

// API route to get all the tasks
router.route("/getTasks").post(taskController.getNotes);

//API route to update the task with given Id
router
  .route("/updateTask/:id")
  .put(taskController.update)
  .patch(taskController.partUpdate);

//API route to delete the task with given Id
router.route("/removeTask/:id").delete(taskController.remove);

export default router;

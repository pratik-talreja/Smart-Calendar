import express from "express";
import * as routineController from "../controllers/routine-controller.js";

const router = express.Router();

//  API route to add new Task
router.route("/addRoutine").post(routineController.post);

router.route("/addAfterRoutine").post(routineController.postAfterDelete);

// API route to get all the tasks
router.route("/getRoutines").post(routineController.getRoutines);

//API route to update the task with given Id
router
  .route("/updateRoutine/:id")
  .put(routineController.update)
  .patch(routineController.partUpdate);

//API route to delete the task with given Id
router.route("/removeRoutine/:id").delete(routineController.remove);

export default router;

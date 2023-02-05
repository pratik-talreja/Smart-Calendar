import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

// Routers for Todo to get and post
router.route("/tasks").post(userController.post).get(userController.index);

// Router to get user details
router.route("/user").get(userController.index);

// Router for Register to add new users
router.route("/register").post(userController.createUser);


// Router for User Authentication
router.route("/login").post(userController.login);

// Routers for Todo to get, update and delete based on id
router
  .route("/tasks/:id")
  .get(userController.get)
  .put(userController.update)
  .patch(userController.patchUpdate)
  .delete(userController.remove);

export default router;

// Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.
import express from "express";
import * as mailsController from "./../controllers/adminInfo-controller.js";

// Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.
const router = express.Router();

router.route("/sendmail").post(mailsController.post).get(mailsController.index);

router.route("/sendmail/toadmins").post(mailsController.contactsmail);

router.route("/sendmail/:id").get(mailsController.get);

export default router;

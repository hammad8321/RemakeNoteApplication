/* This code snippet is setting up a route for handling a POST request to "/signup" using the Express
framework in a TypeScript environment. It imports the necessary modules, such as the Express
framework and the user controller module. It then creates a router instance using `express.Router()`
and defines a POST route for "/signup" that will be handled by the `signUp` function from the
UserController module. Finally, it exports the router instance to be used in other parts of the
application. */
import express from "express";

import * as UserController from "../controllers/users"


const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup" ,  UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout" ,  UserController.logout );

export default router ;

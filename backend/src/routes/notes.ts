/* The TypeScript code snippet provided is setting up a router using Express. It imports a module
`NotesController` from "../controllers/notes" which is expected to contain functions for handling
notes-related operations. The router is then defined with various HTTP routes such as GET, POST,
PATCH, and DELETE for interacting with notes. Each route is associated with a corresponding function
from the `NotesController` module to handle the specific operation for that route. */
/* This TypeScript code snippet is setting up a router using Express. It imports a module
`NotesController` from "../controllers/notes" which likely contains functions for handling
notes-related operations. The router defines various HTTP routes such as GET, POST, PATCH, and
DELETE for interacting with notes. */
import * as NotesController from "../controllers/notes";
import express from "express";

const router = express.Router();

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNotes);

router.post("/", NotesController.createNote);

router.patch("/:noteId", NotesController.updateNote)

router.delete("/:noteId", NotesController.deleteNote)

export default router;

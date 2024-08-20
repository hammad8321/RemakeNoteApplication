// // // handler function

// // import { RequestHandler } from "express";
// // import NoteModel from "../models/note";
// // import createHttpError from "http-errors";
// // import mongoose from "mongoose";
// // import { assertIdDefined } from "../util/assertIdDefined";
// // //import { getAuthenticatedUser } from "./users";

// // export const getNotes: RequestHandler = async (req, res, next) => {
// //   const authenticatedUserId = req.session.userId;

// //   try {
// //     //throw createHttpError(401);
// //     //throw Error("Bazingao!");

// //     assertIdDefined(authenticatedUserId);

// //     const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
// //     res.status(200).json(notes);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const getNote: RequestHandler = async (req, res, next) => {
 

// //   const noteId = req.params.noteId;
// //   const authenticatedUserId = req.session.userId;

// //   try {
// //     assertIdDefined(authenticatedUserId);
// //     if (!mongoose.isValidObjectId(noteId)) {
// //       throw createHttpError(404, "invalid Note Id Buddy");
// //     }
// //     const note = await NoteModel.findById(noteId).exec();
// //     if (!note) {
// //       throw createHttpError(404, "No Note Buddy");
// //     }
// //     if (!note.userId.equals(authenticatedUserId)) {
// //       throw createHttpError(401, "You cannot acces this note ");
// //     }
// //     res.status(200).json(note);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // interface CreateNoteBody {
// //   title?: string;
// //   text?: string;
// // }

// // export const createNote: RequestHandler<
// //   unknown,
// //   unknown,
// //   CreateNoteBody,
// //   unknown
// // > = async (req, res, next) => {
// //   const title = req.body.title;
// //   const text = req.body.text;
// //   const authenticatedUserId = req.session.userId;

// //   try {
// //     assertIdDefined(authenticatedUserId);
// //     if (!title) {
// //       throw createHttpError(400, "Note without Title Buddy");
// //     }

// //     const newNote = await NoteModel.create({
// //       title: title,
// //       text: text,
// //     });
// //     res.status(201).json(newNote);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // interface UpdateNoteParams {
// //   noteId: string;
// // }

// // interface UpdateNoteBody {
// //   title?: string;
// //   text?: string;
// // }

// // export const updateNote: RequestHandler<
// //   UpdateNoteParams,
// //   unknown,
// //   UpdateNoteBody,
// //   unknown
// // > = async (req, res, next) => {
// //   const noteId = req.params.noteId;
// //   const newTitle = req.body.title;
// //   const newText = req.body.text;

// //   const authenticatedUserId = req.session.userId;

// //   try {
// //     assertIdDefined(authenticatedUserId);
// //     if (!mongoose.isValidObjectId(noteId)) {
// //       throw createHttpError(400, "Invaid ID myFriend");
// //     }

// //     if (!newTitle) {
// //       throw createHttpError(400, "Note without Title Buddy");
// //     }

// //     const note = await NoteModel.findById(noteId).exec();

// //     if (!note) {
// //       throw createHttpError(400, "Note not fornsdes");
// //     }

// //     if (!note.userId?.equals(authenticatedUserId)) {
// //       throw createHttpError(401, "no access to notes");
// //     }
// //     note.title = newTitle;
// //     note.text = newText;

// //     const updatedNote = await note.save();

// //     //NoteModel.findByIdAndUpdate

// //     res.status(200).json(updatedNote);
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // export const deleteNote: RequestHandler = async (req, res, next) => {
// //   const noteId = req.params.noteId;
// //   const authenticatedUserId = req.session.userId;

// //   try {
// //     assertIdDefined(authenticatedUserId);
// //     if (!mongoose.isValidObjectId(noteId)) {
// //       throw createHttpError(400, "Invaid ID myFriend");
// //     }
// //     const note = await NoteModel.findById(noteId).exec();
// //     if (!note) {
// //       throw createHttpError(404, "note not fond to delete");
// //     }

// // if(!note.userId?.equals(authenticatedUserId)){
// //   throw createHttpError(401, "Note not find")
// // }

// //     //await note.remove();
// //     await note.deleteOne();
// //     //NoteModel.findByIdAndDelete();

// //     res.sendStatus(204);

// //     NoteModel.findById;
// //   } catch (error) {
// //     next(error);
// //   }
// // };



// import { RequestHandler } from "express";
// import createHttpError from "http-errors";
// import mongoose from "mongoose";
// import NoteModel from "../models/note";
// import { assertIsDefined  } from "../util/assertIsDefined";

// export const getNotes: RequestHandler = async (req, res, next) => {
//     const /* `authenticatedUserId` is a variable that stores the user ID of the currently authenticated
//     user. It is used to ensure that the user performing actions such as getting, creating,
//     updating, or deleting notes is authenticated and authorized to perform those actions. This
//     helps in implementing access control and ensuring that users can only interact with their
//     own notes. */
//     authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
//         res.status(200).json(notes);
//     } catch (error) {
//         next(error);
//     }
// };

// export const getNote: RequestHandler = async (req, res, next) => {
//     const noteId = req.params.noteId;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(noteId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         const note = await NoteModel.findById(noteId).exec();

//         if (!note) {
//             throw createHttpError(404, "Note not found");
//         }

//         if (!note.userId?.equals(authenticatedUserId)) {
//             throw createHttpError(401, "You cannot access this note");
//         }

//         res.status(200).json(note);
//     } catch (error) {
//         next(error);
//     }
// };

// interface CreateNoteBody {
//     title?: string,
//     text?: string,
// }

// export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
//     const title = req.body.title;
//     const text = req.body.text;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!title) {
//             throw createHttpError(400, "Note must have a title");
//         }

//         const newNote = await NoteModel.create({
//             userId: authenticatedUserId,
//             title: title,
//             text: text,
//         });

//         res.status(201).json(newNote);
//     } catch (error) {
//         next(error);
//     }
// };

// interface UpdateNoteParams {
//     noteId: string,
// }

// interface UpdateNoteBody {
//     title?: string,
//     text?: string,
// }

// export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
//     const noteId = req.params.noteId;
//     const newTitle = req.body.title;
//     const newText = req.body.text;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(noteId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         if (!newTitle) {
//             throw createHttpError(400, "Note must have a title");
//         }

//         const note = await NoteModel.findById(noteId).exec();

//         if (!note) {
//             throw createHttpError(404, "Note not found");
//         }

//         if (!note.userId.equals(authenticatedUserId)) {
//             throw createHttpError(401, "You cannot access this note");
//         }

//         note.title = newTitle;
//         note.text = newText;

//         const updatedNote = await note.save();

//         res.status(200).json(updatedNote);
//     } catch (error) {
//         next(error);
//     }
// };


// export const deleteNote: RequestHandler = async (req, res, next) => {
//     const noteId = req.params.noteId;
//     const authenticatedUserId = req.session.userId;

//     try {
//         assertIsDefined(authenticatedUserId);

//         if (!mongoose.isValidObjectId(noteId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         const note = await NoteModel.findById(noteId).exec();

//         if (!note) {
//             throw createHttpError(404, "Note not found");
//         }

//         if (!note.userId.equals(authenticatedUserId)) {
//             throw createHttpError(401, "You cannot access this note");
//         }

//         await note.remove();

//         res.sendStatus(204);
//     } catch (error) {
//         next(error);
//     }
// };



import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import NoteModel from "../models/note";
import { assertIsDefined } from "../util/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        // if (!note.userId.equals(authenticatedUserId)) {
        //     throw createHttpError(401, "You cannot access this note");
        // }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        // if (!note.userId.equals(authenticatedUserId)) {
        //     throw createHttpError(401, "You cannot access this note");
        // }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        //  if (!note.userId.equals(authenticatedUserId)) {
        //      throw createHttpError(401, "You cannot access this note");
        //  }

        // await note.deleteOne();

    //  if (!note.equals(authenticatedUserId)) {
    //         throw createHttpError(401, "You cannot access this note");
    //      }

    //    await note.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};



import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note";
import { NoteInput } from "../network/notes_api";
import { useForm  } from "react-hook-form";
import * as NotesApi from "../network/notes_api";
import { TextField } from "@mui/material";
import TextInputField from "./form/TextInputField";


interface AddEditNoteDialogProps {
  noteToEdit?:Note,
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({ onDismiss, onNoteSaved,  noteToEdit }: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting },
  } = useForm<NoteInput>({
    defaultValues:{
      title:noteToEdit?.title || "",
      text :noteToEdit?.text || ""
    }
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse : Note ; 
      if(noteToEdit){
        noteResponse= await NotesApi.updateNote(noteToEdit._id , input)
      }else {
        noteResponse = await NotesApi.createNote(input);

      }
 
      onNoteSaved(noteResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <div>
      <Modal show onHide={onDismiss}>
        <Modal.Header>
          <Modal.Title> {noteToEdit ? "Edit noteb" : "Add Note"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        

          <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

          <TextInputField name="title" label="Title" type="text" placeholder ="Title" register={register} registerOptions={{required: "Required"}} error={errors.title}/>

          <TextInputField  name="text" label="Text" as="textarea" row={5} placeholder="Text" register={register}/>
       
          {/* <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group> */}


                    

                    {/* <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Text"
                            {...register("text")}
                        />
                    </Form.Group>
       */}

          {/* <TextInputField nam/>  */}
         
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddEditNoteDialog;

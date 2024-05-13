import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotesPage.module.css";
import stylesUtils from "../styles/utils.module.css";
import AddEditNoteDialog from "./AddEditNoteDialog";
import LoginModel from "./LoginModel";
import Note from "./Note";
import SignUpModal from "./SignUpModel";

interface Props {}

const NotesPageLoggedInView: React.FC<Props> = (props) => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>();
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, []);

  const notesGrid = (
    <Row xs={1} md={2} xl={4} className={`g-4  ${styles.notesGrid} `}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            className={styles.note}
            onNoteClicked={setNoteToEdit}
            onDeleteNoteClick={deleteNote}
          />
        </Col>
      ))}
      {/* // {JSON.stringify(notes)} */}
    </Row>
  );

  return (
    <div>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus /> Add new Note{" "}
      </Button>

      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p> Something went Wrong Please Refresh</p>}
      {!notesLoading && !showNotesLoadingError && (
        <> {notes.length > 0 ? notesGrid : <p>You Dont have notes yet </p>} </>
      )}

      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updateNote._id ? updateNote : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </div>
  );
};

export default NotesPageLoggedInView;
function setState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}


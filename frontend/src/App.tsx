import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "../src/styles/global.css";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "../src/components/Note";
import styles from "../src/styles/NotesPage.module.css";
import stylesUtils from "../src/styles/utils.module.css";
import { FaPlus } from "react-icons/fa";
import * as NotesApi from "../src/network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading,setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>();
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false)
        setNotesLoading(true)
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
       setShowNotesLoadingError(true)
      }finally{
        setNotesLoading(false)
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid= <Row xs={1} md={2} xl={4} className={`g-4  ${styles.notesGrid} `}>   
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


  return (
    <Container className="styles.notesPage">
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus /> Add new Note{" "}
      </Button>
      {notesLoading && <Spinner animation='border' variant='primary'/>}
     { showNotesLoadingError && <p> Something went Wrong Please Refresh</p>}
     {!notesLoading && !showNotesLoadingError && <> {notes.length >0 ? notesGrid : <p>You Dont have notes yet </p> } </>}
      
      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
          }}
        />
      )}
      {noteToEdit && 
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {setNotes(notes.map(existingNote => existingNote._id=== updateNote._id ? updateNote :existingNote));
            setNoteToEdit(null);
          }}
              />
        }
    </Container>
  );

}
export default App;
function setState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}

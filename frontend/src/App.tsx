import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "../src/styles/global.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "../src/components/Note";
import styles from "../src/styles/NotesPage.module.css";
import stylesUtils from "../src/styles/utils.module.css";
import { FaPlus } from "react-icons/fa";
import * as NotesApi from "../src/network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>();
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
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

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus /> Add new Note{" "}
      </Button>
      <Row xs={1} md={2} xl={4} className="g-4">
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

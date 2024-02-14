import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "../src/styles/global.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "../src/components/Note";
import styles from "../src/styles/NotesPage.module.css";
import stylesUtils from "../src/styles/utils.module.css";

import * as NotesApi from "../src/network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
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

  return (
    <Container>
      <Button
      className={`mb-4 ${stylesUtils.blockCenter}`}
      onClick={() => setShowAddNoteDialog(true)}> Add new Note </Button>
      <Row xs={1} md={2} xl={4} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
        {/* // {JSON.stringify(notes)} */}
      </Row>

      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote)=>{setNotes([...notes, newNote ])}}
       
        />
      )}
    </Container>
  );
}

export default App;
function setState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}

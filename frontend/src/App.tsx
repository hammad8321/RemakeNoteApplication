import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "../src/styles/global.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "../src/components/Note";
import styles from "../src/styles/NotesPage.module.css"

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
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
      <Row xs={1} md={2} xl={4} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note}/>
          </Col>
        ))}
        {/* // {JSON.stringify(notes)} */}
      </Row>
    </Container>
  );
}

export default App;
function setState(arg0: number): [any, any] {
  throw new Error("Function not implemented.");
}

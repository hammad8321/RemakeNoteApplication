import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
  className?: string;
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatesText: string;
  if (updatedAt > createdAt) {
    createdUpdatesText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatesText = "Created: " + formatDate(createdAt);
  }
  return (
    <div>
      <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text className={styles.noteText}>{note.text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatesText}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;

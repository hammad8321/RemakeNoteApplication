import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";

interface NoteProps {
  note: NoteModel;
  className?: string,
}

const Note = ({ note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatesText:string;
  if(updatedAt>createdAt){
    
  }
  return (
    <div>
      <Card className={`${styles.noteCard} ${className}`}>
        <Card.Body className={styles.cardBody}>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text className={styles.noteText}>{note.text}</Card.Text>
          
        </Card.Body>
        <Card.Footer className="text-muted">{createdAt}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;

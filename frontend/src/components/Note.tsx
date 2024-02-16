import React from "react";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClick: (note: NoteModel) => void;
  className?: string;
}

const Note = ({ note, className, onDeleteNoteClick , onNoteClicked}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatesText: string;
  if (updatedAt > createdAt) {
    createdUpdatesText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatesText = "Created: " + formatDate(createdAt);
  }
  return (
    <div>
      <Card className={`${styles.noteCard} ${className}`} onClick={()=>onNoteClicked(note)}>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styleUtils.flexCenter}>
            {title}
            <MdDelete
              className="text-muted ms-auto"
              onClick={(e) => {
                onDeleteNoteClick(note);
                e.stopPropagation();
              }}
            />
          </Card.Title>
          <Card.Text className={styles.noteText}>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatesText}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;

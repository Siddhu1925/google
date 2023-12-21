// Note.js
import React, { useState } from 'react';
import './App.css';

const Note = ({ index, note, editNote, deleteNote }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);

  const handleEdit = () => {
    editNote(index, editedNote);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedNote(note);
    setEditing(false);
  };

  return (
    <div className="note" style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          />
          <div className="note-actions">
            <button onClick={handleEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note-actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;

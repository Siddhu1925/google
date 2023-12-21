// App.js
import React, { useState, useEffect } from 'react';
import Note from './Note';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  });
  const [newNote, setNewNote] = useState({ title: '', content: '', color: '#ffffff' });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNote.title.trim() !== '' || newNote.content.trim() !== '') {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setNewNote({ title: '', content: '', color: '#ffffff' });
    }
  };

  const editNote = (index, updatedNote) => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[index] = updatedNote;
      return newNotes;
    });
  };

  const deleteNote = (index) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="app">
      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        /><br></br><br></br>
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <br></br>
        <input
          type="color"
          value={newNote.color}
          onChange={(e) => setNewNote({ ...newNote, color: e.target.value })}
        /><br></br>
        <button onClick={addNote}>Add Note</button>
      </div>
      <div className="note-list">
        {notes.map((note, index) => (
          <Note
            key={index}
            index={index}
            note={note}
            editNote={editNote}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

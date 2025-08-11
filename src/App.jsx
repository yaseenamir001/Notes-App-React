import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Popup from "./components/Popup";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      text,
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    closePopup();
  };

  const editNote = (id, newText) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
    closePopup();
  };

  const openPopup = (id, mode) => {
    setCurrentNoteId(id);
    setPopupMode(mode);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMode("");
    setCurrentNoteId(null);
  };

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center px-3 app-background">
        <div className="p-4 rounded-5 shadow-sm border border-dark w-100 app-container">
          <h1 className="text-center mb-4 fw-bold">📝 Notes App</h1>
          <NoteForm onAdd={addNote} />
          <div className="my-3">
            <NoteList notes={notes} onAction={openPopup} />
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup
          mode={popupMode}
          note={notes.find((n) => n.id === currentNoteId)}
          onDelete={() => deleteNote(currentNoteId)}
          onEdit={(newText) => editNote(currentNoteId, newText)}
          onClose={closePopup}
        />
      )}
    </>
  );
}

export default App;

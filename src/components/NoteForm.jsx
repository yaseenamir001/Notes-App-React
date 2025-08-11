import { useState } from "react";

function NoteForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <textarea
          className="form-control border border-light rounded-3 scrollbar note-textarea"
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="4"
        />
      </div>
      <button className="btn btn-sm btn-info px-4 rounded-3 shadow-sm">
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;

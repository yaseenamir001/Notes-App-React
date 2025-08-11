function NoteList({ notes, onAction }) {
  if (!Array.isArray(notes)) {
    return <p className="text-danger">Error: Notes is not an array.</p>;
  }

  if (notes.length === 0) {
    return (
      <p className="text-center text-muted text-white-50">
        No notes yet. Add one!
      </p>
    );
  }

  return (
    <div className="overflow-auto scrollbar note-list-container">
      {notes.map((note) => (
        <div key={note.id} className="card border-1 shadow-sm mb-3 note-card">
          <div className="card-body d-flex flex-column">
            <p className="mb-0 note-text">{note.text}</p>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn btn-sm btn-info me-2 text-white"
                onClick={() => onAction(note.id, "edit")}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onAction(note.id, "delete")}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;

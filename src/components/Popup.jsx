import { useState, useEffect } from "react";

function Popup({ mode, note, onDelete, onEdit, onClose }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (mode === "edit" && note?.text) {
      setText(note.text);
    }
  }, [note, mode]);

  if (!note) return null;

  return (
    <div className="modal fade show d-block popup-overlay" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header border-secondary">
            <h5 className="modal-title">
              {mode === "delete" ? "Delete Note" : "Edit Note"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {mode === "delete" ? (
              <p>Are you sure you want to delete this note?</p>
            ) : (
              <textarea
                className="form-control"
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            )}
          </div>
          <div className="modal-footer border-secondary">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            {mode === "delete" ? (
              <button className="btn btn-danger" onClick={onDelete}>
                Delete
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() => {
                  if (text.trim()) onEdit(text);
                }}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteContent.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:4000/api/notes", {noteTitle, noteContent});

      setNoteTitle("");
      setNoteContent("");

      alert("Note added successfully!");
      navigate("/notes");
    } catch (error) {
      console.error("Failed to add note:", error);
      alert("Failed to add note. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col mt-8">
        <h3 className="text-2xl font-bold">Add Note</h3>
      <input
      className="m-8 border"
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Enter note title"
      />

      <textarea
      className="mt-4 border"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        placeholder="Enter note content"
      />

      <button className="mt-4 bg-blue-500 p-3 rounded-lg text-white" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Add Note"}
      </button>
    </form>
  );
};

export default AddNote;

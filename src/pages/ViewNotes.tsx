import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Note {
    id: number;
    title: string;
    content: string;
}

const ViewNotes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/notes');
                setNotes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        fetchNotes();
    }, []);

    const handleEdit = (note: Note) => {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
    };

    const handleSave = async (id: number) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/notes/${id}`, {
                title: editTitle,
                content: editContent,
            });
            setNotes(notes.map((note) => (note.id === id ? response.data : note)));
            setEditingId(null);
            setEditTitle("");
            setEditContent("");
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:4000/api/notes/${id}`);
            setNotes(notes.filter((note) => note.id !== id));
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <p>Loading....</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mx-auto">Saved Notes</h1>
            <ul className="mt-4">
                {notes.map((note) => (
                    <li key={note.id} className="mb-4 p-4 border border-gray-300 rounded bg-gray-50">
                        {editingId === note.id ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full px-2 py-1 border rounded"
                                    placeholder="Title"
                                />
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full px-2 py-1 border rounded"
                                    placeholder="Content"
                                    rows={3}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSave(note.id)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold">{note.title}</h2>
                                    <p className="text-gray-600">{note.content}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(note)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Link to="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                New Note
            </Link>
        </div>
    );
};

export default ViewNotes;
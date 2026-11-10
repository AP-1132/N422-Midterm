import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useEntries} from "../context/EntryContext.jsx"

export default function EntryForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const { entries, loading, addEntry, editEntry } = useEntries();
    const navigate = useNavigate();
    const [body, setBody] = useState("");
    const [error, setError] = useState(null);

    const existing = entries.find((entry) => entry.id === Number(id));
    useEffect(() => {
        if (existing) {
            setBody(existing.body);
        }
    }, [existing]);

async function handleSubmit(e) {
    e.preventDefault();
    try {
        if (isEdit) await editEntry(Number(id), { body });
        else await addEntry({ body });
        navigate("/");
    } catch (err) {
        setError(err);
    }
}

if (isEdit && loading) return <p>Loading...</p>;
if (isEdit && !existing) return <p>Entry not found.</p>;

return (
    <div>
        <h2>{isEdit ? "Edit Entry" : "New Entry"}</h2>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <form onSubmit={handleSubmit}>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your entry here..."
                rows={10}
                cols={50}
            />
            <br />
            <button type="submit">{isEdit ? "Update" : "Create"}</button>
        </form>
    </div>
);
}
import {Link} from "react-router-dom"
import {useEntries} from "../context/EntryContext.jsx"

export default function EntryItem({entry}) {
    const { removeEntry } = useEntries();

return (
    <div className="entry-item">
        <p className="entry-body">{entry.body}</p>
        <div className="entry-meta">
            <small>Created: {new Date(entry.createdAt).toLocaleString()}</small>
            <small>Updated: {new Date(entry.updatedAt).toLocaleString()}</small>
            {entry.error && <small className="entry-error">Error: {entry.error}</small>}
        </div>
        <div className="entry-actions">
            <Link className="btn btn-secondary" to={`/entries/${entry.id}`}>Edit</Link>
            <button onClick={() => removeEntry(entry.id)} className="btn btn-danger">Delete</button>
        </div>
    </div>
);
}
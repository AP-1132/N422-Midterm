import { useEntries } from "../context/EntryContext.jsx";
import EntryItem from "../components/EntryItem.jsx";

export default function EntryList() {
    const { entries, loading, error } = useEntries();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Could not load entries: {error.message}</p>;

    return (
        <div>
            {entries.length === 0 ? (
                <p>No entries found. Add one to get started.</p>
            ) : (
                entries.map((entry) => <EntryItem key={entry.id} entry={entry} />)
            )}
        </div>
    );
}
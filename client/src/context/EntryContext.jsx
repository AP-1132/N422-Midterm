import { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api.js";

const EntryContext = createContext(null);

export function EntryProvider({ children }) {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.getEntries()
            .then(setEntries)
            .catch((err)=> setError(err))
            .finally(() => setLoading(false));
    }, []);

    async function addEntry(data) {
        const created = await api.createEntry(data);
        setEntries((prev) => [created, ...prev]);
    }

    async function editEntry(id, data) {
        const updated = await api.updateEntry(id, data);
        setEntries((prev) =>prev.map((entry) => (entry.id === id ? updated : entry)));
    }

    async function removeEntry(id) {
        await api.deleteEntry(id);
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
    }

    const value = {
        entries,
        loading,
        error,
        addEntry,
        editEntry,
        removeEntry,
    };
    
    return (
        <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
    );
}

export function useEntries() {
    return useContext(EntryContext);
}
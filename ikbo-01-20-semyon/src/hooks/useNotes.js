import {useMemo} from "react";


export const useNotes = (notes, query) => {
    return useMemo(() => {
        return notes.filter(note => {
            return note.title.toLowerCase().includes(query.toLowerCase())
                || note.content.toLowerCase().includes(query.toLowerCase())
        });
    }, [notes, query]);
}
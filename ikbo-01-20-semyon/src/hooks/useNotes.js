import {useMemo} from "react";


export const useNotes = (notes, query) => {
    const searchedNotes = useMemo(() => {
        return notes.filter(note => {
            return note.title.toLowerCase().includes(query.toLowerCase())
                || note.content.toLowerCase().includes(query.toLowerCase())
        });
    }, [notes, query])

    return searchedNotes;
}
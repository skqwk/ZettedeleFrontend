
const createNoteOperation = (payload, note) => {
    console.log('createNoteOperation');
    note.name = payload.name;
    note.id = payload.systemName;
    note.head = null;
    console.log(note);
}

const createParagraphOperation = (payload, note) => {
    console.log('createParagraphOperation');
    console.log(note.paragraphs);
    let paragraph = {
        insertKey: payload.happenAt,
        deleteKey: payload.happenAt,
        content: payload.content,
        next: null
    };

    let prevParagraph;

    if (payload.insertKey !== null) {
        prevParagraph = note.paragraphs[payload.insertKey];
        console.log('Find prevParagraph:');
        console.log(prevParagraph);
    }

    if (payload.insertKey === null) {
        console.log('INSERT HEAD');
        console.log(note.head);
        if (note.head === null || note.head.localeCompare(paragraph.insertKey) < 0) {
            if (note.head !== null) {
                paragraph.next = note.head;
            }
            note.head = paragraph.insertKey;
            note.paragraphs[paragraph.insertKey] = paragraph;
            return;
        } else {
            prevParagraph = note.paragraphs[note.head];
        }
    }

    while (prevParagraph.next !== null &&
    paragraph.insertKey.localeCompare(note.paragraphs[prevParagraph.next].insertKey) < 0) {
        prevParagraph = note.paragraphs[prevParagraph.next];
    }

    paragraph.next = prevParagraph.next;
    prevParagraph.next = paragraph.insertKey;
    note.paragraphs[paragraph.insertKey] = paragraph;
}

const updateParagraphOperation = (payload, note) => {
    console.log('updateParagraphOperation');
    let paragraph = note.paragraphs[payload.updateKey];
    if (paragraph.content === null) {
        return;
    }

    if (payload.happenAt.localeCompare(paragraph.deleteKey) < 0) {
        return;
    }

    paragraph.content = payload.content;
    paragraph.deleteKey = payload.happenAt;
}

const removeParagraphOperation = (payload, note) => {
    console.log('removeParagraphOperation');
    let paragraph = note.paragraphs[payload.deleteKey];
    if (paragraph === null || paragraph === undefined) {
        console.log(`No such paragraph in note with key = ${payload.deleteKey}`);
    }

    if (paragraph.content != null) {
        paragraph.content = null;
        paragraph.deleteKey = payload.happenAt;
    }
}

export class ParagraphRGA {
    static eventMap = {
        'CREATE_NOTE': createNoteOperation,
        'CREATE_PARAGRAPH': createParagraphOperation,
        'UPDATE_PARAGRAPH': updateParagraphOperation,
        'REMOVE_PARAGRAPH': removeParagraphOperation,
    }

    static applyEvent(event, note) {
        const operation = this.eventMap[event.event];
        const params = {...event.payload, happenAt: event.happenAt}
        operation(params, note);
    }
}



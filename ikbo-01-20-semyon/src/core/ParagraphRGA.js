const createNoteOperation = (payload, note) => {
    console.log('createNoteOperation');
    note.title = '';
    note.id = payload.id;
    note.head = null;
    note.deleted = false;
    note.createdAt = payload.createdAt;
    note.color = 'white';
    note.links = new Set();
}


const removeNoteOperation = (payload, note) => {
    console.log('removeNoteOperation');
    note.deleted = true;
}

const updateNoteOperation = (payload, note) => {
    console.log('updateNoteOperation');
    let field = Object.keys(payload)[0];
    let value = Object.values(payload)[0]
    note[field] = value;
}

const addLinkNoteOperation = (payload, note) => {
    console.log('addLinkNoteOperation');
    note.links.add(payload.link);
}

const removeLinkNoteOperation = (payload, note) => {
    console.log('removeLinkNoteOperation');
    note.links.delete(payload.link);
}

const createParagraphOperation = (payload, note) => {
    console.log('createParagraphOperation');
    let paragraph = {
        insertKey: payload.happenAt,
        deleteKey: payload.happenAt,
        content: payload.content,
        next: null
    };

    let prevParagraph;

    if (payload.insertKey !== null) {
        prevParagraph = note.paragraphs[payload.insertKey];
    }

    if (payload.insertKey === null) {
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
        'UPDATE_NOTE': updateNoteOperation,
        'REMOVE_NOTE': removeNoteOperation,
        'CREATE_PARAGRAPH': createParagraphOperation,
        'UPDATE_PARAGRAPH': updateParagraphOperation,
        'REMOVE_PARAGRAPH': removeParagraphOperation,
        'ADD_LINK_NOTE': addLinkNoteOperation,
        'REMOVE_LINK_NOTE': removeLinkNoteOperation
    }

    static applyEvent(event, note) {
        const operation = this.eventMap[event.event];
        const params = {...event.payload, happenAt: event.happenAt}
        operation(params, note);
    }
}



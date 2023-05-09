export class Mapper {
    static rgaNoteToDomainNote(note) {
        note.paragraphs = Object.fromEntries(
            Object.entries(note.paragraphs)
                .map(paragraphEntry => [paragraphEntry[0], this.rgaParagraphToDomainParagraph(paragraphEntry[1])]));
        return note;
    }

    static rgaParagraphToDomainParagraph = (paragraph) => {
        return {
            id: paragraph.insertKey,
            content: paragraph.content,
            next: paragraph.next
        }
    }
}
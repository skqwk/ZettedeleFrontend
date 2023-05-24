export const getParagraphs = (formNote) => {
    console.log(formNote);

    const paragraphsMap = formNote.paragraphs;
    let nowParagraph = paragraphsMap[formNote.head];
    let paragraphs = [];
    while (nowParagraph) {
        paragraphs.push(nowParagraph);

        nowParagraph = nowParagraph.next
            ? paragraphsMap[nowParagraph.next]
            : null
    }

    return paragraphs.filter(p => p.content != null);
}
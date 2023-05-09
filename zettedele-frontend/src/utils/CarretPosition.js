function createCopy(textArea) {
    let copy = document.createElement('div');
    copy.textContent = textArea.value;
    let style = getComputedStyle(textArea);
    [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'wordWrap',
        'whiteSpace',
        'borderLeftWidth',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
    ].forEach(function(key) {
        copy.style[key] = style[key];
    });
    copy.style.overflow = 'auto';
    copy.style.width = textArea.offsetWidth + 'px';
    copy.style.height = textArea.offsetHeight + 'px';
    copy.style.position = 'absolute';
    copy.style.left = textArea.offsetLeft + 'px';
    copy.style.top = textArea.offsetTop + 'px';
    document.body.appendChild(copy);
    return copy;
}

export function getCaretPosition(textArea) {
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let copy = createCopy(textArea);
    let range = document.createRange();
    range.setStart(copy.firstChild, start);
    range.setEnd(copy.firstChild, end);
    let selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    let rect = range.getBoundingClientRect();
    document.body.removeChild(copy);
    textArea.selectionStart = start;
    textArea.selectionEnd = end;
    textArea.focus();
    return {
        x: rect.left - textArea.scrollLeft,
        y: rect.top - textArea.scrollTop
    };
}
export const toJson = (message) => {
    return `\n${JSON.stringify(message)}\r`
}

export const fromJson = (message) => {
    return JSON.parse(message);
}

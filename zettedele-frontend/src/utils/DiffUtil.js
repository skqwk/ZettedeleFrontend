export const diff = (o1, o2) => {
    return Object.keys(o2).reduce((diff, key) => {
        if (o1[key] === o2[key]) return diff
        return {
            ...diff,
            [key]: o2[key]
        }
    }, {})
}

export const containsKey = (key, object) => {
    return (key in object)
        && (object[key] !== null)
        && (object[key] !== undefined);
}
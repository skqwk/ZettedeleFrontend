export const optimizeUpdates = (creates, updates, removes) => {
    // Это все работало бы, если бы в основе был не связный список
    // - нельзя отбрасывать созданные элементы, т.к. возможно они были ссылкой для других
    // - задаток на дальнейшую оптимизацию
    //
    // // Если параграф был создан во время сессии, а потом удален
    // // - можно не записывать в файл
    // let filteredCreateEvents = Object.keys(creates)
    //     .filter(id => !(id in removes))
    //     .map(id => creates[id]);
    //
    // // Если параграф был обновлен во время сессии, а потом удален
    // // - информацию об обновлении можно не записывать в файл
    // let filteredUpdateEvents = Object.keys(updates)
    //     .filter(id => !(id in removes))
    //     .map(id => updates[id]);
    //
    // let filteredRemoveEvents = Object.keys(removes)
    //     .filter(id => !(id in creates))
    //     .map(id => removes[id]);
    //
}
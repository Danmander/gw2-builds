
/**
 * Collects items until no new items were added in a certain period, after which a function will be called with the collected items.
 * 
 * @param {Number} wait Time to wait in ms
 * @param {(Array) => void} callback Time to wait in ms
 */
function debouncedBatch(callback, wait) {
    let timeout = null;
    let items = [];

    return function (item) {
        items.push(item);

        // Interrupt the current execution of the callback
        clearTimeout(timeout); 

        timeout = setTimeout(() => {
            callback(items);

            // Reset the state of the batch so the state can be used again
            timeout = null;
            items = [];
        }, wait);
    }
}

export { debouncedBatch }
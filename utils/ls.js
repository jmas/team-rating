// LocalStorage

const LS_KEY = 'team_rating';

/**
 * @param what
 * @returns {string}
 */
export function makeKey (what) {
    return LS_KEY + '_' + what;
}

/**
 * @param what
 * @returns {Array}
 */
export function get (what) {
    let serializedData = window.localStorage.getItem(makeKey(what));
    let items = [];
    if (! serializedData) {
        return items;
    }
    try {
        items = JSON.parse(serializedData);
    } catch (e) {
        console.warn(e);
    }
    if (! (items instanceof Array)) {
        throw new TypeError('Stored data should be an Array.');
    }
    return items;
}

/**
 * @param what
 * @param item
 */
export function add (what, item) {
    let items = get(what);
    items.push(item);
    replace(what, items);
}

/**
 * @param what
 * @param items
 */
export function replace (what, items) {
    if (! (items instanceof Array)) {
        throw new TypeError('`items` should be an Array.');
    }
    window.localStorage.setItem(makeKey(what), JSON.stringify(items));
}

/**
 * @param what
 * @param index
 */
export function remove (what, index) {
    if (! index instanceof Number) {
        throw new TypeError('`index` should be an Number.');
    }
    let items = get(what);
    if (items[index]) {
        items.splice(index, 1);
    }
    replace(what, items);
}

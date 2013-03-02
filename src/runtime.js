var resolve = require('resolvr').resolve;

module.exports = {
    each:       each,
    resolve:    resolve,
    addToPath:  addToPath
};

/**
 * Iterate over an object or array
 * - included in runtime
 *
 * @param obj
 * @param iterator
 */
function each (obj, iterator) {
    if (!obj) return;
    if (obj instanceof Array) {
        for (var i = 0; i < obj.length; i++) {
            iterator(i, obj[i]);
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                iterator(key, obj[key]);
            }
        }
    }
}

/**
 * Extends the path
 *
 * @param path
 * @param part
 * @return {String}
 */
function addToPath (path, part) {
    path = String(path);
    part = String(part);
    if (path === '' && part === '') {
        return '.';
    }
    if (part === '.' || part === '') {
        return path;
    }
    return path ? path + '.' + part : part;
}
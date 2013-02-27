var helper = require('./helper');

/**
 * Some bundled macros
 */
module.exports = {

    /**
     * Resolves a value
     * for example:
     * {.pages[3].title} or also just {.}
     *
     * @param tree
     * @return {String}
     */
    '.': function (tree) {
        var path = helper.parsePath(tree);
        return '__out.push(resolve(addToPath(path, "' + path + '"), data));';
    },

    /**
     * Moves down in path
     * {-> person.name {path}} -> person.name
     * @param tree
     * @param transform
     * @return {String}
     */
    '->': function (tree, transform) {
        var path = helper.parsePath(tree);
        return helper.keepPath(
            'path = addToPath(path, "' + path + '");\n' +
                helper.transformTree(tree, transform) + '\n'
        );
    },

    /**
     * Checks if a path exists
     * for example:
     * {has title <h1>{. title}</h1>}
     *
     * @param tree
     * @param transform
     * @return {String}
     */
    has: function (tree, transform) {
        var path = helper.parsePath(tree);
        return  'if (typeof resolve(addToPath(path, "' + path + '"), data) !== "undefined") {\n' +
            helper.transformTree(tree, transform) + '\n' +
            '}';
    },

    /**
     * Iterates over an array or object
     * for example:
     * <ul>
     *  {each pages
     *    <li>{. title}</li>
     *  }
     * </ul>
     *
     * @param tree
     * @param transform
     * @return {String}
     */
    each: function (tree, transform) {
        var path = helper.parsePath(tree);
        return helper.keepPath(
            'path = addToPath(path, "' + path + '");\n' +
                'each(resolve(path, data), function (__itemPath) {' +
                helper.keepPath('path = addToPath(path, __itemPath);' + helper.transformTree(tree, transform)) + '\n' +
                '});'
        );
    },

    /**
     * Outputs the current path
     * for example:
     * {each foo {path bar} } -> foo.0.bar foo.1.bar
     * @param tree
     * @return {String}
     */
    path: function (tree) {
        var path = helper.parsePath(tree);
        return '__out.push(addToPath(path, "' + path + '"));';
    },

    /**
     * Output ast, for internal use
     */
    out: function (tree, transform) {
        return helper.transformTree(tree, transform);
    },

    /**
     * Calls a user defined function
     */
    fn: function (tree) {
        var fnName = helper.parsePath(tree);
        return '__out.push(options.fn.' + fnName + '(path, data));';
    }
};
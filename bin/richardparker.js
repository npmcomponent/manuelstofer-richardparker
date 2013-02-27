#!/usr/bin/env node
'use strict';
var program     = require('commander'),
    template    = require('..'),
    fs          = require('fs'),
    walk        = require('walk'),
    each        = require('../runtime').each;

program
    .version(require('../package.json').version)
    .usage('[options] <path>')
    .option('-a, --amd',        'compile as amd module')
    .option('-o, --out [file]', 'write compiled template to file')
    .parse(process.argv);

var path    = program.args[0].toString().replace(/\/$/, '');

try {
    var stats = fs.lstatSync(path);

    if (stats.isDirectory()) {
        createDirectoryModule(path);
    } else {
        createSingleTemplateModule(path);
    }

} catch (e) {
    console.log(e);
    console.log(program.help());
}


/**
 * Compiles a template file into a sting
 *
 * @param path
 * @return {String}
 */
function compileFile (path) {
    var contents = fs.readFileSync(path).toString();
    return template.compile(contents).toString();
}

/**
 * Outputs a single template as a common js module
 *
 * @param path
 */
function createSingleTemplateModule(path) {
    var templateFn = compileFile(path);
    output(
        program.amd ?
        'define(function () {\n return ' + templateFn + '; \n});\n' :
        'module.exports = ' + templateFn + ''
    );
}

/**
 * Outputs all templates of a directory as common js module (recursive)
 *
 * @param {String} path
 */
function createDirectoryModule (path) {
    var walker = walk.walk(path, {}),
        templates = {};

    walker.on('file', function (root, fileStats, next) {
        var relativePath = fileStats.name,
            relativeRoot = root.substr(path.length + 1),
            realPath     = root + '/' + relativePath;
        if (relativeRoot) {
            relativePath = relativeRoot + '/' + relativePath;
        }

        templates[relativePath] = compileFile(realPath);
        next();
    });

    walker.on('end', function () {
        var out = 'module.exports = {',
            first = true;

        each(templates, function (path, templateFn) {
            out += (first ? '' : ',') + '\n"' + path + '": ' + templateFn;
            first = false;
        });

        out += '};'
        output(out);
    });
}

/**
 * Outputs to stdout or file
 *
 * @param {String} compiled
 */
function output (compiled) {
    if (program.out) {
        fs.writeFileSync(program.out, compiled);
    } else {
        process.stdout.write(compiled);
    }
}


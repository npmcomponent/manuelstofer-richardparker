#!/usr/bin/env node
'use strict';
var program     = require('commander'),
    template    = require('..'),
    fs          = require('fs');

program
    .version(require('../package.json').version)
    .usage('[options] <file>')
    .option('-a, --amd',        'compile as amd module')
    .option('-o, --out [file]', 'write compiled template to file')
    .parse(process.argv);

var templateFile    = program.args[0];

if (!templateFile || !fs.existsSync(templateFile)) {
    console.log(program.help());
}

var contents        = fs.readFileSync(templateFile).toString(),
    templateFn      = template.compile(contents).toString(),
    compiled        = program.amd ?
        'define(function () {\n return ' + templateFn + '; \n});\n' :
        'module.exports = ' + templateFn + '';

if (program.out) {
    fs.writeFileSync(program.out, compiled);
} else {
    process.stdout.write(compiled);
}


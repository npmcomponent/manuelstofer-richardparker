/*global describe, it*/
if (typeof parker == 'undefined') {
    var parker  = require('..'),
        chai    = require('chai');
}

var render  = parker.render,
    compile = parker.compile;

chai.should();

describe('.', function () {

    it('should display a attribute', function () {
        var tiger = {name: 'richard parker'};
        render('they call me {. name}', tiger).should.equal('they call me richard parker');
    });

    it('should display an element of an array', function () {
        var site = {pages: ['about', 'news']};
        render('{. pages.1}', site).should.equal('news');
    });
});

describe('has', function () {

    it('should render when attribute is set', function () {
        var tiger = {name: 'richard parker'};
        render('{has name hello {. name}}', tiger).should.equal('hello richard parker');
    });

    it('should not render when attribute is not set', function () {
        var tiger = {};
        render('{has name hello richard}', tiger).should.equal('');
    });

    it('should not render when attribute is set but falsey', function () {
        var tiger = {name: false};
        render('{has name does render}', tiger).should.equal('');
    });
});

describe('path', function () {
    var site = {bar: [{foo: 3}]};

    it('should output . for root', function () {
        render('{path}', site).should.equal('.');
    })

    it('should output the correct path when called without each', function () {
        render('{path bar}', site).should.equal('bar');
    });

    it('path should output the current path in the data structure', function () {
        render('{each bar {path foo}}', site).should.equal('bar.0.foo');
    });
});

describe('each', function () {

    it('should iterate over an array', function () {
        var site = {pages: ['about', 'news']};
        render('{each pages {.} }', site).should.equal('about news ');
    });

    it('should iterate over an object', function () {
        var richard = {foo: {name: 'richard parker', age: 12}};
        render('{each foo {.} }', richard).should.equal('richard parker 12 ');
    });

    it('should iterate over the root attributes of an object', function () {
        var richard = {name: 'richard parker', age: 12};
        render('{each . {.} }', richard).should.equal('richard parker 12 ');
    });
});

describe('->', function () {

    describe('move down in path', function () {
        var site = {person: {name: 'Thirsty'}};

        it('should resolve to the correct path', function () {
            render('{-> person.name {path}}', site).should.equal('person.name');
        });

        it('should resolve the correct value', function () {
            render('{-> person {. name}}', site).should.equal('Thirsty');
        });

        it('should resolve the correct values for {.}', function () {
            render('{-> person.name {.}}', site).should.equal('Thirsty');
        });
    });
});

describe('compile', function () {

    it('should return a template as javascript function', function () {
        var template = compile('{path example}');
        template({}).should.equal('example');
    });
});

describe('fn', function () {

    describe('call a user defined function', function () {
        var options = {
            fn: {
                example1:  function () { return 'expected-output'; },
                example2: function (path, data) {
                    return path + data.foo
                }
            }
        }

        it('should get the path and data', function () {
            var template = compile('{fn example1}', {});
            template({}, options).should.equal('expected-output');
        });

        it('should render the output of the function', function () {
           var template = compile('{-> expected- {fn example2}}', {});
           template({foo: 'output'}, options).should.equal('expected-output');
        });



    });
});

describe('macros', function () {

    it('can add custom macro', function () {
        var macro = {
            'custom-macro': function () {
                return parker.helper.output('foo');
            }
        };
        render('{custom-macro}', {}, {macros: macro}).should.equal('foo');
    });

    it('two macros can begin with the same name', function () {
        var macro = {
            'custom-macro': function () {
                return parker.helper.output('foo');
            },
            'custom-macro2': function () {
                return parker.helper.output('foo2');
            }
        };
        render('{custom-macro}', {}, {macros: macro}).should.equal('foo');
        render('{custom-macro2}', {}, {macros: macro}).should.equal('foo2');
    });
});

describe('the example in readme.md', function () {

    it('should be correct except for whitespace', function () {
        var template =
                '{has fields ' +
                '  <form> ' +
                '    {each fields ' +
                '      {. label}: <input type="text" x-bind="{path name}" value="{. name}"> ' +
                '    } ' +
                '  </form>' +
                '}',

            data = {
                fields: [
                    {label: 'Hunter', name: 'Thirsty'},
                    {label: 'Tiger', name: 'Richard Parker'}
                ]
            },

            output =
                '<form> ' +
                '  Hunter: <input type="text" x-bind="fields.0.name" value="Thirsty"> ' +
                '  Tiger: <input type="text" x-bind="fields.1.name" value="Richard Parker"> ' +
                '</form>';

        render(template, data).replace(/\s/g, '').should.equal(output.replace(/\s/g, ''));
    });
});



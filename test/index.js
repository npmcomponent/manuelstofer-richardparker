/*global describe, it*/
'use strict';

var render = require('..');

describe('.', function () {

    it('should display a attribute', function () {
        var tiger = {name: 'richard parker'};
        render('they call me {.name}', tiger).should.equal('they call me richard parker');
    });

    it('should display an element of an array', function () {
        var site = {pages: ['about', 'news']};
        render('{.pages[1]}', site).should.equal('news');
    });
});

describe('has', function () {

    it('should render when attribute is set', function () {
        var tiger = {name: 'richard parker'};
        render('{has .name hello {.name}}', tiger).should.equal('hello richard parker');
    });

    it('should not render when attribute is not set', function () {
        var tiger = {};
        render('{has .name hello richard}', tiger).should.equal('');
    });

    it('should not render when attribute is set but falsey', function () {
        var tiger = {name: false};
        render('{has .name does render}', tiger).should.equal('');
    });
});

describe('each', function () {

    it('should iterate over an array', function () {
        var site = {pages: ['about', 'news']};
        render('{each .pages {.} }', site).should.equal('about news ');
    });

    it('should iterate over an object', function () {
        var richard = {foo: {name: 'richard parker', age: 12}};
        render('{each .foo {.} }', richard).should.equal('richard parker 12 ');
    });

    it('should iterate over the root attributes of an object', function () {
        var richard = {name: 'richard parker', age: 12};
        render('{each . {.}}', richard).should.equal('richard parker 12 ');
    });
});

describe('path', function () {

    it('path should output the current path in the data structure', function () {
        var site = {bar: ['foo']};
        render('{each .bar {path .foo}}', site).should.equal('.bar.foo');
    });
});

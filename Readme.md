# Richard Parker

Simple template engine for two way bindings.

![Richard Parker](resources/richard-parker.jpg)

> A Tiger? Richard Parker was a Tiger?
> Yeah! He got his name through a clerical error. A Hunter caught him when drinking from a
> stream when he was a cub, and named him Thirsty. When Thirsty got too big, the hunter sold
> him to our zoo, but the names got switched on the paperwork. The hunter was listed as 
> Thirsty and the tiger was called Richard Parker. We laughed about it and the name stuck.

## Syntax

Its kind of Mustache in s-expressions.

Template:

```HTML
{has .tigers
  <ul>
    {each .tigers
      <li x-bind="{path .name}">{.name}</li>
    }
  </ul>
}
```

Data:

```Javascript
{
  tigers: [
    {name: 'Richard Parker'}
    {name: 'Thirsty'}
  ]
}
```

Output:

```HTML
<ul>
  <li x-bind=".tigers[0].title">Richard Parker</li>
  <li x-bind=".tigers[1].title">Thirsty</li>
</ul>
```

The possibility to output the current path is intended to be used for two way data bindings.

## Installation

Using npm

```
$ npm install richardparker

```

Using Component

```
$ component install richardparker
```

## Usage

The package can be consumed as a [component](http://github.com/component/component) or as a 
[npm](http://npmjs.org/) module. For use on the server and on the client.

### Command-line

Richard Parker can compile templates to common js or optionally to amd modules.

```bash
$ richardparker template.html       # compile template.html and output to stdout
$ richardparker -a foo.html         # compile test.html and output as amd module
```

### Javascript API:

```Javascript

var richard = require('richardparker'),

    // render directly
    html = richard('{has .title <h1>{.title}</h1>}', {name: 'foo'});

    // compile to javascript function
    template = richard.compile('{has .title <h1>{.title}</h1>}'),

```

### Extensibility

New commands can be added quite easily as compile time marcros. To see how its done
checkout the native marcros has, ., each, and path.




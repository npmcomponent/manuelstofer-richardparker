*This repository is a mirror of the [component](http://component.io) module [manuelstofer/richardparker](http://github.com/manuelstofer/richardparker). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/manuelstofer-richardparker`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# Richard Parker

Simple template engine for two way bindings.
![Travis](https://api.travis-ci.org/manuelstofer/richardparker.png)

![Richard Parker](https://github.com/manuelstofer/richardparker/raw/master/resources/richard-parker.jpg)

> A Tiger? Richard Parker was a Tiger?
> Yeah! He got his name through a clerical error. A Hunter caught him when drinking from a
> stream when he was a cub, and named him Thirsty. When Thirsty got too big, the hunter sold
> him to our zoo, but the names got switched on the paperwork. The hunter was listed as
> Thirsty and the tiger was called Richard Parker. We laughed about it and the name stuck.


Richard Parker is a simple template engine designed for data binding with json pointers.

## Demo

There is an interactive [demo](http://manuelstofer.github.com/richardparker/) that allows you to
try Richard Parker templates in the web browser.


Template:

```HTML
{has fields
  <form>
    {each fields
      {. label}: <input type="text" x-bind="{pointer name}" value="{. name}">
    }
  </form>
}
```

Data:

```Javascript
{
  fields: [
    {label: 'Hunter', name: 'Thirsty'},
    {label: 'Tiger', name: 'Richard Parker'}
  ]
}
```

Output:

```HTML
<form>
  Hunter: <input type="text" x-bind="/fields/0/name" value="Thirsty">
  Tiger: <input type="text" x-bind="/fields/1/name" value="Richard Parker">
</form>
```

In the example above {pointer} is used to generate a JSON pointer to the names.
This is useful to create data bindings.


## Installation

Using npm

```bash
$ npm install richardparker
```

Using Component

```bash
$ component install manuelstofer/richardparker
```

## Usage

The package can be consumed as a [component](http://github.com/component/component) or as a
[npm](http://npmjs.org/) module.

### Command-line

Richard Parker can compile templates to CommonJS or optionally to [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition) modules.

```bash
$ richardparker template.html       # compile template.html and output to stdout
$ richardparker -a foo.html         # compile test.html and output as amd module
```

## API

```Javascript

var richard = require('richardparker'),

    // render directly
    html = richard('{has title <h1>{. title}</h1>}', {name: 'foo'}),

    // compile to javascript function
    template = richard.compile('{has title <h1>{. title}</h1>}');

```

## Extensibility

New commands can be added quite easily as compile time macros. To see how it's done
check out the native macros like has, each and pointer.




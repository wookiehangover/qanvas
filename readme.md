# qanvas()

v0.1.0

A simple loading script for creating and manipulating canvas elements.

## Usage

qcanvas provides a minial interface for dealing with canvas elements. It
accepts an options hash and returns an object with functions and values
related to your canvas element. It works best when assigned to varaible,
like this:

    var my_canvas = new Qanvas();

## Default Options

    Qanvas#defaultOptions = {
      name: 'qanvas-' +new Date(),
      style: '',
      width: 200,
      height: 200,
      target: $('body'),
      initialize: false
    };

## requestAnimFrame()

Paul Irish's shim for `requestAnimationFrame` is included. It
offers a more modern way of looping animations than setInterval or setTimeout, and its on
its way to being widely supported. The shim re-maps the method to a
slightly different namespace and provides a fallback to setTimeout when
not supported. Peep `assets/js/script.js` for more info on how to use it,
and be sure to read [Paul's blog post][1].

### License

It's MIT, yo

[1]: http://paulirish.com/2011/requestanimationframe-for-smart-animating/

# ql\_canvas()

v0.0.1

A simple loading script for creating and manipulating canvas elements.

## Usage

ql\_canvas provides a minial interface for dealing with canvas elements
with a minimal interface. It accepts an options hash and returns an
object with functions and values related to your canvas element. It
works best when assigned to varaible, like this:

    var my_canvas = ql_canvas();

When you apply ql\_canvas, two things happen:

* A canvas element is created and inserted into the DOM as a child of the `target` option.
* An object is returned with various interfaces for the canvas element.

### Options

The options object tells ql\_canvas everything it needs to know to
contruct a canvas element with a 2D context. Here's a list of available
options and their default values:

* `name`
  * the id of the canvas element to be created
  * default - ql\_canvas + current time
* `target`
  * the element the canvas element is appended to
  * default - `$('body')`
* `width`
  * canvas width
  * default - 200
* `height`
  * canvas height
  * default - 200
* `style`
  * a string of CSS to be applied to the canvas element
  * default - false
* `init`:
  * a function applied to a callback queue and attached to the ql\_canvas
    response object
  * default - false

Here's a sample options object:

    var my_canvas = ql_canvas({
      height: 400,

      width: 400,

      init: function( ctx, $canvas, settings ){
        ctx.fillStyle = "magenta";
      }
    });


### The Interface

`init( functions )`

* a callback ready function created by `options.init` 3 arguments are
  passed into this function be default: the canvas context, the canvas jquery selector, and the options
  object. Accepts functions as arguments, which are executed with the
  correct context.

`chain( functions )`

* a function that creates callback chains with the same arguments as
  the init function.

`clear( x, y )`

* clears the entire canvas based on passed in or default width and height

`resize( width, height )`

* resizes the canvas

`$`

* the canvas element's jquery selector

`ctx`

* the canvas element's 2D context object

`settings`

* the settings hash

## requestAnimFrame()

Paul Irish's shim for `window.requestAnimationFrame` is included. It
offers a more modern way of looping animations than setInterval or setTimeout, and its on
its way to being widely supported. The shim re-maps the method to a
slightly different namespace and provides a fallback to setTimeout when
not supported. Peep `example/script.js` for more info on how to use it,
and be sure to read [Paul's blog post][1].

### License

It's MIT, yo

[1]: http://paulirish.com/2011/requestanimationframe-for-smart-animating/

/*global Qanvas*/
var defaults = {
  target: jQuery('#qunit-fixture')
};

module('qanvas');

test('Basic Requirements', 3, function(){

  ok( window.qanvas );
  ok( window.Qanvas );
  ok( window.requestAnimFrame );

});

test('Initialization', 6, function(){

  var called = false;

  var o = $.extend( defaults, {
    initialize: function(){
      called = true;
    }
  });

  var q = new Qanvas( o );

  equal( q.settings.target, defaults.target );
  equal( q.settings.height, q.defaultOptions.height );
  equal( q.$canvas instanceof jQuery, true );
  equal( q.canvas, q.$canvas[0] );
  equal( q.ctx instanceof CanvasRenderingContext2D, true );
  equal( called, true, 'the passed in init method was called');

});

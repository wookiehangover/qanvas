
// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

// below are some general tests but feel free to delete them.
$(function(){

module("ql_canvas");

test("Should be attached to the window",function(){
  expect(1);

  ok( !!window.ql_canvas, "ql_canvas should be present");
});

test("Should behave as expected", function(){
  expect(4);
  var c = ql_canvas({ target: $('#qunit-fixture') });

  equals( typeof c, "object", "it should be an object");
  equals( typeof c.init, "function", "init should be an object");
  equals( typeof c.chain, "function", "chain should be an object");
  equals( typeof c.clear, "function", "clear should be an object");

});



});

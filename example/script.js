/* Author: Sam Breed for Quick Left 2011

*/

$(function(){
  var pause = false,
      timeout = $("#timeout");

  window.my_canvas = ql_canvas({
    width: $(window).width(),
    height: $(window).height(),
    style: "float:left; position:fixed; top:0; left:0; z-index:-10;",
    init: function canvasInit(ctx, $canvas, settings) {
      var red, blue, green,

          x = $('#size').val(),
          y = x,

          width = settings.width / x,
          height = settings.height / y,

          x_color = 255 / width,
          y_color = 255 / height;

      for(var i = 0; i < width; i += 1 ){
        for(var j = 0; j < height; j += 1 ){

          red = ~~(255 - x_color * i);
          blue = ~~(255 - y_color * j);
          green = ~~(255 - x_color * (Math.random() * j));

          ctx.fillStyle = 'rgb('+ red +','+ blue +','+ green +')';
          ctx.fillRect( i * x, j * y, x, y);
        }
      }
    }
  });

  my_canvas.init();

  function animate() {
    if( pause ) return;

    var delayTime = timeout.val();

    my_canvas.init();

    if (delayTime)
      return setTimeout( function(){ requestAnimFrame( animate ); }, delayTime);

    requestAnimFrame( animate );
  }

  animate();

  $(window).resize(function(){
    my_canvas.resize( $(window).width(), $(window).height() );
  });

  $('#pause').click(function(e){
    e.preventDefault();
    var $this = $(this);

    pause = !pause;

    if( $this.text() == "Stop" ){
      $this.text('Start');
    } else {
      $this.text('Stop');
      requestAnimFrame( animate );
    }
  });

});




















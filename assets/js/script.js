$(function(){
  var pause = false,
      timeout = $("#timeout"),
      tilt = { x: 0, y: 0 };

  window.addEventListener("deviceorientation", function(e) {

    tilt.x = Math.abs(e.beta * 8) + 50;
    tilt.y = Math.abs(e.gamma * 12);

  }, true);

  var q = new Qanvas({
    width: $(window).width(),
    height: $(window).height(),
    style: "float:left; position:fixed; top:0; left:0; z-index:-10;",
    render: function() {

      var ctx = this.ctx;
      var $canvas = this.$canvas;
      var settings = this.settings;

      var red, blue, green,

          toggle = $('input[name="toggle"]:radio').attr("checked"),

          x = $('#size').val(),
          y = x,

          width = settings.width / x,
          height = settings.height / y,

          x_color = 255 / width,
          y_color = 255 / height,

          seconds = new Date().getTime() * 0.002;

      if( toggle ){

        for(var i = 0; i < width; i += 1 ){
          for(var j = 0; j < height; j += 1 ){

            red = ~~(255 - tilt.x - x_color * i);
            blue = ~~(255 - tilt.y - y_color * j);
            green = ~~(255 - x_color * (Math.random() * j));

            ctx.fillStyle = 'rgb('+ red +','+ blue +','+ green +')';
            ctx.fillRect( i * x, j * y, x, y);
          }
        }

      } else {

        for(var i = 0; i < width; i += 1 ){
          for(var j = 0; j < height; j += 1 ){
            var offset = (Math.sin(seconds) * 100 + 255);

            red = offset - (x_color * i) ;
            green = offset - (y_color * j) ;
            blue = 100 - (y_color * j);
            //blue = ~~( 255 - x_color * (Math.random() * j));

            ctx.fillStyle = 'rgb('+ ~~red +','+ ~~green +','+ ~~blue +')';
            ctx.fillRect( i * x, j * y, x, y);
          }
        }

      }

    }
  });

  function animate() {
    if( pause ) return;

    var delayTime = timeout.val();

    q.render();

    if( delayTime )
      return setTimeout( function(){ requestAnimFrame( animate ); }, delayTime);

    requestAnimFrame( animate );
  }

  animate();

  $(window).resize(function(){
    q.resize( $(window).width(), $(window).height() );
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




















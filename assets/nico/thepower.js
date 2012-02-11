/*!
 * QL Canvas
 * Written by Nico Valencia
 * http://quickleft.com/
 *
 * Copyright 2010, Quick Left, Inc.
 *
 * Date: 14 July 2010
 */

(function(){
	
	//this holds our interval
	var $anim_obj;
	
	//this is our 2d canvas element
	var $context;
	
	//this is our iterator array
	var $i = new Array();
	$i['draw_count'] = 0;
	$i['last_second'] = 0;
	$i['fps'] = 0;
	
	//this is our interval speed
	var $interval = 1;
	
	//these are our canvas params
	var $canvas = {
		w: 800,
		h: 400
	}
	
	var CANVAS = {
		init: function(){
			
			CANVAS.msg('Welcome to QL CANVAS!');
			CANVAS.bindEvents();
			
		},
		bindEvents: function(){
			
			//actions
			$('.action').bind('click',function(){
				CANVAS.draw.init($(this).attr('data-action'));
				return false;
			});
			$('#stop a').bind('click',function(){
				CANVAS.msg('Stopped.')
				clearInterval($anim_obj);
				return false;
			});
			$('#clear a').bind('click',function(){
				CANVAS.msg('Clearing...')
				CANVAS.draw.clearCanvas();
				return false;
			});
			$('#interval_go').bind('click',function(){
				CANVAS.changeInterval();
			});
			//messages
			$('.flash_message').bind('mouseenter',function(){
				CANVAS.flashMsg($(this).attr('data-message'));
			});
			$('.flash_message').bind('mouseleave',function(){
				$('#msg').css({opacity:0});
			});
			//interval
			$('#interval').bind('focus',function(){
				$(this).val('');
			});
			
		},
		draw: {
			init: function(action){
				
				CANVAS.msg('Drawing: '+action+'.');
				
				//reset canvas
				clearInterval($anim_obj);
				CANVAS.draw.clearCanvas();
				
				//initialize the canvas
				$context = document.getElementById('ql_canvas');
				$context = $context.getContext('2d');
				
				//reset our iterator
				$i['draw_count'] = 0;
				$i['last_second'] = 0;
				$i['fps'] = 0;
				
				//call action
				switch(action){
					case 'circle':
						$context.strokeStyle = "#0099ff";
						$anim_obj = setInterval(CANVAS.draw.circle,$interval);
						break;
					case 'calculusTween':
						$i['x'] = 0;
						$i['y'] = 0;
						$context.strokeStyle = "#000";
						$anim_obj = setInterval(CANVAS.draw.calculusTween,$interval);
						break;
					case 'gradient':
						$anim_obj = setInterval(CANVAS.draw.gradient,$interval);
						break;
					default:
						break;
				}
				
			},
			circle: function(){
				
				//random location
				var x = Math.floor(Math.random()*$canvas.w), y = Math.floor(Math.random()*$canvas.h), radius = Math.floor(Math.random()*200);
				
				//draw
				$context.beginPath();
				$context.arc(x, y, radius, 0, Math.PI * 2, false);
				$context.closePath();
				$context.stroke();
				
				//stats
				CANVAS.updateStats();
				
			},
			calculusTween: function(){
				
				CANVAS.draw.clearCanvas();
				
				//draw
				$context.beginPath();
				$context.arc($i['x'], $i['y'], ($canvas.h/10), 0, Math.PI * 2, false);
				$context.closePath();
				$context.stroke();
				
				//count
				$i['x']++;
				$i['y'] = Math.sin($i['x']/20)*($canvas.h/4) + ($canvas.h/2);
				
				//reset
				if($i['x'] > $canvas.w + 30) $i['x'] = 0;
				
				//stats
				CANVAS.updateStats();
				
			},
			gradient: function(){
				
				//draw
				var gradient = $context.createRadialGradient($canvas.w/2,$canvas.h/2,0,$canvas.w/2,$canvas.h/2,$canvas.w/2);
				gradient.addColorStop(0, 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')');
				gradient.addColorStop(1, 'rgb('+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')');
				$context.fillStyle = gradient;
				$context.fillRect(0, 0, 800, 400);
				
				//stats
				CANVAS.updateStats();
				
			},
			clearCanvas: function(){
				
				/* This is the Traditional Method
				 * However, it is buggy in Chrome, so we just re-draw a clean canvas
				 *
				 *		var clear_this = document.getElementById('ql_canvas');
				 *		clear_this.width = 800;
				 *
				 */
				
				if($context) $context.clearRect(0,0,$canvas.w,$canvas.h);
				
			}
		},
		changeInterval: function(){
			
			clearInterval($anim_obj);
			
			//set entered number
			var interval_field = parseInt($('#interval').val());
			if(isNaN(interval_field)){
				$interval = 1;
			} else {
				$interval = interval_field;
			}
			
			//reset canvas
			CANVAS.draw.clearCanvas();
			
			//animate interval field
			$('#interval').slideUp(300,function(){
				$(this).val($interval);
				$(this).slideDown(300);
			});
			
		},
		updateStats: function(){
			
			var right_now = new Date();
			
			//count
			$i['draw_count']++;
			$('#draw_count span').html($i['draw_count']);
			
			//fps
			if(right_now.getSeconds() != $i['last_second']){
				$i['last_second'] = right_now.getSeconds();
				$('#fps span').html($i['fps']);
				$i['fps'] = 0;
			} else {
				$i['fps']++;
			}
			
			//date
			$('#time').html(right_now.toGMTString());
			
		},
		flashMsg: function(msg){
			$('#msg').html(msg);
			$('#msg').css({opacity:.9});
		},
		msg: function(msg){
			if(window.console) console.log(msg);
		}
	}
	
	$(document).ready(CANVAS.init);
	
})();
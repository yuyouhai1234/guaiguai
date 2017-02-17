$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		$('#start-exam').on('tap',function(){
			$('.mb-bg').css('display','block');
			$('.rule-box').css('display','block');
		})
		$('#start-one').on('tap',function(){
			window.open('km4-exam.html','_self')
		})
	}
})
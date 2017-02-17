$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		$('.km-one').addClass('active')
	}
	$('.km-tit').on('tap',function(){
		var num=$('.km-tit').index($(this));
		$('.km-tit').removeClass('active').eq(num).addClass('active');
		$('.km-box').css('display','none').eq(num).css('display','block');
		var length=parseFloat($('.km-tit').eq(num).css('width'))*num;
		$('.tit-line').css('transform','translateX('+length+'px)');
	})
	$('.module-exam-outer').on('tap',function(){
		var index=$('.module-exam-outer').index($(this));
		$('.module-exam-inner').eq(index).css('transform','scale(0.5)');
		$('.module-exam-outer').eq(index).css('transform','scale(0.5)');
		if(index==0){
			setTimeout(function(){
				window.open('module.html','_self')
			},1200); 
		}else if(index==2){
			setTimeout(function(){
				window.open('module-four.html','_self')
			},1200);
		}
	})
	$('.simulate-exam-outer').on('tap',function(){
		var index=$('.simulate-exam-outer').index($(this));
		if(index==0){
			setTimeout(function(){
				window.open('simulate-one.html','_self')
			},1200); 
		}else if(index==1){
			setTimeout(function(){
				window.open('sinulate-four.html','_self')
			},1200);
		}
	})
})
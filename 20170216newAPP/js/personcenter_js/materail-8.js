$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}	
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
	}
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	$('.materail-mima').on('tap',function(){
		window.open('user_resetpwd.html','_self');
	})
	$('#materailBtn').on('tap',function(){
		localStorage.removeItem('person_id');
		localStorage.removeItem('user_tel');
		window.open('../loginReg_html/login.html','_self');
	})
	$('.clear-number').on('tap',function(){
		if(confirm('清除缓存可能会导致您的数据丢失。确定要清除吗？')){
			localStorage.removeItem('person_id');
			localStorage.removeItem('phone');
			localStorage.removeItem('userName');
			localStorage.removeItem('user_tel');
		}
	})
})
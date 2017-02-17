$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		!function(){function c(){
			b.style.fontSize=Math.min(window.innerWidth,640)/320*a+"px"}
		if(window.addEventListener){
			var a=20,b=document.getElementsByTagName("html").item(0);window.addEventListener("resize",c),c()}
		}();
		$('html,body').show();
		var mySwiper = new Swiper ('.swiper-container', { 
			loop: true, 
			autoplay: 3000,
			direction :'horizontal',
			effect:'fade',
			grabCursor: true,
			autoplayDisableOnInteraction : false,
		}) 
	}
	$('.exam-box').on('tap',function(){
		window.open('html/exam_html/simulate.html','_self')
	})
	$('.enlist-box').on('tap',function(){
		window.open('html/product_html/product_list.html','_self')
	})
	$('.video-box').on('tap',function(){
		window.open('html/video_html/index.html','_self')
	})
	$('.map-box').on('tap',function(){
		window.open('html/product_html/map.html','_self')
	})
	
	
	$('.yuyue-box').on('tap',function(){//登录判断  新版判断登录是否显示登录图钉
		var yueDet=localStorage.getItem('person_id');
		if(yueDet==null){
			alert('请先登录');
			window.open('html/loginReg_html/login.html','_self')
		}else{
			window.open('html/bespeak_html/coach.html','_self')
		}
	})
	
	
	$('.person-box').on('tap',function(){//点击个人中心判断是否登录
		if(localStorage.getItem('person_id')){
			window.open('html/personcenter_html/personcenter.html','_self');
		}else{
			window.open('html/loginReg_html/login.html','_self');
		}
	})
	var str=window.location.search;
	if(str!=''){
		var str1=str.substring(8,str.length);
		localStorage.setItem('openid',str1);
	}//获取个人openid并保存
//	/*if(localStorage.getItem('openid')==null||localStorage.getItem('openid')==''){
//		if(str!=''){
//			var str1=str.substring(6,str.length);
//			var str2=str1.split('&')[0];
//			$.ajax({
//				type: "POST",
//				url:"https://guaiguaixueche.com.cn/api/getopenid",
//				data:{code:str2},
//				dataType:'json',
//				success: function(data){
//					localStorage.setItem('openid',data);
//				}
//			})
//		}
//	}*/
	var person_id=localStorage.getItem('person_id');
	$.ajax({
		type: "POST",
		url:"https://guaiguaixueche.com.cn/api/checkPerson",
		data:{person_id:person_id},
		dataType:'json',
		success: function(data){
			if(data=='noexists'){
				localStorage.removeItem('person_id');
			}
		}
	})
})
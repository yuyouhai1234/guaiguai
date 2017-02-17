$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		var mySwiper = new Swiper ('.swiper-container', { 
			loop: true, 
			autoplay: 3000,//可选选项，自动滑动
			direction :'horizontal',
			effect:'coverflow',
			grabCursor: true,
			autoplayDisableOnInteraction : false,
		}) 
	}
	/*点击跳转到理论模拟页面*/
	$('.exam-box').on('tap',function(){
		window.open('html/exam_html/simulate.html','_self')
	})
	/*点击跳到报名页面*/
	$('.enlist-box').on('tap',function(){
		window.open('html/product_html/product_list.html','_self')
	})
	/*点击跳转到视频页面*/
	$('.video-box').on('tap',function(){
		window.open('html/video_html/index.html','_self')
	})
	/*点击跳转到周边驾校*/
	$('.map-box').on('tap',function(){
		window.open('html/product_html/map.html','_self')
	})
	/*点击跳转到预约页面*/
	$('.yuyue-box').on('tap',function(){
		window.open('html/bespeak_html/coach.html','_self')
	})
	/*点击进入个人中心*/
	$('.person-box').on('tap',function(){
		if(localStorage.getItem('person_id')){
			window.open('html/personcenter_html/personcenter.html','_self');
		}else{
			window.open('html/loginReg_html/login.html','_self');
		}
	})
	/*存储openid*/
	var str=window.location.search;
	if(str!=''){
		var str1=str.substring(6,str.length);
		var str2=str1.split('&')[0];
		$.ajax({
			type: "POST",
			url:"https://guaiguaixueche.com.cn/api/getopenid",
			data:{code:str2},
			dataType:'json',
			success: function(data){
				localStorage.setItem('openid',data);
			}
		})
	}
	
	
	/*验证当前personid是否有效*/
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
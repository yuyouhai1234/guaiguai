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
	if(localStorage.getItem('phone')){
		$('#login-user-tel').val(localStorage.getItem('phone'));
	}
	var isLogin=false;
	$('#login-btn').on('tap',function(){
		if(isLogin==true){return false;}
		isLogin=true;
		var 
			tel=$('#login-user-tel').val(),
			pwd=$('#login-user-pwd').val();
		var openid=localStorage.getItem('openid');
		if(tel==''||pwd==''){
			$('.error-box').eq(2).html('请填写您的手机号或者密码');
			isLogin=false;
		}else{
			$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com.cn/api/login',
				//url:'http://192.168.18.135:8080/api/login',
				data:{telephone:tel,password:pwd,openid:openid},
				async:false,
				dataType:'json',
				success:function(data){
					isLogin=false;
					if(data.code=='error'){
						$('.error-box').eq(2).html(data.content)
					}else{
						$('.error-box').eq(2).html('');
						localStorage.setItem('person_id',data.content);
						localStorage.setItem('user_phone',tel);
						alert('登录成功');
						var str=window.location.search;
						var str1=str.substring(6,str.length);
						if(str1=='detail'){
							history.back();
						}else{
							window.location.replace('../../index.html');
						}
						
					}
				}
			})
		}
	})
	/*是否显示密码*/
	$('.show-pass-btn').on('tap',function(){
		if($('.show-pass-btn').attr('state')=='off'){
			$('#login-user-pwd').prop('type','text');
			$('.show-pass-btn').attr('state','on');
		}else{
			$('#login-user-pwd').prop('type','password');
			$('.show-pass-btn').attr('state','off');
		}
	})

})
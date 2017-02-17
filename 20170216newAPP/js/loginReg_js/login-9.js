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
		if(isLogin){return false}
		isLogin=true;
		var 
			tel=$('#login-user-tel').val(),
			pwd=$('#login-user-pwd').val(),
			reg=/^1(3|4|5|7|8)\d{9}$/;
		var openid=localStorage.getItem('openid');
		if(tel==''||pwd==''){
			$('.error-box').eq(2).html('请填写您的手机号或者密码');
			isLogin=false;
		}else if(reg.test(tel) == false){
			$('.error-box').eq(2).html('手机号输入有误请重新输入');
			isLogin=false;
		}else{
			pwd=(hex_md5(pwd+'salt_ggxc')).toUpperCase();
			
			$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com/employee/login',
				data:JSON.stringify({telephone:tel,salt:pwd,openid:openid}),
				async:false,
				dataType:'json',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					isLogin=false;
					//console.log(data)
					if(data.msgid == -4){
							$('.error-box').eq(2).html('账号不存在，请先注册后再登录');
						}else if(data.msgid == -5){
							$('.error-box').eq(2).html('手机号或密码错误')
						}else if(data.msgid == 0){
							$('.error-box').eq(2).html('');
							localStorage.setItem('person_id',data.msg);
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
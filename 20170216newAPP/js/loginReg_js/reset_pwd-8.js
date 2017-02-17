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
	var send=false;
	$('#reset-code-btn').on('tap',function(){
		if(send){return false;}	
		
		var 	
			tel=$('#reset-user-tel').val(),
			reg=/^1(3|4|5|7|8)\d{9}$/;
		if(tel==''){
			$('.error-box').eq(0).html('手机号不能为空')
		}else{
			if(reg.test(tel)==false){
				$('.error-box').eq(0).html('手机号格式错误,请重新输入!')
			}else{
				$('.error-box').eq(0).html('');
				$('#reset-code-btn').val('正在请求');
				$.ajax({
					type:"post",
					url:'https://guaiguaixueche.com.cn/api/telIsExists',
					data:{telephone:tel},
					dataType:'json',
					success:function(data){
						if(data.code=='exists'){
							$.ajax({
								type:"post",
								url:'https://guaiguaixueche.com.cn/api/getcode',
								data:{telephone:tel,type:2},
								dataType:'json',
								success:function(data){
									if(data.code=='success'){
										send=true;
										$('.error-box').eq(1).html('验证码已发送,若未收到,请在120s后再次获取');
										countDown($('#reset-code-btn'));
									}else if(data.code=='error'){
										$('.error-box').eq(1).html(data.content);
										$('#reset-code-btn').val('获取验证码');
									}else if(data.code=="limit"){
										$('.error-box').eq(1).html(data.content);
										$('#reset-code-btn').val('获取验证码');
									}
								}
							})
						}else if(data.code='success'){
							$('.error-box').eq(0).html('不好意思，您还没有注册呢');
							$('#reset-code-btn').val('获取验证码');
						}else{
							$('.error-box').eq(0).html(data.content);
							$('#reset-code-btn').val('获取验证码');
						}
					}
				})
			}
		}	
		
	
	})
	function countDown(obj) {
	    if (obj.val() == "正在请求") {
	    	var msg = "等待";
	        var _delay = 120;
	        var delay = _delay;
	        obj.val(msg + _delay).addClass("code-disabled");
	        var timer = setInterval(function() {
	            if (delay > 1) {
	                delay--;
	                obj.val(msg + delay);
	                setLocalDelay(msg + delay);
	                obj.attr('disabled','disabled');
	            } else {
	            	send=false;
	                clearInterval(timer);
	                $('.error-box').eq(1).html('');
	                obj.val("获取验证码").removeClass("code-disabled").removeAttr('disabled');
	            }
	        }, 1000);
			
	    }
	}
	var isReset=false;
	$('#reset-btn').off().on('tap',function(){
		if(isReset){return false;}
		isReset=true;
		var 
			reg=/^[\w]{6,12}$/,
			tel=$('#reset-user-tel').val(),
			code=$('#reset-user-code').val(),
			pwd=$('#reset-user-pwd').val();
		if(tel==''||code==''||pwd==''){
			$('.error-box').eq(3).html('请先完善您的信息');	                                           
			isReset=false;
		}else if(reg.test(pwd)==false){
			$('.error-box').eq(3).html('密码为6-12位的数字、字母或者下划线');
			isReset=false;
		}else{
			$('.error-box').eq(3).html('');
			$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com.cn/api/updatePd',
				data:{telephone:tel,password:pwd,code:code},
				dataType:'json',
				async:false,
				cache: false,
				success:function(data){
					isReset=false;
					if(data.code=='error'){
						var cont=data.content;
						$('.error-box').eq(0).html(cont);
					}else if(data.code=="success"){
						localStorage.setItem('phone',tel);
						alert('重置密码成功');
						window.location.replace('login.html');
					}
				}
			})
		}
		
	})
})
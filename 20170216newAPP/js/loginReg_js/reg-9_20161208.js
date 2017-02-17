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
        snap:true,
        hScrollbar:false
	})
	function reloadScroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	var recommend_telephone;
	var str=window.location.search;
	if(str!=''){
		var arr1=str.split('&');
		var openidStr=arr1[0].substring(8,arr1[0].length);
		localStorage.setItem('openid',openidStr);
		var str1=arr1[1].substring(5,arr1[1].length);
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com.cn/api/getRecTel',
			data:{ggxc:str1},
			dataType:'json',
			async:false,
			success:function(data){
				if(data.code=="success"){
					recommend_telephone = data.content;
				}	
			}
		})
	}else{
		recommend_telephone=''
	}
	var send=false;
	$('#get-code-btn').on('tap',function(){
		if(send){return false;}	//如果正在发送验证码则不执行下边程序
		var 	
			tel=$('#reg-user-tel').val(),
			reg=/^1(3|4|5|7|8)\d{9}$/;
		if(tel==''){
			$('.error-box').eq(0).html('号码不能为空')
		}else{
			if(reg.test(tel)==false){
				$('.error-box').eq(0).html('号码格式错误,请重新输入!')
			}else{
				$('.error-box').eq(0).html(' ')
				$('#get-code-btn').val('正在请求');
				$.ajax({
					type:"post",
					url:'https://guaiguaixueche.com.cn/api/telIsExists',
					data:{telephone:tel},
					dataType:'json',
					async:false,
					cache: false,
					success:function(data){
						if(data.code=='error'){
							var cont=data.content;
							$('.error-box').eq(0).html(cont);
							$('#get-code-btn').val('获取验证码');
						}else if(data.code=="success"){
							$('.error-box').eq(0).html('');
							$.ajax({
								type:"post",
								url:'https://guaiguaixueche.com.cn/api/getcode',
								data:{telephone:tel,type:0},
								dataType:'json',
								success:function(data){
									if(data.code=='success'){
										send=true;
										$('.error-box').eq(1).html('验证码已发送,如果未接收到,请在120S后再次获取');
										countDown($('#get-code-btn'));
									}else if(data.code=='limit'){
										$('.error-box').eq(1).html(data.content);
										$('#get-code-btn').val('获取验证码');
									}else if(data.code=='error'){
										$('.error-box').eq(1).html(data.content);
										$('#get-code-btn').val('获取验证码');
									}
								}
							})
						}else if(data.code=='exists'){
							$('.error-box').eq(0).html('手机号已经注册，您可以立即去登录');
							$('#get-code-btn').val('获取验证码');
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
	            }else {
	            	send=false;
	                clearInterval(timer);
	                $('.error-box').eq(1).html('')
	                obj.val("获取验证码").removeClass("code-disabled").removeAttr('disabled');
	            }
	        }, 1000);
			
	    } 
	}
	$('#deal-cont').on('tap',function(){
		$('.deal-bg').css('display','block');
		$('.deal-box').css('display','block');
		reloadScroll();
	})
	$('#agree-btn').on('tap',function(){
		$('.deal-bg').css('display','none');
		$('.deal-box').css('display','none');
		$('#agree-box').attr('checked','checked');
	})
	var isLeg=false;
	$('#reg-btn').on('tap',function(){
		if(isLeg==true){return false;}
		isLeg=true;
		var reg=/^[\w]{6,12}$/;
		var 
			tel=$('#reg-user-tel').val(),
			code=$('#reg-user-code').val(),
			pwd=$('#reg-user-pwd').val();
		var openid=localStorage.getItem('openid');
		if(tel==''||code==''||pwd==''){
			$('.error-box').eq(4).html('请先完善您的注册信息');	
			isLeg=false;
		}else if(reg.test(pwd)==false){
			$('.error-box').eq(4).html('密码为6-12位的数字、字母或者下划线');
			isLeg=false;
		}else if($('#agree-box').attr('checked')!='checked'){
			$('.error-box').eq(4).html('请先阅读用户协议');
			isLeg=false;
		}else{
			$('.error-box').eq(4).html('');
			$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com.cn/api/regist',
				//url:'http://192.168.18.135:8080/api/regist',
				data:{telephone:tel,password:pwd,code:code,recommend_telephone:recommend_telephone,openid:openid},
				async:false,
				dataType:'json',
				success:function(data){
					isLeg=false;
					if(data.code=='error'){
						$('.error-box').eq(4).html(data.content);
					}else{
						$('.error-box').eq(4).html('');
						alert('注册成功');
						localStorage.setItem('phone',tel)
						window.location.replace('../../html/loginReg_html/login.html');
					}
				}
			})
		}
	})
})
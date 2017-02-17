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
	if(localStorage.getItem('tel')){
		$('#reset-user-tel').val(localStorage.getItem('tel')).attr('readonly',true);
	}
	$('#reset-user-pwd').blur(function(){
		var 
			reg=/^[\w]{3,12}$/,
			pwd=$('#reset-user-pwd').val();
		if(reg.test(pwd)==false){
			$('.error-box').eq(2).html('密码为3-12位的数字、字母或者下划线');
		}else{
			$('.error-box').eq(2).html(' ')
		}
	})
	$('#reset-btn').off().on('tap',function(){
		var 
			tel=$('#reset-user-tel').val(),
			pwd=$('#reset-user-pwd').val();
		if(tel==''||pwd==''){
			$('.error-box').eq(2).html('请先完善您的信息');	
		}else{
			$('.error-box').eq(2).html('');
			resetPwd();
		}
		
	})
	 
	var	tel=$('#reset-user-tel').val();
	function resetPwd(){
		var coachid=localStorage.getItem('coachid');
		var type='2';
		var newpass=$('#reset-user-pwd').val();
		var newpass=b64_md5(newpass);
		//console.log('{"user":"'+coachid+'","type":"'+type+'","newpass":"'+newpass+'"}')
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com/ggxc/edtpasswd',
			data:'{"user":"'+coachid+'","type":"'+type+'","newpass":"'+newpass+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				//console.log(data)
				if(data.ret.code=='1'){
					alert(data.ret.msg);
				}else{
					alert(data.ret.msg);				
					localStorage.setItem('newpass',newpass);
					localStorage.setItem('tel',tel);
					window.open('login.html','_self')
				}
			}
		})
	}
})

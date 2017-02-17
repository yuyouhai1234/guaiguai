	
$(document).ready(function(){
	//console.log(localStorage.getItem('rnd'));
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();	
	}
	
	$('#login-btn').click(function(){
		var 
			tel=$('#login-user-tel').val(),
			pwd=$('#login-user-pwd').val();
		if(tel==''||pwd==''){
			$('.error-box').eq(2).html('请填写您的手机号或者密码')
		}else{
			loginTrue(tel,pwd)
		}	
	})
	var arr1=[];
	var arr2=[];
	function loginTrue(tel,pwd){
		var pwd=b64_md5(pwd);
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com/ggxc/coachlogin',
			data:'{"user":"'+tel+'","passwd":"'+pwd+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				console.log(data,data.coachid,data.rnd)
				if(data.ret.code=='0'){
					$('.error-box').eq(2).html('');
					alert('登录成功');
					localStorage.setItem('tel',$('#login-user-tel').val());
					localStorage.setItem('coachid',data.coachid);
					localStorage.setItem('rnd',data.rnd);
					localStorage.setItem('coach_name',data.coach_name);					
					window.open('mycoach.html','_self');
				}else{
					$('.error-box').eq(2).html(data.ret.msg)
				}
			}
		})
	}		
		
})

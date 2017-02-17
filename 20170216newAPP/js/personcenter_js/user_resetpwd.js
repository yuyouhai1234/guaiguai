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
	if(localStorage.getItem('user_tel')){
		var tel=localStorage.getItem('user_tel');
		var tel2=tel.split('(');
		var tel3=tel2[1].split(')')[0];
		$('#reset-user-phone').val(tel3).attr('readonly',true);
	}else{
		if(confirm('还没有登录，不能修改密码哦，现在去登录')){
			window.open('../../html/loginReg_html/login.html','_self');
		}
	}
	
	$('#user-reset-btn').on('tap',function(){
		var 
			tel=$('#reset-user-phone').val(),
			reg=/^[\w]{3,12}$/,
			pwd=$('#reset-user-pass').val();
		if(tel==''||pwd==''){
			$('.error-box').eq(2).html('请先完善您的信息');	
		}else if(reg.test(pwd)==false){
			$('.error-box').eq(2).html('密码为3-12位的数字、字母或者下划线');
		}else{
			$('.error-box').eq(2).html('');
			var personid=localStorage.getItem('person_id');
			var type='1';
			var newpass=$('#reset-user-pass').val()+'salt_ggxc';
			var newpass=hex_md5(newpass).toUpperCase();
			$.ajax({
				type:"post",
				url:'https://guaiguaixueche.com/employee/edtpasswd',
				data:JSON.stringify({user:personid,type:type,newpass:newpass}),
				dataType:'json',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					if(data.msgid==0){
						alert(data.msg);
						localStorage.removeItem('person_id');
						localStorage.removeItem('user_tel');
						localStorage.setItem('phone',$('#reset-user-phone').val());
						window.open('../../html/loginReg_html/login.html','_self');
					}else{
						alert(data.msg);
					}
				}
			})
		}
	})
})
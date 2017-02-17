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
//		显示大文字
		function regtel(obj,a){
			reg=/^1(3|4|5|7|8)\d{9}$/;
			obj.focus(function(){
				$('.error-box').eq(0).empty();
				$('.bigtextbox').css('display','block');
				$('.showbtb').html(obj.val())
			})

			obj[0].oninput=function(){
				$('.showbtb').html(obj.val())
			}
			$('#leftbtn').on('tap',function(){
				$('.bigtextbox').css('display','none');
				$('.showbtb').empty()
			})
			$('#rightbtn').on('tap',function(){
				obj.val('')
				$('.showbtb').empty()
				$('.bigtextbox').css('display','none');
			})
			obj.blur(function(){
				var atel=obj.val();
				if(reg.test(atel) == false){
					$('.error-box').eq(0).html("手机号格式输入有误");
				}else{
					$('.error-box').eq(0).empty();
				}
			})
		}
		regtel($('#reg-user-tel'),true);
		
		$('.reg-btn-box').on('tap',function(){
			$('.bigtextbox').css('display','none');
			reg=/^1(3|4|5|7|8)\d{9}$/;
			var onetel=$('#reg-user-tel').val();
			if(reg.test(onetel) == false){
				$('.error-box').eq(0).html("号码格式有误，请重新输入");
			}else{
				$.ajax({
					type:"post",
					url:"https://guaiguaixueche.com/employee/getcode",
					async:true,
					data:JSON.stringify({telephone:onetel,type:"2"}),
					contentType:'application/json;charset=utf-8',
					dataType:'json',
					success:function(data){
						if(data.msgid == -5){
							$('.error-box').eq(0).html(data.msg);
						}else if(data.msgid == 0){
							localStorage.setItem('phone',onetel)
							$('.error-box').eq(0).empty();
							alert('密码已发送至您手机,请查收！');
							window.location.replace('../../html/loginReg_html/login.html');
						}else if(data.msgid == -6){
							$('.error-box').eq(0).html("该号码没有注册，请先注册！");
						}
					}
				});
			}
		})
		
	
})

						
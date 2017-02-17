$(document).ready(function(){
	if(localStorage.getItem('person_id')){
		
	}else{
		window.open('../../html/loginReg_html/login.html','_self');
	}
	!function(){function c(){
		b.style.fontSize=Math.min(window.innerWidth,640)/320*a+"px"}
	if(window.addEventListener){
		var a=20,b=document.getElementsByTagName("html").item(0);window.addEventListener("resize",c),c()}
	}();
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
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	var arr=[0,1,2,3,4];
	$.ajax({
		type:"post",
		url:'https://guaiguaixueche.com/ggxc/who',
		dataType:'json',
		async:false,
		contentType:'application/json;charset=utf-8',
		success:function(data){
			ip=data.ip;			
		}		
	})
	getInfo(ip,arr[0]);
	getInfo(ip,arr[1]);
	getInfo(ip,arr[2]);
	var userphone;
	function getInfo(path,n){
		var path=hex_md5(path);
		var user=localStorage.getItem('person_id');
		$.ajax({
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/userinfo',
			data:'{"rnd":"'+path+'","user":"'+user+'","type":"'+n+'"}',
			dataType:'json',
			async:false,
			contentType:'application/json;charset=utf-8',
			success:function(data){
				if(n==0){
					if(data.ret.code==0){
						userphone=data.baseinfo.telephone;
						$('.user-phone').html('('+data.baseinfo.telephone+')');
						var name=data.baseinfo.real_name;
						//console.log(name)
						if(name==null){
							name="微信会员"
						}
						$('.user-name').html(name);
					}else{
						$('.user-phone').html('');
						$('.user-name').html('');
					}
				}else if(n==1){
					if(data.ret.code==0){
						var money=data.money_list.length
						$('.money-info').html(money+'个')
					}else{
						$('.money-info').html('0个')
					}
				}else if(n==2){
					if(data.ret.code==0){
						var list=data.traininfo;
						$('.train-speed').html(list[0].cname)
					}else{
						$('.train-speed').html('暂无')
					}
				}
				
			}
		})
	}
	$('.person-list li').eq(0).off().on('tap',function(){
		localStorage.setItem('user_tel',$('.user-phone').html());
		window.open('material.html','_self');
	});
	$('.person-list li').eq(1).off().on('tap',function(){
		window.open('money.html','_self')
	});
	$('.person-list li').eq(2).off().on('tap',function(){
		var openid=localStorage.getItem('openid');
		window.open('http://wx.guaiguaixueche.com/test/share/index.html?openid='+openid,'_self')
	});
	$('.person-list li').eq(3).off().on('tap',function(){
		window.open('user_order.html','_self')
	});
	$('.person-list li').eq(4).off().on('tap',function(){
		window.open('user_bespeak.html','_self')
	});
	$('.person-list li').eq(5).off().on('tap',function(){
		window.open('speed.html','_self')
	})
	$('.person-list li').eq(6).off().on('tap',function(){
		window.open('myjunior.html?phone='+userphone,'_self')
	})
})
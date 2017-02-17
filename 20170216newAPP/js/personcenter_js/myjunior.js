$(function(){
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
		reloadIscroll();
	}
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	function reloadIscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	reloadIscroll();
	var strA=window.location.search;
	var userphone=strA.substring(7,strA.length);
	//var userphone=18037681260;
	$.ajax({
		type:'post',
		url:'https://guaiguaixueche.com/ggxc/mylist',
		data:'{"phone":"'+userphone+'"}',
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			//console.log(data)
			if(data.ret.code  ==  1){
				$('.jun-list').css('display','none');
				$('.no-jun').css('display','block')
			}else{
				for(var i=0;i<data.list.length;i++){
					var juntime=data.list[i].createtime;
					var junphone=data.list[i].telephone;
					var junphone=junphone.substring(0,3)+'****'+junphone.substring(7,11);
					var ali=$('<li class="junlist"><div>推荐会员：<span>'+junphone+'</span><span>('+juntime+')</span></div></li>');
					$('#junlistbox').append(ali);
				}
				reloadIscroll();
			}
		}
	})
	$('.for-share-btn').on('tap',function(){
		var openid=localStorage.getItem('openid');
		window.open('http://wx.guaiguaixueche.com/test/share/index.html?openid='+openid,'_self')
	})
})
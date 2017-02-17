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
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	var person_id=localStorage.getItem('person_id');
	var str='http://wx.guaiguaixueche.com/wx/html/loginReg_html/reg.html';
	var url=str+'?ggxc='+person_id;
	jQuery('#qrcode').qrcode({width:400,height:400,typeNumber:10,text: url});
	$('.how-use a').on('tap',function(){
		$('.share-bg').css('display','block');
		$('.how-use-box').css('display','block');
	});
	$('.share-bg').on('tap',function(){
		$('.share-bg').css('display','none');
		$('.how-use-box').css('display','none');
	});
	$('.how-use-box').on('tap',function(){
		$('.share-bg').css('display','none');
		$('.how-use-box').css('display','none');
	})
})
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
	var num=0;
	$.ajax({
		type:"post",
		url:'https://guaiguaixueche.com/exam/list',
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			for(var i=0;i<data.list.length;i++){
				if(data.list[i].km=='1'){
					num++;
					var oLi=$('<li class="list-info"><span class="module-tit">'+data.list[i].sid+'.</span><b class="module-info">'+data.list[i].cname+'</b></li>');
					$('.module-exam-list').append(oLi);
				}
			}
			$('.list-info').on("tap",function(){
				var index=$('.list-info').index($(this));
				localStorage.setItem('num',index);
				window.open('km1-module.html','_self')
			})
			for(var i=0;i<num;i++){
				$('.list-info').eq(i).animate({'top':i*80+'px'},600)
			}
		}
	})
	
})
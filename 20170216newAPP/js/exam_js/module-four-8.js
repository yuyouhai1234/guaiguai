$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		var n=0;
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com/exam/list',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				for(var i=0;i<data.list.length;i++){
					if(data.list[i].km=='4'){
						n++;
						var oLi=$('<li class="for-info"><span class="module-tit">'+data.list[i].sid+'.</span><b class="module-info">'+data.list[i].cname+'</b></li>');
						$('.module-exam-list').append(oLi);
						
					}
				}
				$('.for-info').on("tap",function(){
					var index=$('.for-info').index($(this));
					localStorage.setItem('n',index);
					window.open('km4-module.html','_self')
				})
				forLi(n)
			}
		})
		function forLi(n){
			for(var j=0;j<n;j++){
				$('.for-info').eq(j).animate({'top':j*80+'px'},600);
				//console.log($('.for-info').length)
			}
		}
	}
})
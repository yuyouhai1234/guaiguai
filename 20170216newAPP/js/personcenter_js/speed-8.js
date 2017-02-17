$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}	
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		reloadIscroll()
	}
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	function reloadIscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	$.ajax({
		type:"post",
		url:'https://guaiguaixueche.com/ggxc/who',
		dataType:'json',
		async:false,
		contentType:'application/json;charset=utf-8',
		success:function(data){
			getInfo(data.ip)	
		}		
	})
	function getInfo(path){
		var path=hex_md5(path);
		var user=localStorage.getItem('person_id');	
		$.ajax({			
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/userinfo',
			data:'{"rnd":"'+path+'","user":"'+user+'","type":"'+2+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				if(data.ret.code==0){
					var list=data.traininfo;		
					for(var i=0;i<list.length;i++){
						var speedList=$('<li class="speedList"></li>');
						var speedTime=$('<p>日期:<span>'+list[i].datetime+'</span></p>')
						var speedClass=$('<p>培训进度:<span>'+list[i].cname+'</span></p>')
						$('.speedMsg').append(speedList);
						speedList.append(speedTime);
						speedList.append(speedClass);
					}
					reloadIscroll();
				}else{
					$('.speedNone').css('display','block');
				}	
			}
		})
		
	}
	
})
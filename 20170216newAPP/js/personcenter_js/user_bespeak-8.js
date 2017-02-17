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
	function reloadIscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	$.createHTML=function(selecter,data){
		var temp=$(selecter).html().replace(eval("/<!--/gi"),'').replace(eval("/-->/gi"),'');
		for(var c in data){
			temp=temp.replace(eval("/<data"+c+">/gi"),data[c]);
			}
		return temp;
	}
	$.ajax({
		type:"post",
		url:'https://guaiguaixueche.com/ggxc/who',
		dataType:'json',
		async:false,
		contentType:'application/json;charset=utf-8',
		success:function(data){
			getInfo(data.ip,4)			
		}		
	})
	function getInfo(path,n){
		var path=hex_md5(path);
		var user=localStorage.getItem('person_id');
		$.ajax({
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/userinfo',
			data:'{"rnd":"'+path+'","user":"'+user+'","type":"'+n+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				if(data.ret.code==0){
					var list=data.train_list;
					for(var i=0;i<list.length;i++){
						$('.order-list-cont').append( $.createHTML("#order-info",list[i]));
						if(list[i].state==1){
							$('.quit-bespeak').eq(i).css('display','block');
							$('.despeak-status').eq(i).html('有效');
						}else if(list[i].state==2){
							$('.despeak-status').eq(i).html('已取消');
						}else if(list[i].state==3){
							$('.despeak-status').eq(i).html('爽约');
						}else if(list[i].state==4){
							$('.despeak-status').eq(i).html('教练已确认');
							$('.for-eva').eq(i).css('display','block');
						}else{
							$('.despeak-status').eq(i).html('已评价');	
						}
					}
					reloadIscroll();
					quitBespeak(data);
				}else{
					$('#no-bespeak').css('display','block');
					$('.order-list-cont').css('display','none');
				}
			}
		})
	}
	function quitBespeak(data){
		$('.quit-bespeak').on('tap',function(){
			var index=$('.quit-bespeak').index($(this));
			var user=localStorage.getItem('person_id');
			var details_id=data.train_list[index].details_id;
			var class_id=data.train_list[index].class_id;
			var school_id=data.train_list[index].school_id;
			$.ajax({
				type:'post',
				url:'https://guaiguaixueche.com/ggxc/yy_unsubscribe',
				data:'{"person_id":"'+user+'","details_id":"'+details_id+'","class_id":"'+class_id+'","school_id":"'+school_id+'"}',
				dataType:'json',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					if(data.ret.code==0){
						$('.bg').css('display','block');
						$('.worn-box').css('display','block');
						$('.result-box').html('退订成功');
						$('.despeak-status').eq(index).html('已取消');
						$('.quit-bespeak').eq(index).css('display','none');
					}else{
						$('.bg').css('display','block');
						$('.worn-box').css('display','block');
						$('.result-box').html(data.ret.msg);
					}
				}
			})
		});
		$('.for-eva').on('tap',function(){
			var index=$('.for-eva').index($(this));
			var detailsid=data.train_list[index].details_id;
			localStorage.setItem('detailsid',detailsid);
			window.open('user_eva.html','_self');
		});
		
	}
	$('.bg').on('tap',function(){
		$('.bg').css('display','none');
		$('.worn-box').css('display','none');
	})
	$('#sure-btn').on('tap',function(){
		$('.bg').css('display','none');
		$('.worn-box').css('display','none');
	})
	$('.now-bespeak').on('tap',function(){
		window.open('../../html/bespeak_html/coach.html','_self');
	})
})
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
	function evaInfo(obj1,obj2){
		var aLi = obj1;
		var leng = aLi.length;
		var arr2 = ['../../images/wx-star1.png','../../images/wx-star1.png','../../images/wx-star1.png','../../images/wx-star1.png','../../images/wx-star1.png'];
		var s1 = '';
		aLi.on('tap',function(){
			var i = $(this).index();
			if(i < 2){
				for(var j=0; j<=i; j++){
					aLi.eq(j).find('img').attr('src','../../images/wx-star2.png');
					arr2[j] = aLi.eq(j).find('img').attr('src');
				}
			}else{
				for(var j=0; j<=i; j++){
					aLi.eq(j).find('img').attr('src','../../images/wx-star3.png');
					arr2[j] = aLi.eq(j).find('img').attr('src');
				}
			};
	
			for(var k = i+1; k<leng; k++){
				arr2[k] = '../../images/wx-star1.png';
				aLi.eq(k).find('img').attr('src',arr2[k]);
			};
			obj2.text((i+1)+'.0');
		});
	}
	evaInfo($('.basis-eva-star li'),$('.basis-score-box'));
	evaInfo($('.reput-eva-star li'),$('.reput-score-box'));
	evaInfo($('.teach-eva-star li'),$('.reach-score-box'));
	evaInfo($('.skill-star-box li'),$('.skill-score-box'));
	evaInfo($('.service-star-box li'),$('.service-score-box'));
	evaInfo($('.health-star-box li'),$('.health-score-box'));
	$('#comment-btn').on('tap',function(){
		var school_id=localStorage.getItem('school_id');
		var product_id=localStorage.getItem('product_id');
		var person_id=localStorage.getItem('person_id');
		var basis=parseInt($('.basis-score-box').html());
		var reput=parseInt($('.reput-score-box').html());
		var teach=parseInt($('.reach-score-box').html());
		var com=$('#comment-cont').val();
		$.ajax({
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/evaluate_school',
			data:'{"school_id":"'+school_id+'","product_id":"'+product_id+'","person_id":"'+person_id+'","infrastructure":"'+basis+'","reputation":"'+reput+'","teachers":"'+teach+'","comment":"'+com+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				//console.log(data);
				if(data.ret.code==0){
					$('.bg').css('display','block');
					$('.comment-ret').css('display','block');
					$('.comment-result').html('评价成功！感谢您的支持。');
				}else{
					$('.bg').css('display','block');
					$('.comment-ret').css('display','block');
					$('.comment-result').html('评价失败！您可以再次进行评价，感谢您的支持。');
				}
			}
		})
	})
	$('#com-result-btn').on('tap',function(){
		window.open('../../html/personcenter_html/user_bespeak.html','_self');
	});
	$('.bg').on('tap',function(){
		$('.bg').css('display','none');
		$('.comment-ret').css('display','none');
	});
	$('#comment-coach-btn').on('tap',function(){
		var detailsid=localStorage.getItem('detailsid');
		var person_id=localStorage.getItem('person_id');
		var skill=parseInt($('.skill-score-box').html());
		var service_attitude=parseInt($('.service-score-box').html());
		var car_health=parseInt($('.health-score-box').html());
		var com=$('#comment-coach-cont').val();
		//console.log('{"personid":"'+person_id+'","detailsid":"'+detailsid+'","train_skills":"'+skill+'","service_attitude":"'+service_attitude+'","car_health":"'+car_health+'","comment":"'+com+'"}')
		$.ajax({
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/evaluate_train',
			data:'{"personid":"'+person_id+'","detailsid":"'+detailsid+'","train_skills":"'+skill+'","service_attitude":"'+service_attitude+'","car_health":"'+car_health+'","comment":"'+com+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				//console.log(data);
				if(data.ret.code==0){
					$('.bg').css('display','block');
					$('.comment-ret').css('display','block');
					$('.comment-result').html('评价成功！感谢您的支持。');
				}else{
					$('.bg').css('display','block');
					$('.comment-ret').css('display','block');
					$('.comment-result').html('评价失败!感谢您的支持。');
				}
			}
		})
	})
	$('#comment-result-btn').on('tap',function(){
		window.open('../../html/personcenter_html/user_order.html','_self')
	});
})

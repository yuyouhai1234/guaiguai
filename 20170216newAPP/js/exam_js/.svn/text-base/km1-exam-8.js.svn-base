$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();		
	var questionArr=[];
	(function(){
		for(var i=0;i<100;i++){
			questionArr[i]={};
			questionArr[i].over=false;
			questionArr[i].personAns=[];
			questionArr[i].personAnsColor='';
			}
		})()
	function examTime(){
		var 
			m=45,
			s=0,
			timeNum=m*60+s,
			timer=null;
		timer=setInterval(function(){
			timeNum--;
			if(timeNum<0){
				clearInterval(timer);
				$('.cj-box').slideDown();
				$('.bg-filter').slideDown();
				resBox();
			}
			var minute=Math.floor(timeNum/60);
			minute>=10 ? minute=minute:minute='0'+minute;
			var second=timeNum%60;
			second>=10 ? second=second:second='0'+second;
			$('#exam-time').html(minute+":"+second)
		},1000)
	}
	examTime();
	tmSrart();
	function tmSrart(){
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com/exam/mnks',
			data:'{"km":"1"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){				
				var i=data.index;
				id=data.ssid;
				getTm(i,id);
			}		
		})
	}
	var num=0;
	var sum=0;
	var result=null;
	$('#next-btn').on('tap',function(){
		if(num>=99){
			num=99;
			alert('已经是最后一题了')
		}else{
			num++;
			getTm(num,id);
		}
	})
	$('#prev-btn').on('tap',function(){
		if(num<=0){
			num=0
		}else{
			num--;
			getTm(num,id);
		}
	})
	function getTm(index,sid){
		$.ajax({
			type:"post",
			url:'https://guaiguaixueche.com/exam/mnks',
			data:'{"km":"1","index":'+index+',"ssid":"'+sid+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				getDate(index,data);
				sum=data.ans;
				result=data.hint;	
			}		
		})
		$('.exam-content').empty();
	}
	for(var j=0;j<100;j++){
		var oLi=document.createElement('li');
		$(oLi).html(j+1).addClass('answer-number');
		$('.answer-list').append(oLi)
	}
	$('.answer-number').on('tap',function(){
		num=$('.answer-number').index($(this));
		getTm(num,id);
		$('.answer-card').slideUp();
	})

	$('#answer-sheet').on('tap',function(){
		if($('.answer-card').css('display')=='block'){
			$('.answer-card').slideUp();
		}else{
			$('.answer-card').slideDown();
		}
	})

	function getDate(index,data){
		if(data.txbz==1){
			var oType=$('<span class="judge-type">'+'单选'+'</span>');
		}else{
			var oType=$('<span class="judge-type">'+'多选'+'</span>');
		}
		var oque=$('<div class="question-tit"></div>')
		var oTit=$('<b class="question-cont">'+(index+1)+data.question+'</b>');
		$('.exam-content').append(oque);
		oque.append(oType);
		oque.append(oTit);
		if(data.bmp!=""){
			var picBox=$('<div class="question-img-box"></div>');
			picBox.css('display','block')
			var oPic=$('<img src="http://cdn.guaiguaixueche.com/'+data.bmp+'" class="exam-pic"/>');
			picBox.append(oPic)
			$('.exam-content').append(picBox);
		}else if(data.flash!=''){
			var gifBox=$('<div class="question-img-box"></div>');
			gifBox.css('display','block');
			var src=data.flash;
			var str=src.replace('swf','gif')
			var obj=$('<img src="http://cdn.guaiguaixueche.com/'+str+'" class="exam-pic"/>');
			gifBox.append(obj);
			$('.exam-content').append(gifBox);
		}
		var oOption1=$('<li class="option"><span class="option-btn"/><span class="option-cont">'+data.ans1+'</span></span></li>');
		var oOption2=$('<li class="option"><span class="option-btn"/><span class="option-cont">'+data.ans2+'</span></span></li>');
		var optionBox=$('<ul class="question-option"></ul>');
		optionBox.append(oOption1);
		optionBox.append(oOption2);
		if(data.ans3!=""){
			var oOption3=$('<li class="option"><span class="option-btn"/><span class="option-cont">'+data.ans3+'</span></span></li>');
			optionBox.append(oOption3);
		}
		if(data.ans4!=''){
			var oOption4=$('<li class="option"><span class="option-btn"/><span class="option-cont">'+data.ans4+'</span></span></li>');
			optionBox.append(oOption4);
		}
		$('.exam-content').append(optionBox);
		if(data.txbz==1){
			if(!questionArr[num].over){
			$('.option').on('tap',function(){
				questionArr[num].over=true;
				var i=$('.option').index($(this));
				questionArr[num].personAns.push(i);
				$('.option-btn').removeClass('active').eq(i).addClass('active');
				num++;
				if(num>=100){
					num=100;
					alert('已经是最后一题了')
				}else{
					getTm(num,id);
				}
				
				var ans=data.ans;
				if(ans==parseInt(i+1)){
					questionArr[num-1].personAnsColor="green";
					$('.answer-number').eq(index).addClass('answer-active');
				}else{
					questionArr[num-1].personAnsColor="red";
					$('.answer-number').eq(index).addClass('answer-false-active');
				}
			})
		}else{
			$('.option-btn').eq(questionArr[num].personAns[0]).css({background:questionArr[num].personAnsColor})
			}
		
		}else{
			if(!questionArr[num].over){
			var submitBtn=$('<input type="button" value="提交" id="submit-btn">');
			$('.exam-content').append(submitBtn);
			
			$('.option').on('tap',function(){
				var i=$('.option').index($(this));
				questionArr[num].personAns.push(i+1);
				if($('.option-btn').eq(i).addClass('active').attr('sel')){
					$('.option-btn').eq(i).removeClass('active').removeAttr('sel');
				}else{
					$('.option-btn').eq(i).addClass('active').attr('sel','selected');
				}
			});
			$('#submit-btn').on('tap',function(){
				questionArr[num].over=true;
				var ans=data.ans;
				if(questionArr[num].personAns.sort().join('')==ans){
					questionArr[num].personAnsColor="green";
					$('.answer-number').eq(index).addClass('answer-active');
					}
				else{
					questionArr[num].personAnsColor="red";
					$('.answer-number').eq(index).addClass('answer-false-active');
				}
				num++;
				if(num>=100){
					num=100;
				}
				getTm(num,id);
			})
		}else{
			(function(){
				for(var i=0;i<questionArr[num].personAns.length;i++){
					$('.option-btn').eq(questionArr[num].personAns[i]-1).css({background:questionArr[num].personAnsColor})
					
					}
				})()
		}
		
		}
		
	}
	$('#close-exam').on('tap',function(){
		$('.cj-box').slideDown();
		$('.bg-filter').slideDown();
		resBox();
	})
	$('#again-btn').on('tap',function(){
		window.open('simulate-one.html','_self')
	})
	function resBox(){
		var length=$('.answer-active').length;
		$('.cj-info').html(length);
	}
}	
})
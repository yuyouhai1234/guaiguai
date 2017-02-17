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
	$('.km1-module-header span').on('tap',function(){
		history.go(-1)
	})
	var questionArr=[];
	(function(){
		for(var i=0;i<n;i++){
			questionArr[i]={};
			questionArr[i].over=false;
			questionArr[i].personAns=[];
			questionArr[i].personAnsColor='';
			}
	})()
	var chapter=localStorage.getItem('n');
	var n=0;
	var m=0;
	$.ajax({
		type:"post",
		url:'https://guaiguaixueche.com/exam/list',
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			for(var i=0;i<data.list.length;i++){
				if(data.list[i].km=='4'){
					if(data.list[i].sid==parseInt(chapter)+1){
						num=data.list[i].min_id;
						total=data.list[i].max_id;
						n=total-num;
						getCont(data.list[i].sid,num-1);
						a=num-1;
					}
				}
			}
			
		}
	})
	$('#next-btn').on('tap',function(){
		if(a>=total){
			a=total-1
		}else{
			a++;
			getCont(parseInt(chapter)+1,a);
		}
		if(m>n){
			m=n-1;	
		}else{
			m++;
		}
		
		
	})
	$('#prev-btn').on('tap',function(){
		if(a<=num-1){
			a=num-1;
		}else{
			a--;
			getCont(parseInt(chapter)+1,a)
		}
		if(m<=0){
			m=0
		}else{
			m--
		}
	})
function getCont(chapter,opera){
	$.ajax({
		type:'post',
		url:'https://guaiguaixueche.com/exam/',
		data:'{"km":"4","chapter":"'+chapter+'","direction":"next","operationid":"'+opera+'"}',
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			sum=data.ans;
			result=data.hint;
			getDate(m,data);
		}
	})
	$('.exam-content').empty();
}
	
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
		var bOff=true;
		if(data.txbz==1){
			$('.option').on('tap',function(){
				var index=$('.option').index($(this));
				if(bOff==true){
					$('.option-btn').removeClass('active').eq(index).addClass('active');
					if(index==parseInt(sum-1)){
						var resultBox=$('<div class="exam-result"></div>');
							var oSpan=$('<span class="result">'+'回答正确'+'</span>');
							var oTrue=$('<p class="true-res">答案解析:</p>')
							var cont=$('<p class="result-cont">"'+result+'"</p>');
							resultBox.append(oSpan);
							resultBox.append(oTrue);
							resultBox.append(cont);
							$('.exam-content').append(resultBox);
							bOff=false;
							$('.option-btn').eq(index).css('background','green');
					}else{
						var info=$('.option-cont').eq(sum-1).html();
						var resultBox=$('<div class="exam-result"></div>');
						var oSpan=$('<span class="result">'+'错误'+'</span>');
						var oTrue=$('<p class="true-res">正确答案为'+info+'</p>')
						var cont=$('<p class="result-cont">"'+result+'"</p>');
						resultBox.append(oSpan);
						resultBox.append(oTrue);
						resultBox.append(cont);
						$('.exam-content').append(resultBox);
						bOff=false;
					}
				}
			})
		}else{
			var arr=[];
			var submitBtn=$('<input type="button" value="提交" id="submit-btn">');
			$('.exam-content').append(submitBtn);
			$('.option').on('tap',function(){
				var index=$('.option').index($(this));
				if($('.option-btn').eq(index).addClass('active').attr('sel')){
					$('.option-btn').eq(index).removeClass('active').removeAttr('sel');
				}else{
					$('.option-btn').eq(index).addClass('active').attr('sel','selected');
				}	
			})
			$('#submit-btn').on('tap',function(){
				var options=$('.question-option .active');
				for(var i=0;i<options.length;i++){
					var b=options.eq(i).parent().index();
					arr.push(b+1)
				}
				var str=arr.join('');
				if(str==data.ans){
					var resultBox=$('<div class="exam-result"></div>');
					var oSpan=$('<span class="result">'+'回答正确'+'</span>');
					var cont=$('<p class="result-cont">答案解析：'+result+'</p>');
					resultBox.append(oSpan);
					resultBox.append(cont);
					$('.exam-content').append(resultBox);
					for(var c=0;c<str.length;c++){
						var d=parseInt(str[c])-1;
						$('.option-btn').eq(d).css('background','green');
					}
				}else{
					var resultBox=$('<div class="exam-result"></div>');
					var oSpan=$('<span class="result">'+'错误'+'</span>');
					var oTrue=$('<ul class="true-res">正确答案为:</ul>');
					resultBox.append(oSpan);
					resultBox.append(oTrue);
					for(var a=0;a<data.ans.length;a++){
						//console.log(data.ans[a]-1)
						var info=$('.option-cont').eq(data.ans[a]-1).html();
						var oLi=$('<li class="true-res-info">'+info+'</li>')
						oTrue.append(oLi)
						
					}
					var cont=$('<p class="result-cont">"'+result+'"</p>');
					resultBox.append(cont);
					$('.exam-content').append(resultBox);
				}
			})
		}
	}
})
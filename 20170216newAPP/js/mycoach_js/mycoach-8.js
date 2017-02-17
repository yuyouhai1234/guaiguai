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
	
})	
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	function shuaxinscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	shuaxinscroll();
	var coachid=localStorage.getItem('coachid');
	var rnd=localStorage.getItem('rnd');
	var coach_name=localStorage.getItem('coach_name'); 
	var date='';
	$('#resetBtn').on('tap',function(){
		window.open('reset_pwd.html','_self');
	})
	$('#quitBtn').on('tap',function(){
		localStorage.removeItem('coachid');
		localStorage.removeItem('rnd');
		window.location.href='login.html';
	})
	chongxin(coachid,rnd,date);	 
	function chongxin(coachid,rnd,date){
		var arr=[];
		var arr2=[];
		var arr3=[];
		$.ajax({			
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/coachinfo',
			data:'{"user":"'+coachid+'","rnd":"'+rnd+'","date":"'+date+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				//console.log(data)
				if(data.ret.code=='1'){
					alert('此教练暂无信息')
				}else{
					$('.coach-header span').html(coach_name);
					var list=data.yyinfo;
					for(var i=0;i<list.length;i++){
						var classLi=$('<li class="classMsg"></li>')						
						var classDe=$('<p class="classDe classPerson"></p>');
						var DeImg=$('<img src="../../images/banci.png">');
						var DetTime=$('<span>班次:<span>'+list[i].class_mast.start_time.substr(0,5)+'</span><b> - </b><span>'+list[i].class_mast.end_time.substr(0,5)+'</span></span>');
						var classPer=$('<p class="classPer classPerson"></p>');
						var PerImg=$('<img src="../../images/banci.png">');
						var PerNum=$('<span>人数:</span><span>'+list[i].list.length+'</span>');
						var classPersonTit=$('<p class="classPersonTit">学员信息:</p>');
						$('.class-list').append(classLi);
						classLi.append(classDe);
						classLi.append(classPer);
						classLi.append(classPersonTit);
						classDe.append(DeImg);
						classDe.append(DetTime);
						classPer.append(PerImg);
						classPer.append(PerNum);
						var dad=list[i].list;
						arr.push(dad)
						
					}
					for(var j=0;j<arr.length;j++){
						for(var a=0;a<arr[j].length;a++){
							if(arr[j].length!=0){
								var dad=arr[j];
								arr3.push(dad[a])
								var studetail=$('<ul class="stu-detail stu-"></ul>');
								var stulist=$('<li class="stu-list"></li>');
								var stuTel=$('<p class="stuTel"></p>');
								//var stuTelNam=$('<span>'+dad[j].real_name+'</span>');
								var stuTelSpan=$('<span class="nameTel"><span>'+dad[a].real_name+'</span><span>'+dad[a].telephone+'</span></span>');
								var sucessState=$('<b class="sucessState"></b>')
								var stuBtn=$('<input type="button" name=""  value="" class="stuBtn"/>');
								$('.classMsg').eq(j).append(studetail);
								studetail.append(stulist);
								stulist.append(stuTel);
								//stuTel.append(stuTelNam);
								stuTel.append(stuTelSpan);
								stuTelSpan.append(sucessState);
								stuTel.append(stuBtn);
							}
							
						}
						
					}	
					//console.log(arr3);
						for(var b=0;b<$('.stuBtn').length;b++){
							//console.log(arr3[b].state)
							if(arr3[b].sign=='0'){
								$('.stuBtn').eq(b).css('display','none');
								if(arr3[b].state=='4'||arr3[b].state=='5'){							
									$('.stuBtn').eq(b).val('已签到');
									//$('.stuBtn').eq(b).css('display','none');
									//$('.sucessState').html('(已签到)')
									$('.stuBtn').eq(b).css('display','block');
									$('.stuBtn').eq(b).attr('disabled',"true");
								}else if(arr3[b].state=='2'){
									$('.stu-list').eq(b).css('display','none')
								}else if(arr3[b].state=='3'){
									$('.stuBtn').eq(b).css('display','block');
									$('.stuBtn').eq(b).val('爽约');
									$('.stuBtn').eq(b).attr('disabled',"true")
								}
							}else if(arr3[b].sign=='1'){
								if(arr3[b].state=='4'||arr3[b].state=='5'){							
									$('.stuBtn').eq(b).val('已签到');
									//$('.stuBtn').eq(b).css('display','none');
									//$('.sucessState').html('(已签到)')
									$('.stuBtn').eq(b).attr('disabled',"true");
								}else if(arr3[b].state=='1'){
									$('.stuBtn').eq(b).val('签到');
									var detailsid=arr3[b].details_id;
									var personid=arr3[b].person_id;
									$('.stuBtn').eq(b).attr("onclick","btnYue('"+rnd+"','"+coachid+"','"+detailsid+"','"+personid+"','"+(b)+"')");								
								}else if(arr3[b].state=='2'){
									$('.stu-list').eq(b).css('display','none')
								}else if(arr3[b].state=='3'){
									$('.stuBtn').eq(b).val('爽约');
									$('.stuBtn').eq(b).attr('disabled',"true")
								}
							}
						}						
					
				}
				shuaxinscroll()
				
			}
		})
	}	
	function GetDateStr(AddDayCount) {
	    var dd = new Date();
	    dd.setDate(dd.getDate()+AddDayCount);
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;
	    var d = dd.getDate();
	    return y+"-"+m+"-"+d;
	}	   
		$('.dateMoument').html(GetDateStr(0));
		$('.dateLater').html(GetDateStr(1));
		$('.dateLast').html(GetDateStr(2));
		$('.dateMoument').css('background','#FAD6AF');
		 $('.dateMoument').on('tap',function(){		 	
		 	var date=GetDateStr(0);
		 	var index=$('.date').index($(this))
		 	$('.class-list').empty();
		 	$('.date').css('background','#F5F1E9').eq(index).css('background','#FAD6AF');
		 	chongxin(coachid,rnd,date);
		 })
		  $('.dateLater').on('tap',function(){
		  	var index=$('.date').index($(this))
		 	var date=GetDateStr(1);
		 	$('.class-list').empty();
		 	$('.date').css('background','#F5F1E9').eq(index).css('background','#FAD6AF')
		 	chongxin(coachid,rnd,date);
		 })
		 $('.dateLast').on('tap',function(){
		 	 var index=$('.date').index($(this))
		 	 var date=GetDateStr(2);
		 	$('.class-list').empty();
		 	$('.date').css('background','#F5F1E9').eq(index).css('background','#FAD6AF')
		 	chongxin(coachid,rnd,date);
		 })
	function btnYue(rnd,coachid,detailsid,personid,index){
		 $.ajax({			
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/yysign',
			data:'{"rnd":"'+rnd+'","user":"'+coachid+'","detailsid":"'+detailsid+'","personid":"'+personid+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				//console.log(data)
				if(data.ret.code=='1'){
					alert(data.ret.msg);
					//alert(1)
				}else if(data.ret.code=='0'){				
					alert(data.ret.msg);
					$('.stuBtn').eq(index).val('已签到');
					$('.stuBtn').eq(index).attr('disabled',"true");
					
				}else if(data.ret.code=='-1'){
					alert(data.ret.msg);
				}
			}	
				
		})
	}	
	


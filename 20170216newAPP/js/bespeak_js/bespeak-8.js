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
	var yueDet=localStorage.getItem('person_id');
	//var yueDet='6415ba4a05b3431f8533ec563789b9bd';
	classNew('','','wx','');	
	function classNew(car_id,train_subject,train_date,carIndex){
		var yueDet=localStorage.getItem('person_id');
		//var yueDet='6415ba4a05b3431f8533ec563789b9bd';
		var detail=localStorage.getItem('coach_id');
		//console.log('person_id:'+yueDet+',coach_id:'+detail+',car_id:'+car_id+',train_subject:'+train_subject+',train_date:'+train_date)
		$.ajax({
			type: "POST",
			//url: "http://192.168.18.135:8080/api/list/classes",
			url:'https://guaiguaixueche.com.cn/api/list/classes',
			data: {person_id:yueDet,coach_id:detail,car_id:car_id,train_subject:train_subject,train_date:train_date},	
			async:false,
			cache: false, 
			success: function(data){
				//console.log(data)
				if(data.code=="success"){
					var list=data.coach;
					var teaName=$('<p>教练名称：<span class="teaName">'+list.coach_name+'</span></p>');
					var teaTel=$('<p>联系电话：<span class="teaTel">'+list.telephone+'</span></p>');										
					$('.be-school').append(teaName);
					$('.be-tel').append(teaTel);				
					var carList=data.carlist;
					if(carList.length==0){					
						$('.carDetal').val('没有车辆信息!');
						$('.car-Msg').css('display','block')
						$('.classThr').css('display','none');
						$('.classTwo').css('display','none');
					}else{
						$('.car-Msg').css('display','none')
					}
					var classList=data.classesList;
					//console.log(classList.length)
					if(classList.length==0){						
						$('.class-Msg').css('display','block');
					}else{
						$('.class-Msg').css('display','none');
					}
					$('#saveclass_id').val(data.train_subject);
					//console.log($('#saveclass_id').val())
					if(data.train_subject==2){		
						$("#saveclass_id").val("2");
						$('.classThr').css('display','none');
					}else if(data.train_subject==3){
						$('.classTwo').css('display','none');
						$("#saveclass_id").val("3");
					}
					for(var i=0;i<carList.length;i++){				
						var carLi=$('<li text="'+carList[i].car_id+'">'+carList[i].plate_num+'</li>')
						var carID=carList[i].car_id;
						$('.carDetal-list').append(carLi);						
					}
					if(carIndex==''){
						carIndex=0;
						$('.carDetal').val(carList[carIndex].plate_num);
						$('#saveCar_id').val(carList[carIndex].car_id);
					}else{
						carIndex=carIndex;
						$('.carDetal').val(carList[carIndex].plate_num);
						$('#saveCar_id').val(carList[carIndex].car_id);
					}				
					for(var j=0;j<classList.length;j++){
						var calssDl=$('<dl class="times"></dl>')
						var calssDt=$('<dt class="times-msg"></dt>')
						var calssDd=$('<dd class="times-btn"></dd>')
						var yuyueBtn=$('<input type="button"  value="预约"  id="yuyueBtn_'+j+'" class="yuyueBtn"/>')
						var timeMsg=$('<p>班次：<span>'+classList[j].start_time.substr(0,5)+'</span><b> - </b><span>'+classList[j].end_time.substr(0,5)+'</span></p>');
						var perMsg=$('<p>剩余：<span class="per-surplus">'+classList[j].surplus_count+'</span>人</p>');
						var stateMsg='<p>状态：<span class="MSG-yue"></span></p>';
						var classID=classList[j].class_id;						
						$('.iscoll').append(calssDl);
						calssDl.append(calssDt);
						calssDl.append(calssDd);
						calssDt.append($(timeMsg));
						calssDt.append(perMsg);
						calssDt.append(stateMsg);
						calssDd.append(yuyueBtn);
						var timeBegin=classList[j].start_time;
						var timeEnd=classList[j].end_time;
						var index=$('.times').length;						
						if(classList[j].is_order==1){
							$('.MSG-yue').eq(index-1).html('(已预约过)');
							$('.yuyueBtn').eq(index-1).css('display','none');
						}else if(classList[j].is_order==0){
							if(classList[j].surplus_count==0){
								$('.MSG-yue').eq(index-1).html('已预约满');
								$('.yuyueBtn').eq(index-1).css('display','none');
							}else{
								if(classList[j].flag==1){
									$('.MSG-yue').eq(index-1).html('可预约');
									//console.log(classID+"','"+carID+"','"+train_date+"','"+timeBegin+"','"+timeEnd+"','"+yueDet+"','"+(index-1))
									$('.yuyueBtn').eq(index-1).attr("onclick",
								"btnYue('"+classID+"','"+carID+"','"+train_date+"','"+timeBegin+"','"+timeEnd+"','"+yueDet+"','"+(index-1)+"')");	
								}else if(classList[j].flag==0){
									$('.MSG-yue').eq(index-1).html('不可预约');
									$('.yuyueBtn').eq(index-1).css('display','none');
								}
							}
						}							
					}
					$('.iscoll dl:last-child').css('border-bottom','0');					
					var dateList=data.train_date_list;
					for(var k=0;k<dateList.length;k++){
						var dateMsg="";
						if(train_date==dateList[k]){
							dateMsg = $('<option value="'+dateList[k]+'" selected >'+dateList[k]+'</option>');
						} else {
							dateMsg = $('<option value="'+dateList[k]+'">'+dateList[k]+'</option>');
						}						
						$('.select').append(dateMsg);
						$("#headerSubject").val(dateList[k])					
					}
					$('#date_mou').val($('.select').find('option:selected').text());
					shuaxinscroll();
				}
			}			
		})
		carBtn();		
	}
	$('.carDetal').on('tap',function(){
		$('.carDetal-list').css('display','block')
		setTimeout(function(){
			$('.carDetal-list').css('display','none')
		},5000)
	})	
	function carBtn(){				
		$('.carDetal-list li').on('tap',function(){	
			$('.carDetal-list').css('display','none')
			var index=$('.carDetal-list li').index($(this));
			$('.carDetal').val($('.carDetal-list li').eq(index).html())
			$('#saveCar_id').val($('.carDetal-list li').eq(index).attr('text'))
			$('.be-school p').empty();
		 	$('.be-tel p').empty();		 	
			$('.iscoll dl').remove();
			$('.select').empty();				
			$('.carDetal-list').empty();
			
			classNew($('#saveCar_id').val(),$("#saveclass_id").val(),$('#date_mou').val(),index);			    
		})		
	}
	function dateChange(date){
		var inputValue=$('.carDetal').val();
		var doo='';
		for(var m=0;m<$('.carDetal-list li').length;m++){
			if(inputValue==$('.carDetal-list li').eq(m).html()){
				doo=m;
			}
		}
		$('#date_mou').val(date);	
		$('.be-school p').empty();
	 	$('.be-tel p').empty();		 	
		$('.carDetal-list').empty();
		$('.iscoll dl').remove();
		$('.select').empty();
		
		classNew($("#saveCar_id").val(), $("#saveclass_id").val(), date,doo);
	}	
	$('.dateBefore').on('tap',function(){
		var inputValue=$('.carDetal').val();
			var doo='';
			for(var m=0;m<$('.carDetal-list li').length;m++){
				if(inputValue==$('.carDetal-list li').eq(m).html()){
					doo=m;
				}
			}
		var leng=$('.select option');				
		for(var i=0;i<leng.length;i++){
			if($('.select option').eq(i).attr('selected')=='selected'&&(i!=0)){	
				$('.select option').eq(i).removeAttr('selected')
				$('.select option').eq(i-1).attr('selected','selected')
				$('#date_mou').val($('.select option').eq(i-1).val())	
			}		
		}
		$('.be-school p').empty();
	 	$('.be-tel p').empty();		 	
	 	$('.carDetal-list').empty();
		$('.iscoll dl').remove();
		$('.select').empty();
		//console.log($('#saveCar_id').val(),$("#saveclass_id").val(),$('#date_mou').val(),doo)
		classNew($("#saveCar_id").val(),$("#saveclass_id").val(),$('#date_mou').val(),doo);
	})
	$('.dateLater').on('tap',function(){
		var inputValue=$('.carDetal').val();
		var doo='';
		for(var m=0;m<$('.carDetal-list li').length;m++){
			if(inputValue==$('.carDetal-list li').eq(m).html()){
				doo=m;
			}
		}
		var leng=$('.select option');			
		for(var i=leng.length;i>=0;i--){
			if($('.select option').eq(i).attr('selected')=='selected'&&(i!=leng.length-1)){										
				$('.select option').eq(i).removeAttr('selected')
				$('.select option').eq(i+1).attr('selected','selected')	
				$('#date_mou').val($('.select option').eq(i+1).val())	
			}		
		}		
		$('.be-school p').empty();
	 	$('.be-tel p').empty();
	 	$('.carDetal-list').empty();
		$('.iscoll dl').remove();
		$('.select').empty();		
		classNew($("#saveCar_id").val(),$("#saveclass_id").val(),$('#date_mou').val(),doo);		
	})
function btnYue(classID,carID,train_date,timeBegin,timeEnd,yueDet,index){	
	$.ajax({
		type: "POST",
		//url: "http://192.168.18.135:8080/api/appointment",
		url:'https://guaiguaixueche.com.cn/api/appointment',
		data: {class_id:classID,car_id:carID,train_date:train_date,start_time:timeBegin,end_time:timeEnd,person_id:yueDet},						
		async:false,
		cache: false, 
		success: function(data){
			//console.log(data)
			if(data.code=="success"){
				alert(data.content);
				var inputValue=$('.carDetal').val();
				var doo='';
				for(var m=0;m<$('.carDetal-list li').length;m++){
					if(inputValue==$('.carDetal-list li').eq(m).html()){
						doo=m;
					}
				}
				$('.be-school p').empty();
			 	$('.be-tel p').empty();		 	
			 	$('.carDetal-list').empty();
				$('.iscoll dl').remove();
				$('.select').empty();
				//console.log($('#saveCar_id').val(),$("#saveclass_id").val(),$('#date_mou').val(),doo)
				classNew($("#saveCar_id").val(),$("#saveclass_id").val(), $('#date_mou').val(),doo);
			}else if(data.code=="already"){
				alert(data.content);
			}else if(data.code=="fail"){
				alert(data.content);
			}else if(data.code=="exceed_time"){
				alert(data.content);
			}else if(data.code=="zero"){
				alert(data.content);
			}else if(data.code=="error"){
				alert(data.content);
			}
		}
	})	
}

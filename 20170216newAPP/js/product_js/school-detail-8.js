$(document).ready(function(){
	$.createHTML=function(selecter,data){
		var temp=$(selecter).html().replace(eval("/<!--/gi"),'').replace(eval("/-->/gi"),'');
		for(var c in data){
			temp=temp.replace(eval("/<data"+c+">/gi"),data[c]);
			}
		return temp;
	}
	var schoolId=localStorage.getItem('school_id');
	//console.log(schoolId)
	var datas=[];
	$.ajax({
		url:'https://guaiguaixueche.com.cn/api/detail/school',
		type:'post',
		dataType:'json',
		data:{school_id:schoolId},	
		success:function(data){
			console.log(data)
			schoolInfo(data)
			datas[0]=data.schoolMessage;
			datas[1]=data.productList;
			datas[2]=data.coachList;
			datas[3]=data.commentList;
			for(var i=0;i<datas[1].length;i++){
				$('.school-iscroll').append( $.createHTML("#productlist",datas[1][i]) );
			}
			$('.list-tit').removeClass('school-menu-diff').eq(1).addClass('school-menu-diff');
			shuaxinscroll();
			appintBtn(datas,$('.appoint-btn'),$('.personPlus'));
		}
	})
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	!function(){function c(){
		b.style.fontSize=Math.min(window.innerWidth,640)/320*a+"px"}
	if(window.addEventListener){
		var a=20,b=document.getElementsByTagName("html").item(0);window.addEventListener("resize",c),c()}
	}();
	var myScroll=new IScroll('#wrapper',{
        snap:false,
        hScrollbar:false
	})
	function shuaxinscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		$('.list-tit').on('tap',function(){
			var index=$('.list-tit').index($(this));
			var arr1=[];
			var arr2=[];
			var arr3=[];
			$('.list-tit').removeClass('school-menu-diff').eq(index).addClass('school-menu-diff');
			if(index==0){
				$('.school-iscroll').html('').append($.createHTML("#jianjie",datas[index]));
				shuaxinscroll();
			}
			if(index==1){
				$('.school-iscroll').html('');
				for(var i=0;i<datas[index].length;i++){
					$('.school-iscroll').append( $.createHTML("#productlist",datas[index][i]) );
				}
				shuaxinscroll();
				appintBtn(datas,$('.appoint-btn'),$('.personPlus'));
			}
			if(index==2){
				$('.school-iscroll').html('')
				for(var i=0;i<datas[index].length;i++){
					$('.school-iscroll').append( $.createHTML("#coachList",datas[index][i]));
				}
				shuaxinscroll();
				showStar($('.skill-box'),$('.skill-box .del-star'),$('.skill-containter'));
				showStar($('.attitude-box'),$('.attitude-box .del-star'),$('.attitude-cont'));
				showStar($('.health-box'),$('.health-box .del-star'),$('.health-cont'));
			}
			if(index==3){
				$('.school-iscroll').html('');
				for(var i=0;i<datas[index].length;i++){
					$('.school-iscroll').append( $.createHTML("#evaluate-box",datas[index][i]));
				}
				shuaxinscroll();
			}
		})
	}
	function schoolInfo(data){
		var schoolMessage=data.schoolMessage;
		var schoolPic=$('<img src="'+schoolMessage.school_icon+'">');
		$('.school-pic').append(schoolPic);
		var schoolName=$('<span class="tit-info sch-name">'+schoolMessage.school_name+'</span>');
		$('.name-box').append(schoolName);
		var score=schoolMessage.totalScore;
		if(score==undefined){
			score=4.5
		}else{
			score=score;
		}
		var schoolEva=$('<span class="tit-info school-eva" skill="'+score+'"></span>');
		var addStar=$('<span class="add-star"></span>');
		var delStar=$('<span class="del-star"></span>');
		schoolEva.append(addStar);
		schoolEva.append(delStar);
		$('.eva-box').append(schoolEva);
		var phone=schoolMessage.hotline;
		if(phone==undefined){
			phone=''
		}else{
			phone=phone;
		}
		var tel=$('<span class="tit-info tel">'+phone+'</span>');
		$('.tel-box').append(tel);
		var add=schoolMessage.school_address;
		if(add==undefined){
			add=''
		}else{
			add=add;
		}
		var add=$('<span class="tit-info school-add">'+add+'</span>');
		$('.add-box').append(add);
		showStar($('.school-eva'),$('.school-eva .del-star'),$('.school-eva'));
	}
	var det=localStorage.getItem('person_id');
	function appintBtn(data,obj,obj1){
		var arr1=[];
		var arr2=[];
		var arr3=[];
		arr1.push(data[0].school_id);
		for(var i=0;i<data[1].length;i++){
			arr2.push(data[1][i].product_id);
			arr3.push(data[1][i].coupon);
		}
		obj.on('tap',function(){
			var index=$('.appoint-btn').index($(this));
			var schoolId=arr1[0];
			var productId=arr2[index];
			var coupon=arr3[index];
			if(det==null){
				alert('请登录！');
				window.open('../../html/loginReg_html/login.html?from=detail','_self');
			}else{
				$.ajax({
					url:'https://guaiguaixueche.com/employee/toOrder',
					type:"post",
					dataType:'json',
					contentType:'application/json;charset=utf-8',
					data:JSON.stringify({person_id:det,product_id:productId,school_id:schoolId,pay_price:coupon}),
					success:function(data){
						
						if(data.msgid == -7){
							alert('您已经报过名了，可以去个人中心查看详情');
							window.open('../../html/personcenter_html/personcenter.html','_self');
						}else if(data.msgid == -8){
							alert(data.msg)
						}else if(data.msgid == -9){
							alert('系统异常，请稍后重使')
						}else if(data.msgid == 0){
							alert('报名成功');
							console.log(data)
							var str=JSON.stringify(data.bminfo);
							localStorage.setItem('bmInfo',str);
							
							var perNumber=parseInt(obj1.eq(index).html());
							if(perNumber>0){
								perNumber--;
							}else{
								perNumber=0;
							}
							obj1.eq(index).html(perNumber)														
							$('.appoint-btn').css('background','#F85F0D').eq(index).css('background','#E4E4E4');
							window.open('pay.html','_self');
						}
					}		
				})
				
			} 
		})
	}
	function showStar(obj1,obj2,obj3){
		for(var i=0;i<obj3.length;i++){
			var con_wid=obj1.eq(i).outerWidth();
	        var del_star=obj2.eq(i);
	        var n=obj3.eq(i).attr('skill')
	        var del_move=(n*con_wid)/5;
	        del_star.css('backgroundPosition',-del_move+"px 0px");
	        del_star.css('left',del_move+"px");
		}
        
   }
})

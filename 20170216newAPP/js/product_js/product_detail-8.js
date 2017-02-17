$(document).ready(function(){
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
	var design_id=localStorage.getItem('design_id');
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
		//shuaxinscroll();
	}
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
//	function shuaxinscroll(){
//		myScroll.refresh()
//		setTimeout(function(){myScroll.refresh()},1000)
//		setTimeout(function(){myScroll.refresh()},3000)
//		setTimeout(function(){myScroll.refresh()},6000)
//	}
	function shuaxinscroll(){
		setTimeout(function(){myScroll.refresh()},500)
	}
	var arr=[];
	productList(design_id,'')
	function productList(design_id,schoolName){
		$.ajax({
			url:'https://guaiguaixueche.com.cn/api/list/school',
			type:"post",
			dataType:'json',
			async:false,
			cache: false,
			data:{design_id:design_id,school_name:schoolName},
			success:function(data){
				//console.log(data)
				if(data.code=="success"){
					var list=data.list;
					for(var i=0;i<list.length;i++){
						var oBox=$('<div class="list-box"></div>')
						var detailDl=$('<dl class="detail-list"></dl>');
						var detailDt=$('<dt class="detail-pic"></dt>');
						var detailDd=$('<dd class="detail-cont"></dd>');
						var detailDlPic=$('<img src="http://cdn.guaiguaixueche.com/'+list[i].product_pic+'">');
						//var detailDlPic=$('<img class="pic" src="../../images/Avatar.png">');
						var detailName=$('<p class="product-school-name">驾校名称：<span>'+list[i].school_name+'</span></p>');
						var detailPerNum=$('<p>剩余人数：<span class="personPlus">'+list[i].amount+'</span>人</p>');
						var detailPice=$('<p>驾校报价：<span class="school-price">￥'+list[i].sum_price+'</span></p>');
						var detailCutPiec=$('<p>支付定金：<span class="cut-price">￥'+list[i].coupon+'</span><br><span class="cut-info">(线上支付线下可享受<b>'+list[i].coupon_price+'</b>元优惠)</span></p>');
						var detailServices=$('<div class="service-txt">服务标准:</div>');
						var oUl=$('<ol></ol>');
						if(list[i].service_standard==undefined){
							list[i].service_standard='';
						}else{
							list[i].service_standard=list[i].service_standard;
							var str=list[i].service_standard;
							var standArr=str.split(',');
							for(var j=0;j<standArr.length;j++){
								var oLi=$('<li class="stand-cont"><span>('+(j+1)+')</span>'+standArr[j]+'</li>');
								oUl.append(oLi);
							}
						}
						detailServices.append(oUl);
						var detailBtn=$('<input type="button" value="我要报名" class="appoint-btn">');
						$('.detail-main-box').append(oBox);						
						detailDl.append(detailDt);
						detailDl.append(detailDd);
						detailDt.append(detailDlPic);
						detailDd.append(detailName);
						detailDd.append(detailPerNum);
						detailDd.append(detailPice);
						detailDd.append(detailCutPiec);
						oBox.append(detailDl);
						oBox.append(detailServices);
						oBox.append(detailBtn);
						//$(".pic").eq(i).attr('src',"http://cdn.guaiguaixueche.com/"+list[i].product_pic)
						arr.push(list[i].school_id);
						shuaxinscroll();
					}
					shuaxinscroll();
					$('.detail-pic').off().on('tap',function(){									
						var index=$('.detail-pic').index($(this));
						localStorage.setItem('school_id',arr[index]);
						window.open('school-detail.html','_self')
					})
					$('.product-school-name').off().on('tap',function(){									
						var index=$('.product-school-name').index($(this));
						localStorage.setItem('school_id',arr[index]);
						window.open('school-detail.html','_self')
					})
					bmFun(data)
				}
			}
		})
	}

	
	$('.search-btn').on('tap',function(){		
		$('.detail-main-box').empty();
		productList(design_id,$('.search-txt').val())
	})
	var det=localStorage.getItem('person_id');
	function bmFun(datas){
		var arr1=[];
		var arr2=[];
		var arr3=[];
		for(var i=0;i<datas.list.length;i++){
			arr1.push(datas.list[i].product_id);
			arr2.push(datas.list[i].school_id);
			arr3.push(datas.list[i].coupon);
		}
		$('.appoint-btn').off().on('tap',function(){
			var index=$('.appoint-btn').index($(this));
			var product_id=arr1[index];
			var school_id=arr2[index];
			var pay_price=arr3[index];
			if(det==null){
				alert('请登录！');
				window.open('../../html/loginReg_html/login.html?from=detail','_self');
			}else{
				$.ajax({
					url:'https://guaiguaixueche.com/employee/toOrder',
					type:"post",
					dataType:'json',
					contentType:'application/json;charset=utf-8',
					data:JSON.stringify({person_id:det,product_id:product_id,school_id:school_id,pay_price:pay_price}),
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
							var perNumber=parseInt($('.personPlus').eq(index).html());
							if(perNumber>0){
								perNumber--;
							}else{
								perNumber=0;
							}
							$('.personPlus').eq(index).html(perNumber)														
							$('.appoint-btn').css('background','#F85F0D').eq(index).css('background','#E4E4E4');
							window.open('pay.html','_self');
						}

					}		
				})
			}
		})
	}
	
})
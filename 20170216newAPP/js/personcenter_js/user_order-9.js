$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}	
	var myScroll=new IScroll('#wrapper',{
		vScroll:false,
        snap:false,
        hScrollbar:false
	})
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
	
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
			getInfo(data.ip,3)			
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
					for(var i=0;i<data.order_list.length;i++){
						$('.order-list-cont').append( $.createHTML("#order-info",data.order_list[i]));
						var state=data.order_list[i].state;
						if(state==1){
							$('.no-payed').eq(i).css('display','block');
							$('.quit-order').eq(i).css('display','block');
							$('.order-status').eq(i).html('未付款');
						}else if(state==2){
							$('.no-payed').eq(i).css('display','none');
							$('.quit-order').eq(i).css('display','block');
							$('.order-status').eq(i).html('已支付（到驾校确认）');
						}else if(state==3){
							$('.no-payed').eq(i).css('display','none');
							$('.quit-order').eq(i).css('display','block');
							$('.order-status').eq(i).html('驾校已确认');
							$('.eva-school').eq(i).css('display','block');
						}else if(state==4){
							$('.order-status').eq(i).html('退款中');
						}else if(state==5){
							$('.order-status').eq(i).html('已退款');
						}else if(state==6){
							$('.order-status').eq(i).html('已取消');
						}
					}
					reloadIscroll();
					quitOrder(data);
					forPay(data);
				}else{
					$('.no-order').css('display','block')
				}
			}
		})
	}
	var openid=localStorage.getItem('openid');
	function forPay(data){
		setTimeout(function(){
			for(var i=0;i<$('.no-payed').length;i++){
				$('.no-payed').eq(i).attr('clicked','');
			}
		},500)
		$('.no-payed').off().on('tap',function(){
			var index=$('.no-payed').index($(this));
			var orderId=data.order_list[index].order_id;
			if($('.no-payed').eq(index).attr('clicked')==''){
				$('.no-payed').eq(index).attr('clicked','clicked');
				$.ajax({
					type: "POST",
					url:"https://guaiguaixueche.com.cn/api/wxJSpay",
					data:{order_id:orderId,openid:openid},
					dataType:'json',
					success: function(data){
						$('.no-payed').eq(index).attr('clicked','');
						if(data.code=='success'){
							var cont=data.content;
							pay(cont);
						}else{
							alert(data.content);
						}
					}
				})
				
			}	
		})
	}

	function pay(map){   
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		}else{
			onBridgeReady(map);
		}
	}
	function onBridgeReady(map){
		var appId = map.appId;
		var timeStamp = map.timeStamp;
		var nonceStr = map.nonceStr;
		var pacKage = map.pg;
		var signType = map.signType;
		var paySign =  map.paySign;
		var order_id = map.order_id;
		//console.log("appId=" + appId +",timeStamp=" +timeStamp +",nonceStr=" +nonceStr+",pacKage="+pacKage+",signType="+signType+",paySign="+paySign+",order_id="+order_id);
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',{
				"appId" : appId,     	
				"timeStamp": timeStamp, 
				"nonceStr" : nonceStr,  
				"package" : pacKage,
				"signType" : signType,  
				"paySign" : paySign     
			},
	
		function(res){
			if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				/*$.ajax({
					type:'post',
					url:'https://guaiguaixueche.com.cn/api/udState',
					data:{order_id:order_id},
					async:false,
					dataType:'json',
					success:function(data){
						
					}
				})*/
				alert('支付成功');
				window.open('../../html/personcenter_html/user_order.html?'+new Date().getTime(),'_self');
			} else if (res.err_msg == "get_brand_wcpay_request:fail"){
				alert('支付失败');
	       } else if (res.err_msg == "get_brand_wcpay_request:cancel"){
	       	
	        }    
		}
	)
	}
function quitOrder(data){
	$('.quit-order').on('tap',function(){
		var index=$('.quit-order').index($(this));
		var product_id=data.order_list[index].product_id;
		var school_id=data.order_list[index].school_id;
		var order_id=data.order_list[index].order_id;
		var user=localStorage.getItem('person_id');
		var state=data.order_list[index].state;
		$.ajax({
			type:'post',
			url:'https://guaiguaixueche.com/ggxc/order_unsubscribe',
			data:'{"person_id":"'+user+'","order_id":"'+order_id+'","product_id":"'+product_id+'","school_id":"'+school_id+'","state":"'+state+'"}',
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success:function(data){
				if(data.ret.code==0){
					if(state==1){
						alert('订单已取消');
						$('.order-status').eq(index).html('已取消');
						$('.quit-order').eq(index).css('display','none');
						$('.no-payed').eq(index).css('display','none');
					}else{
						alert('正在退款中');
						$('.order-status').eq(index).html('退款中');
						$('.quit-order').eq(index).css('display','none');
						$('.eva-school').eq(index).css('display','none');
					}
					
				}else{
					alert(data.ret.msg);
				}
			}
		})
	})
	$('.eva-school').on('tap',function(){
		var index=$('.eva-school').index($(this));
		localStorage.setItem('school_id',data.order_list[index].school_id);
		localStorage.setItem('product_id',data.order_list[index].product_id);
		window.open('eva-school.html?'+new Date().getTime(),'_self');
	});
}
$('.now-check').on('tap',function(){
	window.open('../../html/product_html/product_list.html?'+new Date().getTime(),'_self');
})
}
})
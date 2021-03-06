$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}
	window.onload=window.onresize=function(){
	bodyScale();
	$('html,body').show();
	
	var bmInfo=localStorage.getItem('bmInfo');
	var obj=JSON.parse(bmInfo);
	var orderBox=$('<dl class="pay-info"></dl>');
	var pic=$('<img src="http://cdn.guaiguaixueche.com/'+obj.product_pic+'">');
	var picBox=$('<dt class="order-pic"></dt>');
	picBox.append(pic);
	var name=$('<p>驾校名称：<span class="order-diff">'+obj.school_name+'</span></p>');
	var proName=$('<p>产品名称：<span class="order-diff">'+obj.product_name+'</span></p>');
	var price=$('<p>支付金额：<span class="order-diff">￥'+obj.pay_price+'</span></p>');
	var date=$('<p>报名时间：<span class="order-diff">'+obj.order_datetime+'</span></p>');
	var orderInfo=$('<dd class="order-cont"></dd>');
	orderInfo.append(name);
	orderInfo.append(proName);
	orderInfo.append(price);
	orderInfo.append(date);
	orderBox.append(picBox);
	orderBox.append(orderInfo);
	$('.pay-box').append(orderBox);
	var orderId= obj.order_id;
	var openid=localStorage.getItem('openid');
	$('#pay-btn').on('tap',function(){
		if($('#pay-btn').attr('clicked')==''){
			$('#pay-btn').attr('clicked','clicked');
			$.ajax({
				type:'post',
				url:'https://guaiguaixueche.com.cn/api/wxJSpay',
				data:{order_id:orderId,openid:openid},
				dataType:'json',
				success:function(data){
					$('#pay-btn').attr('clicked','');
					if(data.code=='success'){
						var cont=data.content;
						pay(cont);	
					}else{
						alert(data.content);
						$('#pay-btn').attr('clicked','');
					}
				}
			})
			
		}
		
	})

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
						dataType:'json',
						async:false,
						success:function(data){
							
						}
					})*/
					alert('支付成功');
					localStorage.removeItem('bmInfo');
					window.open('../../index.html','_self');
				} else if (res.err_msg=="get_brand_wcpay_request:fail"){
					alert('支付失败');
					
		      } else if (res.err_msg=="get_brand_wcpay_request:cancel"){
		        }
			}
		)
	}
}
})
$(document).ready(function(){
	function bodyScale(){
		var devicewidth=document.documentElement.clientWidth;
		var scale=devicewidth/640;
		document.body.style.zoom=scale;
	}	
	window.onload=window.onresize=function(){
		bodyScale();
		/*var myScroll=new IScroll('#wrapper',{
			vScroll:false,//禁止垂直滚动
	        snap:false,//执行传送带效果
	        hScrollbar:false//隐藏水平方向上的滚动条
		})*/
		var person_id=localStorage.getItem('person_id');
		var str='http://wx.guaiguaixueche.com/wx/html/loginReg_html/reg.html';
		var url=str+'?ggxc='+person_id;
		jQuery('#qrcode').qrcode({width:200,height:200,typeNumber:10,text: url});
		//从 canvas 提取图片 image
		function convertCanvasToImage(canvas) {
		    //新Image对象，可以理解为DOM
		    var image = new Image();
		    // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
		    // 指定格式 PNG
		    image.src = canvas.toDataURL("image/png");
		    return image;
		}
	
		//获取网页中的canvas对象
		
		var mycanvas1=document.getElementsByTagName('canvas')[0];
		
		//将转换后的img标签插入到html中
		
		var img=convertCanvasToImage(mycanvas1);
		$('#qrcode').css('display','none');
		$('#imagQrDiv').append(img);//imagQrDiv表示你要插入的容器id
		/*使用攻略*/
		setInterval(function(){
			$('.how-user').stop(true).animate({top:'0px'},500).animate({top:'20px'},500);
		},1000);
		$('.how-user').on('tap',function(){
			$('.use-bg').css('display','block');
			$('.use-cont').css('display','block');
		});
		$('.use-bg').on('tap',function(){
			$('.use-bg').css('display','none');
			$('.use-cont').css('display','none');
		});
		$('.use-cont').on('tap',function(){
			$('.use-bg').css('display','none');
			$('.use-cont').css('display','none');
		});
		var nickname,headimgurl;
	    var userinfostr=window.location.search;
	    if(userinfostr==''){
	    	var useropenid=localStorage.getItem('openid');
	   		$.ajax({
	    		async:false,
				type:'post',
				url:"http://wx.guaiguaixueche.com/redbag/user",
				data:'{"openid":"'+useropenid+'"}',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					nickname=data.nickname;
					headimgurl=data.headimgurl;
					$('#username').html(nickname);
					$('#userimg').attr('src',headimgurl);	
				}
			})
	    }else{
			var userinfoarr=userinfostr.split('&');
		    nickname=userinfoarr[userinfoarr.length-2].substring(5,userinfoarr[userinfoarr.length-2].length);
		    headimgurl=userinfoarr[userinfoarr.length-1].substring(4,userinfoarr[userinfoarr.length-1].length);
		    $('#username').html(decodeURI(nickname));
			$('#userimg').attr('src',headimgurl);	
	    }
		$.ajax({
			type: "post",
			url:"http://wx.guaiguaixueche.com/redbag/jssdk",
			dataType:'json',
			contentType:'application/json;charset=utf-8',
			success: function(data){
				wx.config({
		            debug: false,
		            appId: 'wx31c78285677a7222',
			        timestamp: data.timestamp,
			        nonceStr: data.nonceStr,
			        signature: data.signature,
		            jsApiList: [
		                // 所有要调用的 API 都要加到这个列表中
		                'onMenuShareAppMessage',
		                'onMenuShareTimeline'
		            ]
		       })	
			}
		})
        var share_title="乖乖学车，一步到位";
        var share_desc="(1)注册会员能抢红包;(2)分享能赚钱;(3)更多服务请关注公众号";
        var share_image="http://my.guaiguaixueche.com/ggxc.png";
        var share_link=window.location.href+'&name='+nickname+'&img='+headimgurl;
        wx.ready(function () {
            // 在这里调用 API
            wx.onMenuShareAppMessage({
                title: share_title, // 分享标题
                desc: share_desc, // 分享描述
                link: share_link, // 分享链接
                imgUrl: share_image, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数	
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareTimeline({
                title: share_title, // 分享标题
                link: share_link, // 分享链接
                imgUrl: share_image, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
		setTimeout(function(){
			$('html,body').show();
		},100)
		
	}
})
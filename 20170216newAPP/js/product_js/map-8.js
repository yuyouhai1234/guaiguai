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
	window.onload=window.onresize=function(){
		bodyScale();
		$('html,body').show();
	}
	var myScroll=new IScroll('#wrapper',{
        vScroll:false,
        hScrollbar:false,
        snap:false
	})
	function shuaxinscroll(){
		setTimeout(function(){myScroll.refresh()},50)
	}
		// 初始化地图
		var map = new BMap.Map('map');
		var point = new BMap.Point();
		map.centerAndZoom(point,13);
		map.enableScrollWheelZoom();
		map.addControl(new BMap.NavigationControl());
		map.addControl(new BMap.ScaleControl());
		map.addControl(new BMap.GeolocationControl());
		
		var geolocation = new BMap.Geolocation();    
		var gc = new BMap.Geocoder();     
		geolocation.getCurrentPosition( function(r) {   //定位结果对象会传递给r变量  
		        if(this.getStatus() == BMAP_STATUS_SUCCESS){ 
		        	//通过Geolocation类的getStatus()可以判断是否成功定位。  
		            var pt = r.point;  
		            map.centerAndZoom(pt,11);  
		            gc.getLocation(pt, function(rs){  
		                var addComp = rs.addressComponents;  
		                var point=rs.point;
		                $('.user-add').html(addComp.street+addComp.streetNumber);
		                $('.add-detail').html(rs.address)
		                $('.user-add').off().on('tap',function(){
		                	if($('.add-detail').css('display')=='none'){
		                		$('.add-detail').css('display','block');
		                	}else{
		                		$('.add-detail').css('display','none');
		                	}	
		                })
		                $('.sanjiao').off().on('tap',function(){
		                	if($('.add-detail').css('display')=='none'){
		                		$('.add-detail').css('display','block');
		                	}else{
		                		$('.add-detail').css('display','none');
		                	}
		                	
		                })  
		                rim(point.lng,point.lat,'');
		                $('#user-search-btn').off().on('tap',function(){
							var val=$('.user-search-txt').val();
							$('.map-list-info').empty();
							rim(point.lng,point.lat,val);
						})
		            }); 
		            
		        } else {  
		            //关于状态码    
		            //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。    
		            //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。    
		            //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。    
		            //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。    
		            //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。    
		            //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。    
		            //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)    
		            //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)    
		            //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)    
		            switch( this.getStatus() ) {  
		                case 2:  
		                    alert( '位置结果未知 获取位置失败.' );  
		                break;  
		                case 3:  
		                    alert( '导航结果未知 获取位置失败..' );  
		                break;  
		                case 4:  
		                    alert( '非法密钥 获取位置失败.' );  
		                break;  
		                case 5:  
		                    alert( '对不起,非法请求位置  获取位置失败.' );  
		                break;  
		                case 6:  
		                    alert( '对不起,当前 没有权限 获取位置失败.' );  
		                break;  
		                case 7:  
		                    alert( '对不起,服务不可用 获取位置失败.' );  
		                break;  
		                case 8:  
		                    alert( '对不起,请求超时 获取位置失败.' );  
		                break;  
		            }  
		        }          
		  
		    },  
		    {enableHighAccuracy: true}  
		)
		
		function rim(lng,lat,schoolName){
			// 创建图标对象
			var myIcon = new BMap.Icon("http://api.map.baidu.com/images/marker_red_sprite.png", new BMap.Size(23, 25), {
				// 指定定位位置。
				// 当标注显示在地图上时，其所指向的地理位置距离图标左上
				// 角各偏移10像素和25像素。您可以看到在本例中该位置即是
				// 图标中央下端的尖角位置。
				offset: new BMap.Size(10, 25),
				// 设置图片偏移。
				// 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
				// 需要指定大图的偏移位置，此做法与 css sprites 技术类似。
				imageOffset: new BMap.Size(0, 0 - 5 * 25) // 设置图片偏移
			});
			$.ajax({
				type: "POST",
				url:"https://guaiguaixueche.com.cn/api/wxrimschool",
				//url:"http://192.168.18.135:8080/api/wxrimschool",
				data:{lng:lng,lat:lat,school_name:schoolName},
				dataType:'json',
				success: function(data){
					$('.user-search-txt').val('');
					if(data.code=='success'){
						var list = data.content;
						if(list.length==0){
							var noNum=$('<div class="no-num-box">抱歉，没有相关驾校<br><a href="javascript:;" class="other-school">去看看其他驾校</a></div>')
							$('.map-list-info').append(noNum);
							
						}else{
							for(var i=0;i<list.length;i++){
								// console.log(list[i]);
								var content = "驾校："+list[i].school_name +"<br>电话："+list[i].hotline+"<br><img src="+list[i].school_icon+" width='200' height='200' class='img' schoolId='"+list[i].school_id+"'>";
								var point = new BMap.Point(list[i].longitude, list[i].latitude);
								addMarker(point,content);
								var oDl=$('<dl class="school-around-list"></dl>');
								var oImg=$('<img src="'+list[i].school_icon+'">');
								var oDt=$('<dt class="school-img" schoolId="'+list[i].school_id+'"></dt>');
								oDt.append(oImg);
								var oDd=$('<dd class="school-info"></dd>');
								var oName=$('<div class="school-name">驾校名称：'+list[i].school_name +'</div>');
								var tel=$('<div class="school-add">报名热线：'+list[i].hotline+'</div>');
								var add=$('<div class="school-add">驾校地址：'+list[i].school_address+'</div>');
								var juLength=list[i].juli;
								if(juLength>=1000){
									var lengthNum=parseFloat(juLength/1000).toFixed(1)+'公里';
								}else{
									var lengthNum=juLength+'米';
								}
								var juli=$('<div class="length-bet">距您<b>'+lengthNum+'</b></div>');
								oDd.append(oName);
								oDd.append(tel);
								oDd.append(add);
								oDd.append(juli);
								oDl.append(oDt);
								oDl.append(oDd);
								$('.map-list-info').append(oDl);
							}
							shuaxinscroll();
						}
						
						$('.school-around-list').off().on('tap',function(){
							var index=$('.school-around-list').index($(this));
							localStorage.setItem('school_id',$('.school-img').eq(index).attr('schoolId'));
							window.open('school-detail.html','_self')
						})
						$('.other-school').off().on('tap',function(){
							$('.map-list-info').empty();
							rim(lng,lat,'')
						})
					}
				},
				error: function() {
				}
			})
		}
		
		// 编写自定义函数,创建标注
		function addMarker(point,content){
			var marker = new BMap.Marker(point);
			var infoWindow = new BMap.InfoWindow(content); 
			map.addOverlay(marker);
			marker.addEventListener("click", function(){         
				this.openInfoWindow(infoWindow);
				$('.img').click(function(){
					var index=$('.img').index($(this));
					localStorage.setItem('school_id',$('.img').eq(index).attr('schoolId'));
					window.open('school-detail.html','_self')
				})
			});
		}
	   
	
})